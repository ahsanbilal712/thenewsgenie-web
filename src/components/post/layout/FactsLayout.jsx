import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdWarning, MdCompareArrows } from 'react-icons/md';
import { FaExternalLinkAlt } from 'react-icons/fa';

const FactsLayout = ({ conflictingFacts = [], similarFacts = [] }) => {
  const [activeTab, setActiveTab] = useState('conflicting');

  // Format similar facts to match conflicting facts structure
  const formattedSimilarFacts = similarFacts.map(fact => ({
    fact: fact,
    source: null // since similar facts don't have source information
  }));

  // Debug logs
  useEffect(() => {
    console.log('Active Tab:', activeTab);
    console.log('Similar Facts:', similarFacts);
    console.log('Conflicting Facts:', conflictingFacts);
  }, [activeTab, similarFacts, conflictingFacts]);

  const renderFacts = (facts, type) => {
    const factsToRender = type === 'similar' ? formattedSimilarFacts : facts;
    
    return factsToRender.map((item, index) => (
      <motion.div
        key={`${type}-${index}`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative p-5 bg-blue-500 border-l-4 border-blue-700 rounded-lg 
          shadow-sm transition-all duration-300 dark:bg-blue-800/90`}
      >
        <p className="text-white dark:text-gray-100 text-lg mb-3 leading-relaxed">
          {item.fact}
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
              <span className="font-medium">{item.source?.SourceName}</span>
            )}
          </div>
        )}
      </motion.div>
    ));
  };

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
          {activeTab === 'conflicting' ? (
            <MdWarning className="text-white text-2xl dark:text-blue-200" />
          ) : (
            <MdCompareArrows className="text-white text-2xl dark:text-blue-200" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {activeTab === 'conflicting' ? 'Conflicting Facts' : 'Similar Facts'}
        </h2>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('conflicting')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
            ${activeTab === 'conflicting' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
            }`}
        >
          Conflicting Facts ({conflictingFacts.length})
        </button>
        <button
          onClick={() => setActiveTab('similar')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
            ${activeTab === 'similar' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
            }`}
        >
          Similar Facts ({similarFacts.length})
        </button>
      </div>

      <AnimatePresence mode='wait'>
        <div className="space-y-5">
          {activeTab === 'conflicting' && renderFacts(conflictingFacts, 'conflicting')}
          {activeTab === 'similar' && renderFacts(formattedSimilarFacts, 'similar')}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default FactsLayout; 