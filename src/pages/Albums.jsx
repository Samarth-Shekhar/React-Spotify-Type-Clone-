import React from 'react';
import { Link } from 'react-router-dom';

const mockAlbums = [
  {
    id: 'midnight-vibes',
    title: 'Midnight Vibes',
    artist: 'DJ Aurora',
    image: 'https://picsum.photos/300?random=1',
  },
  {
    id: 'sunset-melodies',
    title: 'Sunset Melodies',
    artist: 'The Chill Bros',
    image: 'https://picsum.photos/300?random=2',
  },
  {
    id: 'lofi-beats',
    title: 'Lofi Beats',
    artist: 'LoFi Girl',
    image: 'https://picsum.photos/300?random=3',
  },
  {
    id: 'chill-sounds',
    title: 'Chill Sounds',
    artist: 'The Cooltones',
    image: 'https://picsum.photos/300?random=4',
  },
];

const Albums = () => {
  return (
    <div className="flex flex-col px-4 py-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockAlbums.map((album) => (
          <div
            key={album.id}
            className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition"
          >
            <img
              src={album.image}
              alt={album.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-3 font-semibold">{album.title}</h3>
            <p className="text-sm text-gray-300">{album.artist}</p>
            <Link
              to={`/albums/${album.id}`}
              className="text-blue-400 text-sm mt-2 inline-block hover:underline"
            >
              View Album
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
