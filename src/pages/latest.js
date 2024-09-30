import Link from "next/link";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import Breadcrumb from "../components/common/Breadcrumb";

import HomeNews from "../components/news/HomeNews";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../components/loading/Loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

function LatestNews() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const { data, error } = useSWR(`/api/news?category=${category}`, fetcher);

  if (error) return <div>Failed to load data.</div>;
  if (!data) return <Loading />;

  // Log data to check its structure
  console.log("Data fetched from API:", data);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory) {
      router.push(`/categories/${selectedCategory}`);
    }
  };

  return (
    <>
      <HeadMeta metaTitle="LatestNews" />

      <HeaderTwo />
      <Breadcrumb aPage="Latest" />

      <div className="flex justify-center text-5xl py-10 font-bold">
        Latest News
      </div>
      <HomeNews
        news={Array.isArray(data) ? data : []}
        category={category}
        setCategory={setCategory}
      />
      <FooterOne />
    </>
  );
}

export default LatestNews;
