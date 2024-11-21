import React from 'react';
import { motion } from 'framer-motion';
import { MdCompareArrows } from 'react-icons/md';
import { FaExternalLinkAlt } from 'react-icons/fa';

const SimilarFactsLayout = ({ similarFacts }) => {
  if (!similarFacts || similarFacts.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500 rounded-full dark:bg-blue-800">
          <MdCompareArrows className="text-white text-2xl dark:text-blue-200" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Similar Facts
        </h2>
      </div>

      <div className="space-y-5">
        {similarFacts.map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-5 bg-blue-500 border-l-4 border-blue-700 rounded-lg 
              shadow-sm transition-all duration-300 dark:bg-blue-800/90 
              ${item.source?.SourceUrl ? 
                'cursor-pointer hover:shadow-md hover:scale-[1.01] hover:bg-blue-600 dark:hover:bg-blue-700' : ''
              }`}
            onClick={() => {
              if (item.source?.SourceUrl) {
                window.open(item.source.SourceUrl, '_blank', 'noopener noreferrer');
              }
            }}
          >
            <p className="text-white dark:text-gray-100 text-lg mb-3 leading-relaxed">
              {item.fact}
              {item.source?.SourceUrl && (
                <FaExternalLinkAlt className="inline-block ml-2 text-xs opacity-70" />
              )}
            </p>
            
            {item.source && (
              <div className="flex items-center gap-2 text-sm text-white/90 dark:text-gray-200">
                <span className="font-medium">Source:</span>
                {item.source.SourceUrl ? (
                  <a 
                    href={item.source.SourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white hover:text-blue-100 
                      dark:text-blue-200 dark:hover:text-blue-100 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.source.SourceName}
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                ) : (
                  <span className="font-medium">{item.source.SourceName}</span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarFactsLayout;
