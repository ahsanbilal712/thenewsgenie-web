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

    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    // Create a readable stream for the sitemap
    const smStream = new SitemapStream({ hostname: 'https://thenewsgenie.com' });
    const pipeline = smStream.pipe(createGzip());

    // Add static URLs
    smStream.write({ url: '/', changefreq: 'always', priority: 1.0 });

    // Stream news articles
    const cursor = db.collection("data_news")
      .find({})
      .sort({ publishedAt: -1 })
      .project({ Headline: 1, publishedAt: 1, updatedAt: 1 });

    // Process documents in batches
    while (await cursor.hasNext()) {
      const news = await cursor.next();
      smStream.write({
        url: `/news/${encodeURIComponent(news.Headline)}`,
        changefreq: 'hourly',
        priority: 0.9,
        lastmod: news.updatedAt || news.publishedAt
      });
    }

    smStream.end();

    // Cache the generated sitemap
    const buffer = await streamToPromise(pipeline);
    sitemapCache.data = buffer;
    sitemapCache.lastGenerated = Date.now();

    // Send response
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Cache-Control', 'public, max-age=3600');
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
