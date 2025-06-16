import React from 'react';
import { useParams } from 'react-router-dom';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/lastFmApi';

const AlbumDetails = () => {
  const { id: albumName } = useParams(); // /albums/:id

  const { data, isFetching, error } = useGetSongsBySearchQuery(albumName);

  if (isFetching) return <Loader title={`Searching "${albumName}" album...`} />;
  if (error || !data?.results?.trackmatches?.track?.length) return <Error />;

  const songs = data.results.trackmatches.track;

  return (
    <div className="flex flex-col px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">
          Album: <span className="text-cyan-400">{decodeURIComponent(albumName)}</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Showing results that match the album name.
        </p>
      </div>

      {/* Song list */}
      <div className="flex flex-wrap gap-6">
        {songs.map((song, i) => (
          <SongCard
            key={`${song.name}-${song.artist}-${i}`}
            song={{
              title: song.name,
              subtitle: song.artist,
              url: song.url,
              image: [{}, {}, {}, {
                '#text': song.image?.[2]?.['#text'] || '/default-cover.png',
              }],
            }}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetails;
