import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");
    const collection = db.collection("data_news");

    // GET request - Fetch feedbacks for a specific news article
    if (req.method === 'GET') {
      const { newsId } = req.query;
      
      if (!newsId) {
        return res.status(400).json({ error: 'News ID is required' });
      }

      const news = await collection.findOne(
        { _id: new ObjectId(newsId) },
        { projection: { feedbacks: 1 } }
      );

      return res.status(200).json({ 
        feedbacks: news?.feedbacks || [] 
      });
    }

    // POST request - Add new feedback
    if (req.method === 'POST') {
      const { newsId, userName, comment, timestamp } = req.body;

      if (!newsId || !userName || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(newsId) },
        {
          $push: {
            feedbacks: {
              userName,
              comment,
              timestamp,
              _id: new ObjectId()
            }
          }
        }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'News article not found' });
      }

      return res.status(200).json({ message: 'Feedback added successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Feedback API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 