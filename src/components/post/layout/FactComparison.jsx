import React, { useEffect } from 'react';

const FactComparison = ({ news }) => {
  useEffect(() => {
    console.log('Similar Facts:', news.similar_facts);
  }, [news]);

  if (!news || (!news.conflicting_facts && !news.similar_facts)) {
    return null;
  }

  // Combine conflicting and similar facts
  const allFacts = [
    ...(news.conflicting_facts || []),
    ...(news.similar_facts || []).map(fact => {
      let topic, claim, isString = false;
      if (fact.includes(':')) {
        [topic, claim] = fact.split(':').map(item => item.trim());
      } else {
        topic = fact;
        claim = '✔'; // Use a tick mark for plain strings
        isString = true;
      }
      return {
        topic,
        conflicts: news.sources.map(source => ({
          source: source.SourceName,
          claim,
          isString
        }))
      };
    })
  ];

  // Extract unique source names
  const sourceNames = Array.from(new Set(allFacts.flatMap(factGroup => 
    (factGroup.conflicts || []).map(conflict => conflict.source)
  )));

  return (
    <div className="fact-comparison-table my-8">
      <h2 className="text-3xl font-bold mb-4">Fact Comparison</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Fact</th>
            {sourceNames.map((source, index) => (
              <th key={index} className="py-2 px-4 border-b">{source}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFacts.map((factGroup, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{factGroup.topic}</td>
              {sourceNames.map((source, idx) => {
                const conflict = (factGroup.conflicts || []).find(conflict => conflict.source === source);
                return (
                  <td key={idx} className="py-2 px-4 border-b">
                    {conflict ? (conflict.isString ? '✔' : conflict.claim) : 'N/A'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactComparison;




/**import React, { useEffect } from 'react';      code for copying string data into source columns uncommented code shows empty columns for string data

const FactComparison = ({ news }) => {
  useEffect(() => {
    console.log('Similar Facts:', news.similar_facts);
  }, [news]);

  if (!news || (!news.conflicting_facts && !news.similar_facts)) {
    return null;
  }

  // Combine conflicting and similar facts
  const allFacts = [
    ...(news.conflicting_facts || []),
    ...(news.similar_facts || []).map(fact => {
      let topic, claim;
      if (fact.includes(':')) {
        [topic, claim] = fact.split(':').map(item => item.trim());
      } else {
        topic = fact;
        claim = fact;
      }
      return {
        topic,
        conflicts: news.sources.map(source => ({
          source: source.SourceName,
          claim
        }))
      };
    })
  ];

  // Extract unique source names
  const sourceNames = Array.from(new Set(allFacts.flatMap(factGroup => 
    (factGroup.conflicts || []).map(conflict => conflict.source)
  )));

  return (
    <div className="fact-comparison-table my-8">
      <h2 className="text-3xl font-bold mb-4">Fact Comparison</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Fact</th>
            {sourceNames.map((source, index) => (
              <th key={index} className="py-2 px-4 border-b">{source}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFacts.map((factGroup, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{factGroup.topic}</td>
              {sourceNames.map((source, idx) => {
                const conflict = (factGroup.conflicts || []).find(conflict => conflict.source === source);
                return (
                  <td key={idx} className="py-2 px-4 border-b">
                    {conflict ? conflict.claim : 'N/A'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactComparison; */