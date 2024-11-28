import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaNewspaper } from 'react-icons/fa';

const RelatedCategoryNews = ({ category, news = [], currentNewsId, isLoading }) => {
  // Don't render if there's no related news or only the current article
  if (!news.length || (news.length === 1 && news[0]._id === currentNewsId)) {
    return null;
  }

  const createUrlSafeSlug = (headline) => {
    return encodeURIComponent(headline.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <section className="mt-12">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-purple-100 rounded-xl">
          <FaNewspaper className="text-purple-600 text-4xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            More from {category}
          </h2>
          <p className="text-lg text-gray-500">
            Related stories from this category
          </p>
        </div>
      </div>

      <div className="grid gap-6 mt-6">
        {news
          .filter(item => item._id !== currentNewsId)
          .slice(0, 3)
          .map((item, index) => {
            const urlSlug = createUrlSafeSlug(item.Headline || '');
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={`/news/${urlSlug}`}
                  className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.Headline}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {item.Summary}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};

export default RelatedCategoryNews; 