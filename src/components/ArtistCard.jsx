import React from 'react';

const ArtistCard = ({ artist }) => {
  return (
    <a
      href={artist?.url}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <img
        alt={artist?.name}
        src={artist?.image?.[2]?.['#text'] || '/default-artist.png'}
        className="w-full h-56 rounded-lg object-cover"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate text-center">
        {artist?.name}
      </p>
    </a>
  );
};

export default ArtistCard;
