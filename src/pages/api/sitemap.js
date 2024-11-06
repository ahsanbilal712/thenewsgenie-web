// src/pages/api/sitemap.js
import { MongoClient } from "mongodb";
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { createGzip } from 'zlib';

// Cache the sitemap for 1 hour
let sitemapCache = {
  data: null,
  lastGenerated: null
};

export default async function handler(req, res) {
  let client;

  try {
    // Check cache
    if (sitemapCache.data && 
        (Date.now() - sitemapCache.lastGenerated) < 3600000) { // 1 hour
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.send(sitemapCache.data);
    }

    // Connect to MongoDB
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    // Fetch all headlines and dates (minimal data)
    const newsData = await db.collection("data_news")
      .find({})
      .project({ 
        Headline: 1, 
        Category: 1,
        created_at: 1, 
        updated_at: 1 
      })
      .toArray();

    // Create sitemap entries
    const links = [
      { url: '/', changefreq: 'always', priority: 1.0 },
      { url: '/latest', changefreq: 'hourly', priority: 0.9 },
      // Add category pages
      ...Array.from(new Set(newsData.map(news => news.Category)))
        .map(category => ({
          url: `/categories/${encodeURIComponent(category)}`,
          changefreq: 'hourly',
          priority: 0.8
        })),
      // Add news pages
      ...newsData.map((news) => ({
        url: `/news/${encodeURIComponent(news.Headline)}`,
        changefreq: 'hourly',
        priority: 0.7,
        lastmod: news.updated_at || news.created_at || new Date().toISOString()
      }))
    ];

    // Create a readable stream of the links
    const stream = new SitemapStream({ 
      hostname: 'https://thenewsgenie.com',
      lastmodDateOnly: true // More efficient date format
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
    res.status(500).json({ error: "Error generating sitemap", details: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
