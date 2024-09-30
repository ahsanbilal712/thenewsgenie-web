// src/pages/api/sitemap.js
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  // Connect to your MongoDB
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("intelli-news-db");
  const newsArticles = await db.collection("data_news").find({}).toArray();

  // Base URL for your production site
  const baseUrl = "https://intellinewsai.netlify.app";

  // Create the XML structure for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      ${newsArticles
        .map(
          (news) => `
        <url>
          <loc>${baseUrl}/news/${encodeURIComponent(news.Headline)}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  // Set response headers to XML
  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);

  // Close the MongoDB connection
  client.close();
}
