// src/components/APOD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './APOD.css'; // Import the CSS file for styling

const APOD = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPOD = async () => {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=4aKlcbVvVQ85cCnrjZ1fyPhrlVsVtAvhiSHbeLdS`
      );
      setData(response.data);
      setLoading(false);
    };
    fetchAPOD();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="apod-container">
      {data ? (
        <div className="apod-content">
          <h1 className="apod-title">{data.title}</h1>
          {data.media_type === 'image' ? (
            <img src={data.url} alt={data.title} className="apod-image" />
          ) : (
            <iframe
              title={data.title}
              src={data.url}
              allowFullScreen
              className="apod-video"
            ></iframe>
          )}
          <p className="apod-explanation">{data.explanation}</p>
        </div>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );
};

export default APOD;
