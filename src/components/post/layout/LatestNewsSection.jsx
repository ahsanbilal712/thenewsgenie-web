import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiClock, HiArrowRight } from 'react-icons/hi';
import { formatHeadlineForUrl } from '../../../utils/urlHelpers';

const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = Math.abs(now - new Date(date));
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const LatestNewsSection = ({ latestNews = [] }) => {
  if (!latestNews || latestNews.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-2">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <HiClock className="text-blue-600 w-7 h-7" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Latest News</h2>
          </div>
          <Link href="/latest">
            <a className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              View All 
              <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {latestNews.slice(0, 10).map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col h-full"
            >
              <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                <a className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.Headline}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="inline-block px-2.5 py-1 text-xs bg-blue-500 text-white rounded-full font-medium mb-3 w-fit">
                      {item.Category}
                    </span>
                    <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-200 flex-grow">
                      <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-300">
                        {item.Headline}
                      </span>
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-auto">
                      <HiClock className="w-3.5 h-3.5" />
                      {formatTimeAgo(item.created_at)}
                    </div>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNewsSection; 