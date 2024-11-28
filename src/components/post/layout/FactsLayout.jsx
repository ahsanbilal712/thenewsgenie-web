import React, { useState } from 'react';
import RelatedCategoryNews from './RelatedCategoryNews';
import SimilarFactsSection from './SimilarFactsSection';
import ConflictingFactsSection from './ConflictingFactsSection';

const FactsLayout = ({ conflictingFacts = [], similarFacts = [], news, isLoading }) => {
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState({});

  const INITIAL_DISPLAY_COUNT = 3;

  return (
    <div className="space-y-12">
      {/* Similar Facts Section */}
      {similarFacts.length > 0 && (
        <SimilarFactsSection
          similarFacts={similarFacts}
          showAllSimilar={showAllSimilar}
          setShowAllSimilar={setShowAllSimilar}
          INITIAL_DISPLAY_COUNT={INITIAL_DISPLAY_COUNT}
        />
      )}

      {/* Conflicting Facts Section */}
      {conflictingFacts.length > 0 && (
        <ConflictingFactsSection
          conflictingFacts={conflictingFacts}
          expandedTopics={expandedTopics}
          setExpandedTopics={setExpandedTopics}
        />
      )}

     
    </div>
  );
};

export default FactsLayout; 