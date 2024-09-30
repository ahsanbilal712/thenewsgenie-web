// Import necessary styles and the Script component from next/script
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import Script from "next/script";
import Head from "next/head"; // Import Head for SEO-related meta tags
import AdSense from "../components/Adsense"; // Import your AdSense component

// Define the custom App component
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Use the Head component to manage the head section */}
      <Head>
        <title>A News</title>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="A News - The latest updates in AI technology"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="m2xs2KSR3ynGf6-R3l1pBfQ8lntpPJuQKGH-l5kgcyw"
        />
      </Head>

      {/* Google Analytics Script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZBLBZF7D7R"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZBLBZF7D7R');
        `}
      </Script>

      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5812499395538486"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* Render Google AdSense Component */}
      <AdSense pid="ca-pub-5812499395538486" />

      {/* Render the current page's component */}
      <Component {...pageProps} />
    </>
  );
}

// Export the custom App component as the default export
export default MyApp;
