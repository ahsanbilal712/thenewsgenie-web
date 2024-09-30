// src/components/post/NewsLayout.jsx
import React from "react";
import Link from "next/link";
import SourcesLayout from "./SourcesLayout";
import Breadcrumb from "../../common/Breadcrumb";
const NewsLayout = ({ news }) => {
  if (!news)
    return (
      <div className="news-not-found text-center py-10">No news found.</div>
    );

  return (
    <div className="news-article section-gap p-t-xs-15 p-t-sm-60">
      <div className="container">
        <h1 className="news-headline">{news.Headline}</h1>
        <hr class="h-[2px] my-8 bg-gray-700 border-0 dark:bg-gray-900" />
        <h4 className="news-category">Category: {news.Category}</h4>
        <div className="rounded-xl mx-auto p-10 flex flex-col justify-center ">
          <img
            src={news.image_url}
            alt={news.Headline}
            className=""
            style={{
              borderRadius: "20px", // Equivalent to Tailwind's rounded-xl
              padding: "1rem", // Equivalent to Tailwind's p-4
              display: "block",
              margin: "0 auto",
            }}
          />
          <div className="mx-auto font-bold">
            Image Credits: {news.Image_source_name}
          </div>
        </div>
        <hr className="h-[2px] my-8 bg-gray-700 border-0 dark:bg-gray-900" />

        <p className=" mt-16">{news.Summary}</p>

        <SourcesLayout news={news} />
      </div>
    </div>
  );
};

export default NewsLayout;
