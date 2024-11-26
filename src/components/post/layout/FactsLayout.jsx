import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCompareArrows, MdWarning } from 'react-icons/md';
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import RelatedCategoryNews from './RelatedCategoryNews';

const FactsLayout = ({ conflictingFacts = [], similarFacts = [], news, isLoading }) => {
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [showAllConflicting, setShowAllConflicting] = useState(false);

  const INITIAL_DISPLAY_COUNT = 3;

  const FactCard = ({ fact, type, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative p-7  rounded-xl border-l-4 mb-5
        ${type === 'similar' 
          ? 'bg-white border-blue-500 shadow-sm hover:shadow-md' 
          : 'bg-white border-amber-500 shadow-sm hover:shadow-md'
        }
        transition-all duration-300 ease-in-out
      `}
    >
      <p className="text-xl mb-4 leading-relaxed text-gray-700">
        {fact.fact}
      </p>
      
      {fact.source && (
        <div className="flex items-center gap-2 text-base text-gray-500">
          <span className="font-medium">Source:</span>
          {fact.source.SourceUrl ? (
            <a 
              href={fact.source.SourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-1 font-medium hover:underline
                ${type === 'similar' ? 'text-blue-600 hover:text-blue-700' : 'text-amber-600 hover:text-amber-700'}
              `}
            >
              {fact.source.SourceName}
              <FaExternalLinkAlt className="text-xs ml-1" />
            </a>
          ) : (
            <span className="font-medium">{fact.source.SourceName}</span>
          )}
        </div>
      )}
    </motion.div>
  );

  const LoadMoreButton = ({ onClick, isExpanded, type, remainingCount }) => (
    <button
      onClick={onClick}
      className={`
        w-full py-4 px-5 rounded-lg mt-3 flex items-center justify-center gap-2
        ${type === 'similar' 
          ? 'bg-blue-50 hover:bg-blue-100 text-blue-600' 
          : 'bg-amber-50 hover:bg-amber-100 text-amber-600'
        }
        transition-all duration-300 ease-in-out font-medium text-base
      `}
    >
      {isExpanded ? (
        <>
          Show Less <FaChevronUp className="text-sm" />
        </>
      ) : (
        <>
          Show {remainingCount} More <FaChevronDown className="text-sm" />
        </>
      )}
    </button>
  );

  return (
    <div className="space-y-12">
      {/* Similar Facts Section */}
      {similarFacts.length > 0 && (
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MdCompareArrows className="text-blue-600 text-4xl" />
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
          <div className="space-y-4 mt-6">
            <AnimatePresence>
              {similarFacts
                .slice(0, showAllSimilar ? undefined : INITIAL_DISPLAY_COUNT)
                .map((fact, index) => (
                  <FactCard 
                    key={`similar-${index}`} 
                    fact={{ fact, source: null }}
                    type="similar"
                    index={index}
                  />
                ))}
            </AnimatePresence>
            
            {similarFacts.length > INITIAL_DISPLAY_COUNT && (
              <LoadMoreButton 
                onClick={() => setShowAllSimilar(!showAllSimilar)}
                isExpanded={showAllSimilar}
                type="similar"
                remainingCount={similarFacts.length - INITIAL_DISPLAY_COUNT}
              />
            )}
          </div>
        </section>
      )}

      {/* Conflicting Facts Section */}
      {conflictingFacts.length > 0 && (
        <section className="mt-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-amber-100 rounded-xl">
              <MdWarning className="text-amber-600 text-4xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Different Perspectives
              </h2>
              <p className="text-lg text-gray-500">
                Facts that present alternative viewpoints
              </p>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <AnimatePresence>
              {conflictingFacts
                .slice(0, showAllConflicting ? undefined : INITIAL_DISPLAY_COUNT)
                .map((fact, index) => (
                  <FactCard 
                    key={`conflicting-${index}`} 
                    fact={fact}
                    type="conflicting"
                    index={index}
                  />
                ))}
            </AnimatePresence>

            {conflictingFacts.length > INITIAL_DISPLAY_COUNT && (
              <LoadMoreButton 
                onClick={() => setShowAllConflicting(!showAllConflicting)}
                isExpanded={showAllConflicting}
                type="conflicting"
                remainingCount={conflictingFacts.length - INITIAL_DISPLAY_COUNT}
              />
            )}
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