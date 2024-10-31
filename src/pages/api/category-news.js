import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { category, page = 1, limit = 40 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");
    
    // Get total count and news items for the category
    const [total, news] = await Promise.all([
      db.collection("data_news").countDocuments({ Category: category }),
      db.collection("data_news")
        .find({ Category: category })
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
    console.error('Error fetching category news:', error);
    res.status(500).json({ error: 'Failed to fetch category news' });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 