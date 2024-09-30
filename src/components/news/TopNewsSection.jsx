import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

// Utility function to format the time ago
function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt)); // Difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `Published Just Now`;
  } else if (minutes < 60) {
    return `Published About ${minutes} ${
      minutes === 1 ? "Minute" : "Minutes"
    } Ago`;
  } else if (hours < 24) {
    return `Published About ${hours} ${hours === 1 ? "Hour" : "Hours"} Ago`;
  } else {
    return `Published About ${days} ${days === 1 ? "Day" : "Days"} Ago`;
  }
}

const TopNewsSection = ({ news }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();

  // Sort news items by the latest created_at date
  const sortedNews = useMemo(() => {
    return [...news].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [news]);

  const suggestedNews = useMemo(() => {
    if (searchTerm.length > 0) {
      return sortedNews.filter((item) =>
        item.Headline && typeof item.Headline === 'string'
          ? item.Headline.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      ).slice(0, 5); // Limit to 5 suggestions
    }
    return [];
  }, [searchTerm, sortedNews]);

  const handleNewsClick = (headline) => {
    const url = `/news/${encodeURIComponent(headline || '')}`;
    router.push(url);
  };

  return (
    <div className="recent-news-wrapper section-gap pt-4 lg:pt-16 bg-[#191919]">
      <div className="container mx-auto w-full lg:w-[1280px]">
         {/* Search input */}
         <div className="mb-8 relative">
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <div className={`flex items-center bg-white bg-opacity-10 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 ${isInputFocused ? 'ring-2 ring-blue-400' : ''}`}>
                <FiSearch className="text-gray-300 ml-6 mr-3" size={24} />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                  className="w-full py-4 px-3 rounded-full focus:outline-none bg-transparent  text-white placeholder-gray-300"
                />
              </div>
            </div>
          </div>
          
          {/* Suggestions */}
          {isInputFocused && suggestedNews.length > 0 && (
            <div className="absolute z-10 bg-white bg-opacity-10 backdrop-blur-2xl rounded-2xl shadow-xl mt-2 w-full max-w-2xl left-1/2 transform -translate-x-1/2 overflow-hidden transition-all duration-300 ease-in-out">
              {suggestedNews.map((item, index) => (
                <div 
                  key={item._id} 
                  className={`p-4 hover:bg-white hover:bg-opacity-20 cursor-pointer transition-all duration-200 ${index !== suggestedNews.length - 1 ? 'border-b border-gray-200 border-opacity-20' : ''}`}
                  onClick={() => handleNewsClick(item.Headline)}
                >
                  <p className="text-white text-2xl font-semibold mb-1">{item.Headline}</p>
                  <p className="text-gray-300 py text-sm">{item.Category} • {formatTimeAgo(item.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="mt-5 mb-2 text-2xl lg:text-5xl text-white font-bold">
          Top News
        </div>

       

        {/* Display news items */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 mb-8 mt-3 lg:mb-0">
            {sortedNews.slice(0, 1).map((newsItem) => (
              <div className="flex flex-col py-4" key={newsItem._id}>
                <Link href={`/news/${encodeURIComponent(newsItem.Headline)}`}>
                  <a className="flex-shrink-0">
                    <div className="w-full h-96 lg:h-[315px] overflow-hidden group">
                      <img
                        src={newsItem.image_url}
                        alt={newsItem.Headline}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      />
                    </div>
                  </a>
                </Link>

                <div className="media-body flex flex-col justify-between">
                  <div className="post-cat-group px-4 -mt-20 lg:-mt-[50px] mb-2">
                    <Link
                      href={`/news/${encodeURIComponent(newsItem.Headline)}`}
                    >
                      <a className="post-cat cat-btn bg-color-blue-one text-white px-3">
                        {newsItem.Category}
                      </a>
                    </Link>
                  </div>
                  <div
                    className="text-xl text-white lg:text-5xl hover-line font-bold mt-4 lg:mt-10"
                    style={{ lineHeight: "1.3" }}
                  >
                    <Link
                      href={`/news/${encodeURIComponent(newsItem.Headline)}`}
                    >
                      <a className="text-white">{newsItem.Headline}</a>
                    </Link>
                  </div>
                  <div className="text-sm text-white lg:text-lg mt-2 flex ">
                    {formatTimeAgo(newsItem.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex justify-end mr-4 lg:mr-20 hover-line">
              <Link href="/latest">
                <a className="text-sm text-white lg:text-2xl ">View All</a>
              </Link>
            </div>

            <div className="axil-recent-news">
              <div className="axil-content">
                {sortedNews.slice(1, 4).map((newsItem) => (
                  <div className="flex flex-row p-4 lg:p-4" key={newsItem._id}>
                    <Link
                      href={`/news/${encodeURIComponent(newsItem.Headline)}`}
                    >
                      <a className="flex-shrink-0">
                        <div className="w-48 h-36 lg:w-64 lg:h-52 overflow-hidden group">
                          <img
                            src={newsItem.image_url}
                            alt={newsItem.Headline}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                          />
                        </div>
                      </a>
                    </Link>

                    <div className="media-body px-4 flex flex-col justify-between">
                      <div className="post-cat-group mb-2">
                        <Link
                          href={`/news/${encodeURIComponent(
                            newsItem.Headline
                          )}`}
                        >
                          <a className="post-cat cat-btn bg-color-blue-one text-white px-3">
                            {newsItem.Category}
                          </a>
                        </Link>
                      </div>
                      <div
                        className="text-xl lg:text-2xl text-white hover-line font-bold -mt-8 lg:-mt-8"
                        style={{ lineHeight: "1.3" }}
                      >
                        <Link
                          href={`/news/${encodeURIComponent(
                            newsItem.Headline
                          )}`}
                        >
                          <a className="text-white">{newsItem.Headline}</a>
                        </Link>
                      </div>
                      <div className="text-sm text-white lg:text-lg mt-1 ">
                        {formatTimeAgo(newsItem.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNewsSection;