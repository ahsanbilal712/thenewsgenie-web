import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { topics } = req.query;
  
  if (!topics) {
    return res.status(400).json({ error: 'Topics are required' });
  }

  const topicsArray = JSON.parse(topics);
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    const results = await db.collection("data_news")
      .find({
        $or: topicsArray.map(topic => ({
          Headline: { $regex: topic, $options: 'i' }
        }))
      })
      .project({
        Headline: 1,
        Category: 1,
        created_at: 1,
        image_url: 1
      })
      .sort({ created_at: -1 })
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('Topics search error:', error);
    res.status(500).json({ error: 'Failed to fetch topics news' });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 