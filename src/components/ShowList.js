// src/components/ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { removeHtmlTags } from './utils';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

  return (
    <div className="container  mt-0">
      <h1 className="mb-4 text-bold ">Shows List</h1>
      {shows.map(show => (
        <div key={show.show.id} className="card mb-4">
          <img
            src={show.show.image ? show.show.image.medium : 'placeholder-image-url'}
            className="card-img-top"
            alt={show.show.name}
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h2 className="card-title">{show.show.name}</h2>
            <p className="card-text">{removeHtmlTags(show.show.summary)}</p>
            <p className="card-text">
              <strong>Genres:</strong> {show.show.genres.join(', ')}
            </p>
            <p className="card-text">
              <strong>Language:</strong> {show.show.language}
            </p>
            <Link to={`/show/${show.show.id}`} className="btn btn-primary">
              View Summary
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
