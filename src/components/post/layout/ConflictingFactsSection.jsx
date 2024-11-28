import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdWarning } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';

const ConflictingFactsSection = ({ conflictingFacts, expandedTopics, setExpandedTopics }) => {
  const TopicSection = ({ topic, conflicts }) => {
    const isExpanded = expandedTopics[topic] ?? false;

    return (
      <div className="mb-6 last:mb-0">
        <button
          onClick={() => setExpandedTopics(prev => ({ ...prev, [topic]: !prev[topic] }))}
          className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-4 hover:from-amber-700 hover:to-amber-800 transition-all duration-300 group"
        >
          <h3 className="text-xl font-semibold text-white group-hover:text-amber-100 transition-colors">
            {topic}
          </h3>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <FaChevronDown className="text-amber-100 text-lg" />
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {conflicts.map((conflict, index) => (
                <motion.div
                  key={`${topic}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 bg-gray-800 rounded-xl border-l-4 border-amber-500 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <p className="text-lg mb-3 leading-relaxed text-gray-100">
                    {conflict.claim}
                  </p>
                  <div className="flex items-center gap-2 text-base text-gray-400">
                    <span className="font-medium">Source:</span>
                    <span className="font-medium text-amber-400">
                      {conflict.source}
                    </span>
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
    <section className="bg-gray-900 rounded-2xl p-8 shadow-xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl shadow-lg">
          <MdWarning className="text-white text-4xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Different Perspectives
          </h2>
          <p className="text-lg text-gray-300">
            Facts that present alternative viewpoints by topic
          </p>
        </div>
      </div>

      <div>
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