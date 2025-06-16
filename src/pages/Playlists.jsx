import React from 'react';
import { Link } from 'react-router-dom';

const mockPlaylists = [
  { id: 'chill-hits', name: 'Chill Hits' },
  { id: 'top-hits', name: 'Top Hits 2025' },
  { id: 'focus-beats', name: 'Focus Beats' },
];

const Playlists = () => {
  return (
    <div className="px-4 py-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Playlists</h2>
      <ul className="space-y-4">
        {mockPlaylists.map((playlist) => (
          <li key={playlist.id}>
            <Link
              to={`/playlists/${playlist.id}`}
              className="text-blue-400 hover:underline text-lg"
            >
              {playlist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;

