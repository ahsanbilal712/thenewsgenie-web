import Head from "next/head";
import { useRouter } from 'next/router';

const HeadMeta = ({ metaTitle, metaDescription, ogImage, currentUrl }) => {
  const router = useRouter();
  const defaultTitle = "The News Genie | Latest News";
  const defaultDescription = "Stay informed with The News Genie - Your trusted source for authentic and latest news.";
  const baseUrl = "https://thenewsgenie.com";
  
  // Get the current full URL
  const currentPath = currentUrl || router.asPath;
  const fullUrl = `${baseUrl}${currentPath}`;

  // Truncate description if needed
  const truncateDescription = (text, maxLength = 160) => {
    if (!text) return defaultDescription;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const finalDescription = truncateDescription(metaDescription);

  return (
    <Head>
      {/* Basic metas */}
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta
        name="description"
        content={finalDescription}
      />

      {/* Title */}
      <title>{metaTitle ? `${metaTitle} | The News Genie` : defaultTitle}</title>

      {/* Favicon */}
      <link
        rel="icon"
        type="image/x-icon"
        href={`${baseUrl}/favicon.ico`}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={metaTitle ? `${metaTitle} | The News Genie` : defaultTitle}
      />
      <meta
        property="og:description"
        content={finalDescription}
      />
      <meta property="og:url" content={fullUrl} />
      <meta 
        property="og:image" 
        content={ogImage || `${baseUrl}/og-image.png`}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={metaTitle ? `${metaTitle} | The News Genie` : defaultTitle}
      />
      <meta
        name="twitter:description"
        content={finalDescription}
      />
      <meta 
        name="twitter:image" 
        content={ogImage || `${baseUrl}/twitter-image.png`}
      />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Head>
  );
};

export default HeadMeta;
