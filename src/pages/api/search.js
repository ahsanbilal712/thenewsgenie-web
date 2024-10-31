import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { q: searchTerm } = req.query;
  
  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    // Create text index if it doesn't exist (you should do this once in your DB setup)
    // await db.collection("data_news").createIndex({ Headline: "text", Category: "text" });

    const searchResults = await db.collection("data_news")
      .find({
        $or: [
          { Headline: { $regex: searchTerm, $options: 'i' } },
          { Category: { $regex: searchTerm, $options: 'i' } }
        ]
      })
      .project({
        Headline: 1,
        Category: 1,
        created_at: 1,
        image_url: 1
      })
      .sort({ created_at: -1 })
      .limit(10)
      .toArray();

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search news' });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 