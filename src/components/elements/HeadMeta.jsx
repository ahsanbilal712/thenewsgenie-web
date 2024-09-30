import Head from "next/head";

const HeadMeta = ({ metaTitle, metaDescription }) => {
  const defaultTitle = "IntelliNews | Latest News";
  const defaultDescription =
    "Stay informed with IntelliNews - Your trusted source for authentic and latest news.";

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
        content={metaDescription ? metaDescription : defaultDescription}
      />

      {/* Title */}
      <title>{metaTitle ? `${metaTitle} | IntelliNews` : defaultTitle}</title>

      {/* Favicon */}
      <link
        rel="icon"
        type="image/x-icon"
        href={`${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_BASEPATH ?? ""
            : ""
        }/favicon.ico`}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={metaTitle ? `${metaTitle} | IntelliNews` : defaultTitle}
      />
      <meta
        property="og:description"
        content={metaDescription ? metaDescription : defaultDescription}
      />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:image" content="/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={metaTitle ? `${metaTitle} | IntelliNews` : defaultTitle}
      />
      <meta
        name="twitter:description"
        content={metaDescription ? metaDescription : defaultDescription}
      />
      <meta name="twitter:image" content="/twitter-image.png" />

      {/* Canonical */}
      <link rel="canonical" href="https://yourwebsite.com" />
    </Head>
  );
};

export default HeadMeta;
