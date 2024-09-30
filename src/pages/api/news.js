// pages/api/news.js
import dbConnect from '../../../lib/mongodb';
import NewsSummary from '../../../models/NewsSummary';

export default async function handler(req, res) {
  await dbConnect();
  const { category } = req.query;

  let filter = {};
  if (category) {
    filter.Category = category;
  }

  try {
    const news = await NewsSummary.find(filter);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news', message: error.message });
  }
}
