// src/pages/api/sitemap.js
import { MongoClient } from "mongodb";
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { createGzip } from 'zlib';
import { formatHeadlineForUrl } from '../../utils/urlHelpers';

// Cache configuration
const CACHE_DURATION = 3600000; // 1 hour
let sitemapCache = {
  data: null,
  lastGenerated: null
};

// Define all categories with their priorities
const CATEGORIES = {
  "Pakistan": 0.9,
  "World": 0.9,
  "Sports": 0.9,
  "Business": 0.9,
  "Entertainment": 0.9,
  "Weather": 0.9,
  "Health": 0.9,
  "Science": 0.9,
  "Technology": 0.9
};

// Validate and sanitize news data
const sanitizeNewsData = (news) => {
  return {
    Headline: news.Headline || '',
    Category: news.Category || 'Uncategorized',
    created_at: news.created_at || new Date(),
    updated_at: news.updated_at || news.created_at || new Date(),
    image_url: news.image_url || '',
    Summary: news.Summary || ''
  };
};

export default async function handler(req, res) {
  let client;

  try {
    // Check cache
    if (sitemapCache.data && 
        (Date.now() - sitemapCache.lastGenerated) < CACHE_DURATION) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.send(sitemapCache.data);
    }

    // Connect to MongoDB
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    // Fetch all headlines and dates
    const rawNewsData = await db.collection("data_news")
      .find({})
      .project({ 
        Headline: 1, 
        Category: 1,
        created_at: 1, 
        updated_at: 1,
        image_url: 1,
        Summary: 1
      })
      .sort({ created_at: -1 })
      .toArray();

    // Sanitize news data
    const newsData = rawNewsData.map(sanitizeNewsData);

    // Create sitemap entries
    const links = [
      // Static pages
      { 
        url: '/', 
        changefreq: 'always', 
        priority: 1.0,
        lastmod: new Date().toISOString()
      },
      { 
        url: '/latest', 
        changefreq: 'hourly', 
        priority: 0.9,
        lastmod: new Date().toISOString()
      },

      // Category pages
      ...Object.keys(CATEGORIES).map(category => ({
        url: `/categories/${category.toLowerCase()}`,
        changefreq: 'hourly',
        priority: CATEGORIES[category],
        lastmod: new Date().toISOString()
      })),

      // News pages with proper URL formatting and validation
      ...newsData.map((news) => {
        const formattedUrl = formatHeadlineForUrl(news.Headline);
        if (!formattedUrl) return null; // Skip invalid URLs

        return {
          url: `/news/${formattedUrl}`,
          changefreq: 'hourly',
          priority: 0.8,
          lastmod: new Date(news.updated_at || news.created_at).toISOString(),
          img: news.image_url ? [
            {
              url: news.image_url,
              caption: news.Headline,
              title: news.Headline
            }
          ] : undefined,
          news: {
            publication: {
              name: "The News Genie",
              language: "en"
            },
            publication_date: new Date(news.created_at).toISOString(),
            title: news.Headline,
            keywords: `${news.Category.toLowerCase()}, news, ${news.Headline.split(' ')
              .filter(word => word && word.length > 3)
              .slice(0, 5)
              .join(', ')
              .toLowerCase()}`
          }
        };
      }).filter(Boolean) // Remove null entries
    ];

    // Create sitemap stream with extended options
    const stream = new SitemapStream({ 
      hostname: 'https://thenewsgenie.com',
      lastmodDateOnly: false,
      xmlns: {
        news: true,
        xhtml: true,
        image: true
      }
    });

    const pipeline = stream.pipe(createGzip());

    // Write the links to the stream
    Readable.from(links).pipe(stream);

    // Cache the generated sitemap
    const buffer = await streamToPromise(pipeline);
    sitemapCache.data = buffer;
    sitemapCache.lastGenerated = Date.now();

    // Send response with proper headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Last-Modified', new Date(sitemapCache.lastGenerated).toUTCString());
    res.send(buffer);

  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).json({ 
      error: "Error generating sitemap", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
