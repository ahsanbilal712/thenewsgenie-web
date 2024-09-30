// src/components/Adsense.jsx
import Script from "next/script";
import React from "react";

const AdSense = ({ pId }) => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5812499395538486"
      crossorigin="anonymous"
    />
  );
};

export default AdSense;
