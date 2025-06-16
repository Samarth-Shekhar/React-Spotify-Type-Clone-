import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopTracksQuery } from '../redux/services/lastFmApi'; // ✅ updated import

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopTracksQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error) return <Error />;

  // Access the track list inside data
  const tracks = data?.tracks?.track || [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks.map((track, i) => (
          <SongCard
            key={`${track.name}-${track.artist.name}`}
            song={{
              title: track.name,
              subtitle: track.artist.name,
              images: {
                coverart: track?.image?.[2]?.['#text'] || '', // medium size
              },
              url: track.url,
            }}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
