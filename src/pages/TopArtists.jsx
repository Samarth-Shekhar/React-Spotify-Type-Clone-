import React from 'react';
import { ArtistCard, Error, Loader } from '../components';
import { useGetTopArtistsQuery } from '../redux/services/lastFmApi';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopArtistsQuery();

  if (isFetching) return <Loader title="Loading Top Artists..." />;
  if (error) return <Error />;

  const artists = data?.artists?.artist || [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists.map((artist, index) => (
          <ArtistCard
            key={index}
            track={{
              title: artist.name,
              images: {
                coverart: artist?.image?.[2]?.['#text'] || '',
              },
              artists: [{ adamid: artist.name }],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
