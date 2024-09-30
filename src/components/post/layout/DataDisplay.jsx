"use client";
import React, { useEffect, useState } from "react";

const DataDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data) return <div>No data found.</div>;

  return (
    <div>
      <h1>{data.Headline}</h1>
      <p>
        <strong>Category:</strong> {data.Category}
      </p>
      <img src={data.image_url} alt={data.Headline} />
      <p>
        <strong>Image Credits:</strong> {data.Image_source_name}
      </p>
      <p>
        <strong>Summary:</strong> {data.Summary}
      </p>

      <h2>Sources:</h2>
      <ul>
        {data.sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.SourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.SourceName}
            </a>
            <ul>
              {Object.entries(source.keyfacts).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
