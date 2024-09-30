import { MongoClient } from "mongodb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderTwo from "../../components/header/HeaderTwo";
import NewsLayout from "../../components/post/layout/NewsLayout";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useRouter } from 'next/router';

const NewsPage = ({ news }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeadMeta metaTitle={news ? news.Headline : "News Not Found"} />
      <HeaderTwo />
      {news && <Breadcrumb bCat={news.Category} aPage={news.Headline} />}

      {news ? (
        <NewsLayout news={news} />
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <h1 className="text-3xl font-bold">News Not Found</h1>
        </div>
      )}
      <FooterOne />
    </div>
  );
};

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  cachedClient = client;
  return client;
}

export const getServerSideProps = async (context) => {
  const { headline } = context.params;

  if (!headline) {
    return { props: { news: null } };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("intelli-news-db");
    const decodedHeadline = decodeURIComponent(headline.replace(/-/g, ' '));
    const news = await db
      .collection("data_news")
      .findOne({ Headline: decodedHeadline });

    if (!news) {
      return { notFound: true };
    }

    return {
      props: {
        news: JSON.parse(JSON.stringify(news)),
      },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { props: { news: null } };
  }
};

export default NewsPage;
