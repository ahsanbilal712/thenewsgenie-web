import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import Script from "next/script";
import Head from "next/head";
import AdSense from "../components/Adsense";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ 
      showSpinner: false,
      trickleSpeed: 100,
      minimum: 0.3,
    });

    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };

    const handleComplete = () => {
      setIsLoading(false);
      NProgress.done();
    };

    // Add event listeners
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      // Clean up event listeners
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>The News Genie</title>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="The News Genie - The Latest News"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="m2xs2KSR3ynGf6-R3l1pBfQ8lntpPJuQKGH-l5kgcyw"
        />
        <link rel="canonical" href={`https://thenewsgenie.com${pageProps.canonicalPath || ''}`} />
       
        
        {/* Preload key routes */}
        <link rel="preload" href="/latest" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/api/news" as="fetch" crossOrigin="anonymous" />
        <link rel="icon" type="image/x-icon" href="/images/newsgenielogo3.png" sizes="64x64"></link>
      </Head>

      {/* Custom loading bar styles */}
      <style jsx global>{`
        #nprogress .bar {
          background: #2563eb !important;
          height: 3px;
        }
        
        #nprogress .peg {
          box-shadow: 0 0 10px #2563eb, 0 0 5px #2563eb;
        }

        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 200ms ease-in;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 200ms ease-out;
        }
      `}</style>

      {/* Analytics and AdSense scripts with optimized loading */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H0EG6GCSBM"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H0EG6GCSBM');
        `}
      </Script>

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3840113030467128"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <AdSense pid="ca-pub-3840113030467128" />

      {/* Render page with transition */}
      <div className={`${isLoading ? 'opacity-50' : ''} transition-opacity duration-200`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
