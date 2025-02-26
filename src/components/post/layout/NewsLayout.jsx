import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from 'next/router';
import SourcesLayout from "./SourcesLayout";
import FeedbackLayout from "./FeedbackLayout";
import Breadcrumb from "../../common/Breadcrumb";
import { formatHeadlineForUrl } from '../../../utils/urlHelpers';
import { seoConfig } from '../../../utils/seo-config';
import FactsLayout from "./FactsLayout";
import RelatedCategoryNews from "./RelatedCategoryNews";
import LatestNewsSection from './LatestNewsSection';
import FactComparison from './FactComparison'; // Import the new component

const NewsLayout = ({ news, initialRelatedNews = [], latestNews = [] }) => {
  const [categoryNews, setCategoryNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setIsLoadingNews(true);
      try {
        const response = await fetch(`/api/categories-news?categories=${JSON.stringify([news.Category])}`);
        const data = await response.json();
        setCategoryNews(data);
      } catch (error) {
        console.error('Error fetching category news:', error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    if (news?.Category) {
      fetchCategoryNews();
    }
  }, [news?.Category]);

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

      <div className="news-article bg-white min-h-screen">
        <div className="max-w-[120rem] mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-left leading-tight">
                  {news.Headline}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-base font-medium">
                    {news.Category}
                  </span>
                  <span className="text-base">
                    {new Date(news.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                  <img
                    src={news.image_url}
                    alt={news.Headline}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Image Credits: {news.Image_source_name}
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 font-normal">
                  {news.Summary}
                </p>
              </div>

              <hr className="my-12 border-gray-200" />

              <div className="lg:hidden mb-8">
                {(news.similar_facts?.length > 0 || news.conflicting_facts?.length > 0 || !isLoadingNews) && (
                  <div className="w-full bg-white rounded-lg">
                    <FactsLayout 
                      similarFacts={Array.isArray(news.similar_facts) ? news.similar_facts : []}
                      conflictingFacts={Array.isArray(news.conflicting_facts) ? news.conflicting_facts : []}
                      news={{
                        Category: news.Category,
                        _id: news._id,
                        categoryNews: categoryNews
                      }}
                      isLoading={isLoadingNews}
                    />
                  </div>
                )}

                <RelatedCategoryNews 
                  category={news.Category} 
                  news={initialRelatedNews} 
                  currentNewsId={news._id} 
                />
              </div>
              
              <FactComparison news={news} /> {/* Add the FactComparison component here */}

              <div className="max-w-[95%] space-y-8">
                <SourcesLayout news={news} />
                <FeedbackLayout newsId={news._id.toString()} />
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1">
              {(news.similar_facts?.length > 0 || news.conflicting_facts?.length > 0 || !isLoadingNews) && (
                <div className="w-full bg-white rounded-lg">
                  <FactsLayout 
                    similarFacts={Array.isArray(news.similar_facts) ? news.similar_facts : []}
                    conflictingFacts={Array.isArray(news.conflicting_facts) ? news.conflicting_facts : []}
                    news={{
                      Category: news.Category,
                      _id: news._id,
                      categoryNews: categoryNews
                    }}
                    isLoading={isLoadingNews}
                  />
                </div>
              )}

              <RelatedCategoryNews 
                category={news.Category} 
                news={initialRelatedNews} 
                currentNewsId={news._id} 
              />
            </div>
          </div>
        </div>

        {latestNews && latestNews.length > 0 && (
          <div className="mt-12">
            <LatestNewsSection latestNews={latestNews} />
          </div>
        )}
      </div>
    </>
  );
};

export default NewsLayout;