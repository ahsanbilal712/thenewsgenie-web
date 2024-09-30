// import dbConnect from './mongodb';
// import NewsSummary from '../models/NewsSummary';

// export async function getAllPosts() {
//   await dbConnect();
//   const newsEntries = await NewsSummary.find({});
//   return newsEntries;
// }

// export async function getPostById(id) {
//   await dbConnect();
//   const newsEntry = await NewsSummary.findById(id).lean();
//   if (newsEntry) {
//     newsEntry._id = newsEntry._id.toString(); // Convert ObjectId to string for serialization
//   }
//   return newsEntry;
// }

// export async function getPostIds() {
//   await dbConnect();
//   const entries = await NewsSummary.find({}).select('_id');
//   return entries.map(entry => entry._id.toString()); // Convert ObjectId to string
// }

// export async function getAllSlugs() {
//   await dbConnect();
//   const results = await NewsSummary.find({}).select('slug');  // Fetch only the slug field
//   return results.map(doc => ({
//     slug: doc.slug  // Make sure slugs are returned correctly
//   }));
// }
