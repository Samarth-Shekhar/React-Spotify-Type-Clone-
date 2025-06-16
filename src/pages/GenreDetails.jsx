import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/lastFmApi';
import { Error, Loader, SongCard } from '../components';

const GenreDetails = () => {
  const { genre } = useParams();
  const { data, isFetching, error } = useGetSongsBySearchQuery(genre);

  if (isFetching) return <Loader title={`Loading ${genre} songs...`} />;
  if (error || !data?.results?.trackmatches?.track?.length) return <Error />;

  const songs = data.results.trackmatches.track;

  return (
    <div className="px-4 text-white">
      <h2 className="text-3xl font-bold mb-6 capitalize">{genre} Songs</h2>

      <div className="flex flex-wrap gap-4">
        {songs.map((song, i) => (
          <SongCard
            key={`${song.name}-${i}`}
            song={{
              title: song.name,
              subtitle: song.artist,
              url: song.url,
              image: [{}, {}, {}, { '#text': song.image?.[2]?.['#text'] }],
            }}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default GenreDetails;
