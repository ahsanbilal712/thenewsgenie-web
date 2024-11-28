import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdWarning } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';

const ConflictingFactsSection = ({ conflictingFacts, expandedTopics, setExpandedTopics }) => {
  const TopicSection = ({ topic, conflicts }) => {
    const isExpanded = expandedTopics[topic] ?? false;

    return (
      <div className="mb-4 last:mb-0 overflow-hidden">
        <motion.button
          onClick={() => setExpandedTopics(prev => ({ ...prev, [topic]: !prev[topic] }))}
          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300
            ${isExpanded 
              ? 'bg-amber-500 shadow-lg' 
              : 'bg-gray-800 hover:bg-gray-750'}`}
          whileTap={{ scale: 0.995 }}
        >
          <div className="flex flex-col items-start">
            <span className={`text-lg font-medium transition-colors
              ${isExpanded ? 'text-gray-900' : 'text-gray-100'}`}>
              {topic}
            </span>
            <span className={`text-sm mt-1 transition-colors
              ${isExpanded ? 'text-gray-800' : 'text-gray-400'}`}>
            </span>
          </div>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <FaChevronDown className={`text-lg transition-colors
              ${isExpanded ? 'text-gray-900' : 'text-gray-400'}`} />
          </div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="mt-3 grid gap-3"
            >
              {conflicts.map((conflict, index) => (
                <motion.div
                  key={`${topic}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-full" />
                  <div className="pl-4 ml-2">
                    <p className="text-base text-gray-100 leading-relaxed mb-2">
                      {conflict.claim}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full">
                      <span className="text-sm text-gray-400">
                        {conflict.source}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="bg-gray-900 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-amber-500 rounded-xl">
          <MdWarning className="text-gray-900 text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Different Perspectives
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Alternative viewpoints by topic
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {conflictingFacts.map((topicGroup, index) => (
          <TopicSection
            key={index}
            topic={topicGroup.topic}
            conflicts={topicGroup.conflicts}
          />
        ))}
      </div>
    </section>
  );
};

export default ConflictingFactsSection; 