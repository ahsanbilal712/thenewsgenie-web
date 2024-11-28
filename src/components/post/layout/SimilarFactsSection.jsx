import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCompareArrows } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SimilarFactsSectionComponent = ({ similarFacts, showAllSimilar, setShowAllSimilar, INITIAL_DISPLAY_COUNT }) => {
  const SimilarFact = ({ fact, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6 last:mb-0"
    >
      <div className="flex items-start gap-4">
        <div className="w-2 h-2 mt-2.5 rounded-full bg-blue-400 flex-shrink-0" />
        <p className="text-lg text-gray-100 leading-relaxed">
          {fact}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="bg-gray-900 rounded-2xl p-8 shadow-xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
          <MdCompareArrows className="text-white text-4xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Similar Perspectives
          </h2>
          <p className="text-lg text-gray-300">
            Facts that align with the main story
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <div>
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
            className="w-full mt-8 py-4 px-5 rounded-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 font-medium text-base shadow-lg"
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
  );
};

const SimilarFactsSection = memo(SimilarFactsSectionComponent);

export default SimilarFactsSection; 