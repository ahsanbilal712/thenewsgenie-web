import React, { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { slugify } from "../../utils";

function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt)); // Difference in millisecos
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
const formatHeadlineForUrl = (headline) => {
  return encodeURIComponent(headline);
};

const HomeNews = ({ news = [], category, setCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;

  if (!Array.isArray(news)) {
    return <div>No news available</div>;
  }

  // Sort news items by the latest created_at date
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const currentNews = sortedNews.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedNews.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Determine page numbers to display
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div className="container">
      <div className="col mt-5 mb-5">
        {currentNews.length > 0 ? (
          currentNews.map((newsItem) => (
            <div
              className="col-lg-4 col-md-6 w-full md:w-[600px] lg:w-[800px] xl:w-[1200px]"
              key={newsItem._id}
            >
              <div className="flex flex-col md:flex-row p-4 mt-[30px]">
                <Link href={`/news/${formatHeadlineForUrl(newsItem.Headline)}`}>
                  <a className="align-self-center">
                    <div className="w-[400px] h-[200px]  lg:w-[210px]  lg:h-[170px] overflow-hidden group">
                      <img
                        src={newsItem.image_url}
                        alt={newsItem.Headline}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      />
                    </div>
                  </a>
                </Link>
                <div className="media-body lg:mt-0 -mt-16 md:px-10 flex -ml-5 justify-between flex-col">
                  <div className="post-cat-group ml-3 m-b-xs-10">
                    <Link
                      href={`/news/${formatHeadlineForUrl(newsItem.Headline)}`}
                    >
                      <a className={`post-cat cat-btn bg-color-blue-one`}>
                        {newsItem.Category}
                      </a>
                    </Link>
                  </div>
                  <div
                    className="text-3xl md:text-2xl lg:text-3xl xl:text-5xl hover-line  md:-mt-4 lg:-mt-8 font-bold"
                    style={{ lineHeight: "1.3" }}
                  >
                    <Link
                      href={`/news/${formatHeadlineForUrl(newsItem.Headline)}`}
                    >
                      <a>{newsItem.Headline}</a>
                    </Link>
                  </div>
                  <div className="text-sm mt-3 md:text-lg lg:text-xl">
                    {formatTimeAgo(newsItem.created_at)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No news available</div>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center my-10">
        {currentPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-1 md:px-4 md:py-2 mx-1 md:mx-2 bg-gray-200 rounded"
            >
              1
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 md:px-4 md:py-2 mx-1 md:mx-2 bg-gray-200 rounded"
            >
              Previous
            </button>
          </>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`px-3 py-1 md:px-4 md:py-2 mx-1 md:mx-2 ${
              startPage + index === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            {startPage + index}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 md:px-4 md:py-2 mx-1 md:mx-2 bg-gray-200 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

// Define prop types
HomeNews.propTypes = {
  news: PropTypes.array,
  category: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
};

export default HomeNews;
