import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatHeadlineForUrl } from '../../../utils/urlHelpers';

function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt));
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `published just now`;
  } else if (minutes < 60) {
    return `published ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `published ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `published ${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

const RelatedCategoryNews = ({ category, news, currentNewsId, isLoading }) => {
  const router = useRouter();

  const handleNewsClick = (e, headline) => {
    e.preventDefault();
    const url = `/news/${formatHeadlineForUrl(headline)}`;
    router.push(url);
  };

  // Filter out current article and get latest 3
  const relatedNews = news
    .filter(item => item._id !== currentNewsId)
    .slice(0, 6);

  if (isLoading) {
    return (
      <div className="mt-12 pt-8 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
        <hr className="h-1 w-full bg-gray-200 mb-4" />
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex flex-row p-4 space-x-4">
            <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (relatedNews.length === 0) return null;

  return (
    <div className="mt-12 pt-8">
      {/* Category Header */}
      <h2 className="text-5xl flex items-center font-bold mb-4">
        <Link href={`/categories/${formatHeadlineForUrl(category)}`}>
          <a className="hover:text-blue-600 transition-colors duration-300">
            {category} {">"}
          </a>
        </Link>
      </h2>
      <hr className="text-lg h-1 w-full bg-slate-600 mb-4" />

      {/* News Items */}
      <div className="space-y-2">
        {relatedNews.map((item) => (
          <div className="flex flex-row p-4" key={item._id}>
            {/* Image */}
            <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
              <a 
                className="flex-shrink-0 cursor-pointer"
                onClick={(e) => handleNewsClick(e, item.Headline)}
              >
                <div className="w-32 h-32 -mt-3 overflow-hidden group">
                  <img
                    src={item.image_url}
                    alt={item.Headline}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                  />
                </div>
              </a>
            </Link>

            {/* Content */}
            <div className="media-body px-4 flex flex-col justify-between">
              <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                <a 
                  className="text-xl font-bold -mt-4 cursor-pointer group"
                  style={{ lineHeight: "1.3" }}
                  onClick={(e) => handleNewsClick(e, item.Headline)}
                >
                  <span className="text-black bg-gradient-to-r mt-1 from-black to-black bg-no-repeat [background-position:0_88%] [background-size:0%_2px] group-hover:[background-size:100%_2px] transition-all py-1 duration-300">
                    {item.Headline}
                  </span>
                </a>
              </Link>
              <div className="text-lg mt-1">{formatTimeAgo(item.created_at)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCategoryNews; 