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
    return `Published Just Now`;
  } else if (minutes < 60) {
    return `Published ${minutes} ${minutes === 1 ? "Minute" : "Minutes"} Ago`;
  } else if (hours < 24) {
    return `Published ${hours} ${hours === 1 ? "Hour" : "Hours"} Ago`;
  } else {
    return `Published ${days} ${days === 1 ? "Day" : "Days"} Ago`;
  }
}

const LatestNewsSection = ({ latestNews = [], currentNewsId }) => {
  const router = useRouter();

  // Filter out current article and get latest 4
  const filteredNews = latestNews
    .filter(item => item._id !== currentNewsId)
    .slice(0, 4);

  if (filteredNews.length === 0) return null;

  return (
    <div className="bg-[#191919] py-16">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl lg:text-5xl text-white font-bold">
            Latest News
          </h2>
          <Link href="/latest">
            <a className="text-white text-xl hover:text-blue-400 transition-colors duration-300">
              View All {'>'}
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((newsItem) => (
            <div key={newsItem._id} className="flex flex-col">
              <Link href={`/news/${formatHeadlineForUrl(newsItem.Headline)}`}>
                <a className="block">
                  <div className="aspect-video overflow-hidden rounded-lg group">
                    <img
                      src={newsItem.image_url}
                      alt={newsItem.Headline}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    />
                  </div>
                </a>
              </Link>

              <div className="mt-4 flex flex-col flex-grow">
                <Link href={`/news/${formatHeadlineForUrl(newsItem.Headline)}`}>
                  <a className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-3 hover:bg-blue-600 transition-colors duration-300">
                    {newsItem.Category}
                  </a>
                </Link>

                <Link href={`/news/${formatHeadlineForUrl(newsItem.Headline)}`}>
                  <a className="group">
                    <h3 className="text-xl text-white font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {newsItem.Headline}
                    </h3>
                  </a>
                </Link>

                <div className="text-gray-400 mt-auto">
                  {formatTimeAgo(newsItem.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNewsSection; 