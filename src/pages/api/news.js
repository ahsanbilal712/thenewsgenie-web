// pages/api/news.js
import dbConnect from '../../../lib/mongodb';
import NewsSummary from '../../../models/NewsSummary';

export default async function handler(req, res) {
  await dbConnect();
  const { page = 1, limit = 50, category } = req.query;
  const skip = (page - 1) * limit;

  try {
    let filter = {};
    if (category) {
      filter.Category = category;
    }

    const [news, total] = await Promise.all([
      NewsSummary.find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      NewsSummary.countDocuments(filter)
    ]);

    res.status(200).json({
      news,
      hasMore: total > skip + news.length,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news', message: error.message });
  }
}
