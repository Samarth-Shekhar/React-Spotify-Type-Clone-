
console.log("Genres Page Loaded");
import React from 'react';
import { Link } from 'react-router-dom';

const genres = [
  { title: 'Pop', value: 'pop' },
  { title: 'Rock', value: 'rock' },
  { title: 'Hip Hop', value: 'hiphop' },
  { title: 'Jazz', value: 'jazz' },
  { title: 'Electronic', value: 'electronic' },
  { title: 'Classical', value: 'classical' },
];

const Genres = () => {
  return (
    <div className="px-4 text-white">
      <h2 className="text-3xl font-bold mb-6">Browse by Genre</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Link
            to={`/genres/${genre.value}`}
            key={genre.value}
            className="bg-white/5 hover:bg-white/10 rounded-lg p-4 text-center transition duration-200"
          >
            {genre.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;

