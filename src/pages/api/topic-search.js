import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { topic } = req.query;
  
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    const results = await db.collection("data_news")
      .find({
        Headline: { $regex: topic, $options: 'i' }
      })
      .project({
        Headline: 1,
        Category: 1,
        created_at: 1,
        image_url: 1
      })
      .sort({ created_at: -1 })
      .limit(20)
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('Topic search error:', error);
    res.status(500).json({ error: 'Failed to search topics' });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 