import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

const imageSources = {
  "ARY News": "/images/news-sources/ARY.png",
  "Ary News": "/images/news-sources/ARY.png",

  "arynews.tv": "/images/news-sources/ARY.png",
  Dawn: "/images/news-sources/dawn.png",
  "Dawn.com": "/images/news-sources/dawn.png",
  "thenews.com.pk": "/images/news-sources/thenews.png",
  "The News": "/images/news-sources/thenews.png",
  "nation.com.pk": "/images/news-sources/TheNation.png",
  "The Tribune": "/images/news-sources/express_tribune.jpeg",
  Tribune: "/images/news-sources/express_tribune.jpeg",
  "The Nation": "/images/news-sources/TheNation.png",
  "Geo TV": "/images/news-sources/geo.png",
  "Geo News": "/images/news-sources/geo.png",
  "geo.tv": "/images/news-sources/geo.png",
  "tribune.com.pk": "/images/news-sources/express_tribune.jpeg",
};

const SourcesLayout = ({ news }) => {
  const [selectedSource, setSelectedSource] = useState(null);

  if (!news || !news.sources || news.sources.length === 0) {
    return (
      <div className="news-not-found text-center py-10">No news found.</div>
    );
  }

  const handleOpenKeyFacts = (source) => {
    setSelectedSource(source);
  };

  const handleCloseKeyFacts = () => {
    setSelectedSource(null);
  };

  return (
    <div className="news-article section-gap p-t-xs-15 p-t-sm-60">
      <h2 className="text-5xl font-bold mb-8 text-center">News Sources</h2>
      <div className="news-sources grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.sources.map((source, index) => {
          const imgSrc =
            imageSources[source.SourceName] ||
            "/images/news-sources/default.png";

          return (
            <div
              key={index}
              className="source-item border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group p-4">
                <img
                  src={imgSrc}
                  alt={source.SourceName}
                  className="image w-auto h-[150px] mx-auto object-cover"
                />
                <div className="middle absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60">
                  <div className="text text-white text-lg font-semibold text-center px-2">
                    {source.SourceName}
                  </div>
                </div>
              </div>
              <div className="p-4 mx-auto items-center flex flex-col justify-center">
                <a
                  href={source.SourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-words mb-2 flex items-center"
                >
                  <span className="mx-auto items-center text-4xl font-bold">
                    {source.SourceName}
                  </span>
                  <FaExternalLinkAlt className="ml-2 text-blue-500" />
                </a>
                <button
                  onClick={() => handleOpenKeyFacts(source)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  <FaInfoCircle className="mr-2" />
                  View Key Facts
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedSource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseKeyFacts}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-2xl w-full m-4 relative overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseKeyFacts}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-4">
                {selectedSource.SourceName} - Key Facts
              </h3>
              <div className="text-gray-700">
                {selectedSource.keyfacts ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedSource.keyfacts.split("|").map((fact, index) => (
                      <li key={index}>{fact.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No key facts available.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SourcesLayout;
