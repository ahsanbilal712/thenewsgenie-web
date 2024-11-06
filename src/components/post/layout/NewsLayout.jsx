// src/components/post/NewsLayout.jsx
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from 'next/router';
import SourcesLayout from "./SourcesLayout";
import FeedbackLayout from "./FeedbackLayout";
import Breadcrumb from "../../common/Breadcrumb";
import { formatHeadlineForUrl } from '../../../utils/urlHelpers';

const NewsLayout = ({ news }) => {
  const router = useRouter();
  
  if (!news) return (
    <div className="news-not-found text-center py-10">No news found.</div>
  );

  const baseUrl = "https://thenewsgenie.com";
  const currentUrl = `/news/${formatHeadlineForUrl(news.Headline)}`;
  const fullUrl = `${baseUrl}${currentUrl}`;
  
  // Format the date for structured data
  const publishedDate = new Date(news.created_at).toISOString();

  // Truncate summary for meta description
  const truncateSummary = (text, maxLength = 160) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Create structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": news.Headline,
    "image": [news.image_url],
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": [{
      "@type": "Organization",
      "name": "The News Genie",
      "url": baseUrl
    }],
    "publisher": {
      "@type": "Organization",
      "name": "The News Genie",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo-intellinews.jpeg`
      }
    },
    "description": news.Summary,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{news.Headline} | The News Genie</title>
        <meta name="description" content={truncateSummary(news.Summary)} />
        
        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={news.Headline} />
        <meta property="og:description" content={truncateSummary(news.Summary)} />
        <meta property="og:image" content={news.image_url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="The News Genie" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TheNewsGenie" />
        <meta name="twitter:title" content={news.Headline} />
        <meta name="twitter:description" content={truncateSummary(news.Summary)} />
        <meta name="twitter:image" content={news.image_url} />

        {/* Article Specific Meta Tags */}
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:section" content={news.Category} />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="news-article section-gap p-t-xs-15 p-t-sm-60">
        <div className="container">
          <h1 className="news-headline">{news.Headline}</h1>
          <hr className="h-[2px] my-8 bg-gray-700 border-0 dark:bg-gray-900" />
          <h4 className="news-category">Category: {news.Category}</h4>
          <div className="rounded-xl mx-auto p-10 flex flex-col justify-center">
            <img
              src={news.image_url}
              alt={news.Headline}
              className=""
              style={{
                borderRadius: "20px",
                padding: "1rem",
                display: "block",
                margin: "0 auto",
              }}
            />
            <div className="mx-auto font-bold">
              Image Credits: {news.Image_source_name}
            </div>
          </div>
          <hr className="h-[2px] my-8 bg-gray-700 border-0 dark:bg-gray-900" />

          <p className="mt-16">{news.Summary}</p>

          <SourcesLayout news={news} />
          
          <FeedbackLayout newsId={news._id.toString()} />
        </div>
      </div>
    </>
  );
};

export default NewsLayout;
