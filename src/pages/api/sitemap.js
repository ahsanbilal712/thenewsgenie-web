// src/pages/api/sitemap.js
import { MongoClient } from "mongodb";
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { createGzip } from 'zlib';
import { formatHeadlineForUrl } from '../../utils/urlHelpers';

// Increase cache duration to reduce database calls
const CACHE_DURATION = 21600000; // 6 hours
let sitemapCache = {
  data: null,
  lastGenerated: null
};

// Categories configuration
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

// Generate keywords from headline
const generateKeywords = (news) => {
  const baseKeywords = [news.Category.toLowerCase(), "news"];
  const headlineWords = news.Headline.toLowerCase()
    .split(' ')
    .filter(word => word.length > 3)
    .slice(0, 8); // Take first 5 significant words
  return [...baseKeywords, ...headlineWords].join(', ');
};

export default async function handler(req, res) {
  let client;

  try {
    // Check cache first
    if (sitemapCache.data && 
        (Date.now() - sitemapCache.lastGenerated) < CACHE_DURATION) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Cache-Control', 'public, max-age=21600');
      return res.send(sitemapCache.data);
    }

    // Connect to MongoDB with timeout
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
    
    const db = client.db("intelli-news-db");

    // Fetch only recent news (last 30 days) to reduce data size
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newsData = await db.collection("data_news")
      .find({
        created_at: { $gte: thirtyDaysAgo }
      })
      .project({ 
        Headline: 1, 
        Category: 1,
        created_at: 1, 
        updated_at: 1,
        image_url: 1
      })
      .sort({ created_at: -1 })
      .limit(2000) // Limit to most recent 1000 articles
      .toArray();

    // Create base links array with static pages
    const links = [
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
      // Add category pages
      ...Object.keys(CATEGORIES).map(category => ({
        url: `/categories/${category.toLowerCase()}`,
        changefreq: 'daily',
        priority: CATEGORIES[category],
        lastmod: new Date().toISOString()
      }))
    ];

    // Add news pages with original keyword logic
    const newsLinks = newsData.map(news => {
      const formattedUrl = formatHeadlineForUrl(news.Headline);
      if (!formattedUrl) return null;

      return {
        url: `/news/${formattedUrl}`,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date(news.updated_at || news.created_at).toISOString(),
        img: news.image_url ? [{
          url: news.image_url,
          caption: news.Headline,
          title: news.Headline
        }] : undefined,
        news: {
          publication: {
            name: "The News Genie",
            language: "en"
          },
          publication_date: new Date(news.created_at).toISOString(),
          title: news.Headline,
          keywords: generateKeywords(news)
        }
      };
    }).filter(Boolean);

    links.push(...newsLinks);

    // Generate sitemap
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

    // Write links and handle errors
    Readable.from(links).pipe(stream);

    const buffer = await streamToPromise(pipeline);
    sitemapCache.data = buffer;
    sitemapCache.lastGenerated = Date.now();

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Cache-Control', 'public, max-age=21600');
    res.setHeader('Last-Modified', new Date(sitemapCache.lastGenerated).toUTCString());
    res.send(buffer);

  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Return cached version if available, even if expired
    if (sitemapCache.data) {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.send(sitemapCache.data);
    }

    res.status(500).json({ error: "Error generating sitemap" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
