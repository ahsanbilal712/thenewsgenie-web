import Link from "next/link";
import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import useSWR from "swr";
import CategoriesLatestSection from "../components/news/CategoriesLatestSection";
import NewsTopicsSection from "../components/news/NewsTopicsSection";
import TopNewsSection from "../components/news/TopNewsSection";
import Loading from "../components/loading/Loading";
import AdSense from "../components/Adsense";

const fetcher = (url) => fetch(url).then((res) => res.json());

function HomeTwo() {
  const initialCategories = ["Pakistan", "World", "Sports"];
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const categories = [
    "Pakistan",
    "World",
    "Sports",
    "Business",
    "Entertainment",
    "Weather",
    "Health",
    "Science",
    "Technology",
  ];

  const { data, error } = useSWR(`/api/news`, fetcher);

  // Load selected categories from localStorage on initial render
  useEffect(() => {
    const savedCategories = localStorage.getItem('selectedCategories');
    if (savedCategories) {
      setSelectedCategories(JSON.parse(savedCategories));
    }
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    let newSelectedCategories;
    if (selectedCategories.includes(selectedCategory)) {
      newSelectedCategories = selectedCategories.filter((category) => category !== selectedCategory);
    } else {
      newSelectedCategories = [...selectedCategories, selectedCategory];
    }
    setSelectedCategories(newSelectedCategories);
    // Save to localStorage
    localStorage.setItem('selectedCategories', JSON.stringify(newSelectedCategories));
  };

  const handleLinkClick = useCallback((e) => {
    const href = e.currentTarget.href;
    if (href.startsWith(window.location.origin) || href.startsWith('/')) {
      e.preventDefault();
      setIsLoading(true);
      router.push(href).then(() => setIsLoading(false));
    }
  }, [router]);

  if (error) return <div>Failed to load data.</div>;
  if (!data) return <Loading />;

  return (
    <html lang="en">
      <Head>
        <AdSense pid="ca-pub-5812499395538486" />
        <meta
          name="google-site-verification"
          content="m2xs2KSR3ynGf6-R3l1pBfQ8lntpPJuQKGH-l5kgcyw"
        />
        <meta name="google-adsense-account" content="ca-pub-5812499395538486" />
      </Head>

      <HeadMeta metaTitle="Home" />
      <body>
        <HeaderTwo />

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <TopNewsSection
          news={data}
          category={category}
          setCategory={setCategory}
        />

        <div className="container mt-5">
          <div className="my-5 text-5xl font-bold">Your Topics</div>

          <div className="mb-3">
            <h5>Select Categories</h5>
            <div className="flex flex-wrap gap-4">
              {categories.map((category, index) => (
                <div key={index} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`category-${index}`}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  <label
                    className="form-check-label ml-2"
                    htmlFor={`category-${index}`}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="adsense-container my-5">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-5812499395538486"
              data-ad-slot="your-ad-slot"
              data-ad-format="auto"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                (adsbygoogle = window.adsbygoogle || []).push({});
              `,
              }}
            />
          </div>

          <CategoriesLatestSection
            selectedCategories={selectedCategories}
            newsData={data}
          />
          <NewsTopicsSection
            selectedCategories={selectedCategories}
            newsData={data}
          />
        </div>

        <FooterOne />
      </body>
    </html>
  );
}

export default HomeTwo;