// src/components/post/NewsLayout.jsx
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from 'next/router';
import SourcesLayout from "./SourcesLayout";
import FeedbackLayout from "./FeedbackLayout";
import Breadcrumb from "../../common/Breadcrumb";
import { formatHeadlineForUrl } from '../../../utils/urlHelpers';
import { seoConfig } from '../../../utils/seo-config';
import FactsLayout from "./FactsLayout";
const NewsLayout = ({ news }) => {
  const router = useRouter();
  
  console.log("News Data in NewsLayout:", news);

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

  // Add keywords based on category and content
  const generateKeywords = (newsItem) => {
    const baseKeywords = ["news", newsItem.Category.toLowerCase(), "latest news"];
    const headlineWords = newsItem.Headline.toLowerCase()
      .split(' ')
      .filter(word => word.length > 3);
    return [...new Set([...baseKeywords, ...headlineWords])].join(', ');
  };

  // First, verify the data with a console log
  console.log("News Data:", {
    conflicting_facts: news.conflicting_facts,
    similar_facts: news.similar_facts
  });

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{news.Headline} | The News Genie</title>
        <meta name="description" content={truncateSummary(news.Summary)} />
        
        {/* WhatsApp Preview Meta Tags */}
        <meta property="og:title" content={news.Headline} />
        <meta property="og:description" content={truncateSummary(news.Summary)} />
        <meta property="og:image" content={news.image_url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="The News Genie" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TheNewsGenie" />
        <meta name="twitter:creator" content="@TheNewsGenie" />
        <meta name="twitter:title" content={news.Headline} />
        <meta name="twitter:description" content={truncateSummary(news.Summary)} />
        <meta name="twitter:image" content={news.image_url} />
        <meta name="twitter:image:alt" content={news.Headline} />

        {/* Article Specific Meta Tags */}
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:section" content={news.Category} />
        <meta property="article:tag" content={news.Category} />
        
        {/* Image Optimization for Google Images */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="robots" content="max-image-preview:large" />
        <link rel="image_src" href={news.image_url} />
        
        {/* Google Search Optimization */}
        <meta name="googlebot" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="description" content={truncateSummary(news.Summary)} />
        <link rel="canonical" href={fullUrl} />

        {/* Structured Data for Google Search */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": news.Headline,
              "image": [
                {
                  "@type": "ImageObject",
                  "url": news.image_url,
                  "width": 1200,
                  "height": 630,
                  "caption": news.Headline
                }
              ],
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
                  "url": `${baseUrl}/images/logo-intellinews.jpeg`,
                  "width": 600,
                  "height": 60
                }
              },
              "description": truncateSummary(news.Summary),
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": fullUrl
              },
              "articleBody": news.Summary,
              "keywords": generateKeywords(news)
            })
          }}
        />

        {/* Additional SEO tags */}
        <meta name="keywords" content={generateKeywords(news)} />
        <meta name="author" content="The News Genie" />
        <meta name="news_keywords" content={`${news.Category}, ${news.Headline.split(' ').slice(0, 5).join(', ')}`} />
        
        {/* Additional Open Graph tags */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={publishedDate} />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://thenewsgenie.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": news.Category,
                "item": `https://thenewsgenie.com/categories/${news.Category.toLowerCase()}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": news.Headline
              }
            ]
          })}
        </script>
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
              title={news.Headline}
              loading="eager"
              width="1200"
              height="630"
              className="news-image"
              style={{
                borderRadius: "20px",
                padding: "1rem",
                display: "block",
                margin: "0 auto",
              }}
              itemProp="image"
            />
            <div className="mx-auto font-bold">
              Image Credits: {news.Image_source_name}
            </div>
          </div>
          <hr className="h-[2px] my-8 bg-gray-700 border-0 dark:bg-gray-900" />

          <p className="mt-16">{news.Summary}</p>

          <SourcesLayout news={news} />
          
          {(news.conflicting_facts?.length > 0 || news.similar_facts?.length > 0) && (
            <div className="mt-8">
              <FactsLayout 
                conflictingFacts={Array.isArray(news.conflicting_facts) ? news.conflicting_facts : []}
                similarFacts={Array.isArray(news.similar_facts) ? news.similar_facts : []}
              />
            </div>
          )}

          <FeedbackLayout newsId={news._id.toString()} />
        </div>
      </div>
    </>
  );
};

export default NewsLayout;
