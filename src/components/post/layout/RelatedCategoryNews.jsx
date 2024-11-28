import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaNewspaper } from 'react-icons/fa';

const RelatedCategoryNews = ({ category, news = [], currentNewsId, isLoading }) => {
  // Don't render if there's no related news
  if (!news || news.length === 0) {
    return null;
  }

  const createUrlSafeSlug = (headline) => {
    return encodeURIComponent(headline.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <section className="mt-8 bg-gray-100 rounded-xl shadow-md p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link 
          href={`/categories/${createUrlSafeSlug(category)}`}
          className="group"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-black to-black bg-no-repeat [background-position:0_88%] [background-size:0%_2px] group-hover:[background-size:100%_2px] transition-all duration-300">
              {category}
            </span>
            <span className="text-blue-500 ml-1 group-hover:translate-x-1 inline-block transition-transform duration-300">{">"}</span>
          </h2>
        </Link>
      </div>
      <hr className="h-0.5 w-full bg-slate-600 mb-6" />

      <div className="grid gap-6">
        {news
          .filter(item => item._id !== currentNewsId)
          .slice(0, 6)
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
                  className="block bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                >
                  <div className="flex gap-6">
                    {item.image_url && (
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 overflow-hidden rounded-lg group">
                          <img
                            src={item.image_url}
                            alt={item.Headline}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col flex-grow justify-between py-1">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight group">
                          <span className="bg-gradient-to-r from-black to-black bg-no-repeat [background-position:0_88%] [background-size:0%_2px] group-hover:[background-size:100%_2px] transition-all duration-300">
                            {item.Headline}
                          </span>
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed line-clamp-2 mt-2">
                          {item.Summary}
                        </p>
                      </div>
                    
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};

function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt));
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `published just now`;
  if (minutes < 60) return `published ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  if (hours < 24) return `published ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  return `published ${days} ${days === 1 ? "day" : "days"} ago`;
}

export default RelatedCategoryNews; 