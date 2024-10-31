import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Utility function to format the time ago
function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt)); // Difference in milliseconds
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

const CategoriesGrid = ({ selectedCategories }) => {
  const [categoriesNews, setCategoriesNews] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load selected categories from local storage
    const savedCategories = JSON.parse(localStorage.getItem('selectedNewsCategories')) || [];
    const categoriesToFetch = selectedCategories.length > 0 ? selectedCategories : savedCategories;
    
    if (categoriesToFetch.length > 0) {
      fetchCategoriesNews(categoriesToFetch);
    }
  }, [selectedCategories]);

  const fetchCategoriesNews = async (categories) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/categories-news?categories=${JSON.stringify(categories)}`);
      const data = await response.json();
      
      // Organize news by category
      const newsByCategory = {};
      categories.forEach(category => {
        newsByCategory[category] = data.filter(
          item => item.Category === category
        ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      });
      setCategoriesNews(newsByCategory);
    } catch (error) {
      console.error('Error fetching categories news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center">Loading news...</div>
        ) : selectedCategories.length === 0 ? (
          <div className="col-span-3 text-center">Please select a category to display news.</div>
        ) : (
          selectedCategories.map((category, index) => (
            <CategoryNews
              key={index}
              category={category}
              news={categoriesNews[category] || []}
            />
          ))
        )}
      </div>
    </div>
  );
};

const CategoryNews = ({ category, news }) => {
  const router = useRouter();

  const handleNewsClick = (e, headline) => {
    e.preventDefault();
    const url = `/news/${encodeURIComponent(headline)}`;
    router.push(url).then(() => {
      window.location.href = url; // Force a full page reload
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-5xl flex justify-center font-bold mb-4">
        <Link href={`/categories/${category}`}>
          <a className="mx-auto hover:text-blue-600 transition-colors duration-300">
            {category} {">"}
          </a>
        </Link>
      </h2>
      <hr className="text-lg h-1 w-full bg-slate-600 mb-4" />
      {news.slice(0, 3).map((item) => (
        <div className="flex flex-row p-4" key={item._id}>
          <Link href={`/news/${encodeURIComponent(item.Headline)}`}>
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

          <div className="media-body px-4 flex flex-col justify-between">
            <Link href={`/news/${encodeURIComponent(item.Headline)}`}>
              <a 
                className="text-xl font-bold -mt-4 cursor-pointer group"
                style={{ lineHeight: "1.3" }}
                onClick={(e) => handleNewsClick(e, item.Headline)}
              >
 <span className="text-black bg-gradient-to-r mt-1 from-black to-black bg-no-repeat [background-position:0_88%] [background-size:0%_2px] group-hover:[background-size:100%_2px] transition-all py-1 duration-300">
                    {item.Headline}
                  </span>              </a>
            </Link>
            <div className="text-lg mt-1">{formatTimeAgo(item.created_at)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;
