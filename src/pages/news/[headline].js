import { MongoClient } from "mongodb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderTwo from "../../components/header/HeaderTwo";
import NewsLayout from "../../components/post/layout/NewsLayout";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useRouter } from 'next/router';
import { decodeHeadlineFromUrl } from '../../utils/urlHelpers';

const NewsPage = ({ news, relatedNews }) => {
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
        <NewsLayout news={news} initialRelatedNews={relatedNews} />
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
    
    const decodedHeadline = decodeHeadlineFromUrl(headline);
    console.log('Searching for headline:', decodedHeadline);

    // Escape special regex characters in the headline
    const escapeRegex = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // Create search patterns
    const searchPatterns = [
      { Headline: new RegExp(`^${escapeRegex(decodedHeadline)}$`, 'i') },
      { Headline: new RegExp(escapeRegex(decodedHeadline).replace(/s\b/g, "('s|s)").replace(/'s\b/g, "('s|s)"), 'i') },
      { Headline: new RegExp(escapeRegex(decodedHeadline).replace(/\s+/g, "\\s+").replace(/[:.]/g, "[:.]*"), 'i') },
      { Headline: new RegExp(decodedHeadline.split(' ').map(word => escapeRegex(word)).join('\\s+'), 'i') }
    ];

    // Try to find the news with any of the patterns
    let news = await db.collection("data_news").findOne(
      {
        $or: searchPatterns
      },
      {
        projection: {
          Headline: 1,
          Category: 1,
          Summary: 1,
          sources: 1,
          image_url: 1,
          Image_source_name: 1,
          created_at: 1,
          feedbacks: 1,
          similar_facts: 1,
          conflicting_facts: 1
        }
      }
    );

    if (!news) {
      // If no match found, try a more flexible word-based search
      news = await db.collection("data_news").findOne(
        {
          Headline: {
            $regex: new RegExp(
              decodedHeadline
                .split(' ')
                .filter(word => word.length > 2)
                .map(word => `(?:${escapeRegex(word)}|${escapeRegex(word)}['']?s)`)
                .join('.*'),
              'i'
            )
          }
        },
        {
          projection: {
            Headline: 1,
            Category: 1,
            Summary: 1,
            sources: 1,
            image_url: 1,
            Image_source_name: 1,
            created_at: 1,
            feedbacks: 1,
            similar_facts: 1,
            conflicting_facts: 1
          }
        }
      );
    }

    if (!news) {
      console.log('No match found. Attempted patterns:', {
        decodedHeadline,
        patterns: searchPatterns.map(p => p.Headline.toString()),
        fallbackPattern: decodedHeadline
          .split(' ')
          .filter(word => word.length > 2)
          .map(word => `(?:${word}|${word}['']?s)`)
          .join('.*')
      });

      const availableHeadlines = await db.collection("data_news")
        .find({}, { projection: { Headline: 1 } })
        .limit(5)
        .toArray();
      console.log('Sample of available headlines:', availableHeadlines);

      return { notFound: true };
    }

    console.log('Found matching news:', news.Headline);

    // Fetch related news for the same category
    const relatedNews = await db.collection("data_news").find(
      {
        Category: news.Category,
        _id: { $ne: news._id }  // Exclude current news
      },
      {
        projection: {
          Headline: 1,
          Category: 1,
          Summary: 1,
          image_url: 1,
          created_at: 1,
        },
        sort: { created_at: -1 },
        limit: 4
      }
    ).toArray();

    return {
      props: {
        news: JSON.parse(JSON.stringify(news)),
        relatedNews: JSON.parse(JSON.stringify(relatedNews)),
      },
    };
  } catch (error) {
    console.error("Error fetching news:", error, "Headline:", headline);
    return { props: { news: null, relatedNews: [] } };
  }
};

export default NewsPage;
