// src/pages/categories/[category].js

import { useState, useEffect } from "react";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadMeta from "../../components/elements/HeadMeta";
import Breadcrumb from "../../components/common/Breadcrumb";
import FooterOne from "../../components/footer/FooterOne";
import HeaderTwo from "../../components/header/HeaderTwo";
import Loading from "../../components/loading/Loading";
import { formatHeadlineForUrl } from '../../utils/urlHelpers';
import { imageSources } from '../../components/post/layout/imageSources';




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
    return `Published About ${minutes} ${minutes === 1 ? "Minute" : "Minutes"} Ago`;
  } else if (hours < 24) {
    return `Published About ${hours} ${hours === 1 ? "Hour" : "Hours"} Ago`;
  } else {
    return `Published About ${days} ${days === 1 ? "Day" : "Days"} Ago`;
  }
}

const CategoryPage = ({ initialNews, category, totalCount }) => {
  const router = useRouter();
  const [news, setNews] = useState(initialNews);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(totalCount > initialNews.length);

  useEffect(() => {
    setNews(initialNews);
    setPage(1);
    setHasMore(totalCount > initialNews.length);
    setIsLoading(false);
  }, [category, initialNews, totalCount]);

  const loadMore = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(`/api/category-news?category=${category}&page=${nextPage}&limit=40`);
      const data = await response.json();

      if (data.news.length > 0) {
        setNews(prevNews => [...prevNews, ...data.news]);
        setPage(nextPage);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (router.isFallback || (isLoading && news.length === 0)) {
    return (
      <>
        <HeadMeta metaTitle="Loading..." />
        <HeaderTwo />
        <div className="container">
          <Loading />
        </div>
        <FooterOne />
      </>
    );
  }

  if (!news || news.length === 0) {
    return (
      <>
        <HeadMeta metaTitle={`No News Found - ${category}`} />
        <HeaderTwo />
        <div className="container">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">No news found for {category}</h2>
          </div>
        </div>
        <FooterOne />
      </>
    );
  }

  return (
    <>
      <HeadMeta metaTitle={`News Category: ${category}`} />
      <HeaderTwo />
      <Breadcrumb aPage={category} />

      <div className="container">
        <h1 className="category-title mt-5 text-center text-4xl font-bold">
          Category: {category}
        </h1>
        <div className="col mt-5 mb-5">
          {news.map((item) => (
            <div
              className="col-lg-4 col-md-6 w-full md:w-[600px] lg:w-[800px] xl:w-[1200px]"
              key={item._id}
            >
              <div className="flex flex-col md:flex-row p-4 mt-[30px]">
                <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                  <a className="align-self-center">
                    <div className="w-[400px] h-[200px] lg:w-[210px] lg:h-[170px] overflow-hidden group">
                      <img
                        src={item.image_url || "/images/news-images/news_background.jpg"}
                        alt={item.Headline}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      />
                    </div>
                  </a>
                </Link>

                <div className="media-body lg:mt-0 -mt-16 md:px-10 flex -ml-5 justify-between flex-col">
                  <div className="post-cat-group ml-3 m-b-xs-10 flex items-center gap-4">
                    <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                      <a className={`post-cat cat-btn bg-color-blue-one`}>
                        {item.Category}
                      </a>
                    </Link>
                    <div className="flex space-x-3">
                      {item.sources && [...new Map(item.sources.map(source => 
                        [source.SourceName, source])).values()].map((source, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={imageSources[source.SourceName] || "/images/news-sources/default.png"}
                            alt={source.SourceName}
                            className="w-16 h-16 rounded-full border-2 border-white object-cover"
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <div className="bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                              {source.SourceName}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-3xl md:text-2xl lg:text-3xl xl:text-5xl hover-line md:-mt-4 lg:-mt-8 font-bold"
                    style={{ lineHeight: "1.3" }}>
                    <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                      <a>{item.Headline}</a>
                    </Link>
                  </div>
                  <div className="text-sm mt-3 md:text-lg lg:text-xl">
                    {formatTimeAgo(item.created_at)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center my-8">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className={`px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
      <FooterOne />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = context.params;
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("intelli-news-db");

    // Get initial batch of news and total count
    const [news, totalCount] = await Promise.all([
      db.collection("data_news")
        .find({ Category: category })
        .sort({ created_at: -1 })
        .limit(40)
        .toArray(),
      db.collection("data_news")
        .countDocuments({ Category: category })
    ]);

    return {
      props: {
        initialNews: JSON.parse(JSON.stringify(news)),
        category,
        totalCount
      },
    };
  } catch (error) {
    console.error('Error fetching category news:', error);
    return {
      props: {
        initialNews: [],
        category,
        totalCount: 0,
        error: 'Failed to fetch news'
      }
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default CategoryPage;
