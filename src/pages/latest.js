import Link from "next/link";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import Breadcrumb from "../components/common/Breadcrumb";
import HomeNews from "../components/news/HomeNews";
import { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import { formatHeadlineForUrl } from '../utils/urlHelpers';

function LatestNews() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch news data
  const fetchNews = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const response = await fetch(`/api/news?page=${pageNum}&limit=40`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      
      if (pageNum === 1) {
        setNews(data.news || []);
      } else {
        setNews(prev => [...prev, ...(data.news || [])]);
      }
      
      setHasMore(data.hasMore);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews(1);
  }, []);

  // Load more handler
  const handleLoadMore = async () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchNews(nextPage, true);
    }
  };

  return (
    <>
      <HeadMeta metaTitle="Latest News" />
      <HeaderTwo />
      <Breadcrumb aPage="Latest" />

      <div className="container mx-auto px-4">
        <div className="flex justify-center text-5xl py-10 font-bold">
          Latest News
        </div>

        {isLoading && news.length === 0 ? (
          <Loading />
        ) : error ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-red-500 text-xl">{error}</div>
          </div>
        ) : (
          <>
            <HomeNews news={news} />
            
            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center my-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className={`px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors
                    ${isLoadingMore ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoadingMore ? (
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
          </>
        )}
      </div>

      <FooterOne />
    </>
  );
}

export default LatestNews;
