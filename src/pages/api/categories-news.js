import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { categories } = req.query;
  
  if (!categories) {
    return res.status(400).json({ error: 'Categories are required' });
  }

  const categoriesArray = JSON.parse(categories);
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    const results = await db.collection("data_news")
      .find({
        Category: { $in: categoriesArray }
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
    console.error('Categories search error:', error);
    res.status(500).json({ error: 'Failed to fetch categories news' });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 