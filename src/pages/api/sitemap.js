// src/pages/api/sitemap.js
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let client;
  try {
    // Connect to your MongoDB
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const db = client.db("intelli-news-db");
    
    // Get the latest 1000 news articles, sorted by publication date
    const newsArticles = await db.collection("data_news")
      .find({})
      .sort({ publishedAt: -1 })
      .limit(1000)
      .toArray();

    console.log(`Retrieved ${newsArticles.length} articles`);

    // Base URL for your production site
    const baseUrl = "https://thenewsgenie.com";

    // Create the XML structure for the sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
      </url>
      ${newsArticles.map(news => `
        <url>
          <loc>${baseUrl}/news/${encodeURIComponent(news.Headline || '')}</loc>
          <lastmod>${new Date(news.publishedAt || news.updatedAt || Date.now()).toISOString()}</lastmod>
          <changefreq>hourly</changefreq>
          <priority>0.9</priority>
          <news:news>
            <news:publication>
              <news:name>The News Genie</news:name>
              <news:language>en</news:language>
            </news:publication>
            <news:publication_date>${new Date(news.publishedAt || Date.now()).toISOString()}</news:publication_date>
            <news:title>${(news.Headline || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
          </news:news>
        </url>
      `).join('')}
    </urlset>`;

    console.log("Sitemap generated successfully");

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).send(sitemap);

  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).json({ error: "Error generating sitemap", details: error.message });
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
