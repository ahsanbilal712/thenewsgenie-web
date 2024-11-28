import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCompareArrows, MdWarning } from 'react-icons/md';
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import RelatedCategoryNews from './RelatedCategoryNews';

const FactsLayout = ({ conflictingFacts = [], similarFacts = [], news, isLoading }) => {
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState({});

  const INITIAL_DISPLAY_COUNT = 3;

  const SimilarFact = ({ fact, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4 last:mb-0"
    >
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 mt-2.5 rounded-full bg-blue-500 flex-shrink-0" />
        <div>
          <p className="text-lg text-gray-700 leading-relaxed">
            {fact}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const ConflictingFactsSection = ({ topic, conflicts }) => {
    const isExpanded = expandedTopics[topic] ?? false;

    return (
      <div className="mb-6 last:mb-0">
        <button
          onClick={() => setExpandedTopics(prev => ({ ...prev, [topic]: !prev[topic] }))}
          className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl mb-4 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 group"
        >
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-800 transition-colors">
            {topic}
          </h3>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <FaChevronDown className="text-amber-600 text-lg" />
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
                  className="relative p-6 bg-white rounded-xl border-l-4 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-lg mb-3 leading-relaxed text-gray-700">
                    {conflict.claim}
                  </p>
                  <div className="flex items-center gap-2 text-base text-gray-500">
                    <span className="font-medium">Source:</span>
                    <span className="font-medium text-amber-600">
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
    <div className="space-y-12">
      {/* Similar Facts Section */}
      {similarFacts.length > 0 && (
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
              <MdCompareArrows className="text-white text-4xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Similar Perspectives
              </h2>
              <p className="text-lg text-gray-500">
                Facts that align with the main story
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <AnimatePresence mode="wait">
              <div className="space-y-4">
                {similarFacts
                  .slice(0, showAllSimilar ? undefined : INITIAL_DISPLAY_COUNT)
                  .map((fact, index) => (
                    <SimilarFact 
                      key={`similar-${index}`}
                      fact={fact}
                      index={index}
                    />
                  ))}
              </div>
            </AnimatePresence>
            
            {similarFacts.length > INITIAL_DISPLAY_COUNT && (
              <motion.button
                onClick={() => setShowAllSimilar(!showAllSimilar)}
                className="w-full mt-6 py-4 px-5 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 transition-all duration-300 font-medium text-base"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {showAllSimilar ? (
                  <>
                    Show Less <FaChevronUp className="text-sm" />
                  </>
                ) : (
                  <>
                    Show {similarFacts.length - INITIAL_DISPLAY_COUNT} More <FaChevronDown className="text-sm" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </section>
      )}

      {/* Conflicting Facts Section */}
      {conflictingFacts.length > 0 && (
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-md">
              <MdWarning className="text-white text-4xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Different Perspectives
              </h2>
              <p className="text-lg text-gray-500">
                Facts that present alternative viewpoints by topic
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            {conflictingFacts.map((topicGroup, index) => (
              <ConflictingFactsSection
                key={index}
                topic={topicGroup.topic}
                conflicts={topicGroup.conflicts}
              />
            ))}
          </div>
        </section>
      )}

      {/* Related Category News Section */}
      <RelatedCategoryNews 
        category={news.Category}
        news={news.categoryNews || []}
        currentNewsId={news._id}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FactsLayout; 