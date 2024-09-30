// src/pages/categories/[category].js

import { MongoClient } from "mongodb";
import Link from "next/link";
import HeadMeta from "../../components/elements/HeadMeta";
import Breadcrumb from "../../components/common/Breadcrumb";

import FooterOne from "../../components/footer/FooterOne";
import HeaderTwo from "../../components/header/HeaderTwo";

const formatHeadlineForUrl = (headline) => {
  return encodeURIComponent(headline);
};

// Utility function to format the time ago
function formatTimeAgo(createdAt) {
  const now = new Date();
  const diff = Math.abs(now - new Date(createdAt)); // Difference in milliseconds
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

const CategoryPage = ({ news }) => {
  if (!news || news.length === 0) {
    return <div>No news found for this category.</div>;
  }

  // Sort the news array by created_at date in descending order
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <>
      <HeadMeta metaTitle={`News Category: ${sortedNews[0].Category}`} />
      <HeaderTwo />
      <Breadcrumb aPage={sortedNews[0].Category} />

      <div className="container">
        <h1 className="category-title mt-5">
          Category: {sortedNews[0].Category}
        </h1>
        <div className="col mt-5 mb-5">
          {sortedNews.map((item) => (
            <div
              className="col-lg-4 col-md-6 w-full md:w-[600px] lg:w-[800px] xl:w-[1200px]"
              key={item._id}
            >
              <div className="flex flex-col md:flex-row p-4 mt-[30px]">
                <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                  <a className="align-self-center">
                    <div className=" w-[400px] h-[200px] lg:w-[210px] lg:h-[170px] overflow-hidden group">
                      <img
                        src={
                          item.image_url ||
                          "/images/news-images/news_background.jpg"
                        }
                        alt={item.Headline}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      />
                    </div>
                  </a>
                </Link>

                <div className="media-body lg:mt-0 -mt-16 md:px-10 flex -ml-5 justify-between flex-col">
                  <div className="post-cat-group ml-3 m-b-xs-10">
                    <Link href={`/news/${formatHeadlineForUrl(item.Headline)}`}>
                      <a className={`post-cat cat-btn bg-color-blue-one`}>
                        {item.Category}
                      </a>
                    </Link>
                  </div>
                  <div
                    className="text-3xl md:text-2xl lg:text-3xl xl:text-5xl hover-line md:-mt-4 lg:-mt-8 font-bold"
                    style={{ lineHeight: "1.3" }}
                  >
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
      </div>
      <FooterOne />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = context.params;

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("intelli-news-db");

  // Retrieve news sorted by created_at date in descending order directly from the database
  const news = await db
    .collection("data_news")
    .find({ Category: category })
    .sort({ created_at: -1 }) // Sorting by created_at in descending order
    .toArray();
  client.close();

  return {
    props: {
      news: news.map((document) => JSON.parse(JSON.stringify(document))),
    },
  };
};

export default CategoryPage;
