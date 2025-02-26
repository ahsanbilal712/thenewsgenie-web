// pages/api/news.js
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { page = 1, limit = 40 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");
    
    // Get total count and news items
    const [total, news] = await Promise.all([
      db.collection("data_news").countDocuments(),
      db.collection("data_news")
        .find({})
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray()
    ]);

    res.status(200).json({
      news,
      hasMore: total > skip + news.length,
      total
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
