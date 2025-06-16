import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader } from '../components';
import { useGetArtistDetailsQuery, useGetArtistTopAlbumsQuery } from '../redux/services/lastFmApi';

const ArtistDetails = () => {
  const { id: artistName } = useParams(); // /artists/:id
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: artistData, isFetching, error } = useGetArtistDetailsQuery(artistName);
  const { data: albumData, isFetching: isFetchingAlbums } = useGetArtistTopAlbumsQuery(artistName);

  const albums = albumData?.topalbums?.album || [];

  if (isFetching || isFetchingAlbums) return <Loader title="Loading artist details..." />;
  if (error || !artistData?.artist) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistName}
        artistData={{
          attributes: {
            name: artistData.artist.name,
            genreNames: [artistData.artist.tags?.tag?.[0]?.name || 'Unknown'],
            artwork: {
              url: artistData.artist.image?.[3]?.['#text'] || '/default-artist.png',
            },
          },
        }}
      />

      {/* Biography */}
      <div className="text-white mt-6 px-4">
        <h2 className="text-xl font-bold mb-2">Biography</h2>
        <p className="text-gray-300 text-sm">
          {artistData.artist.bio?.summary?.replace(/<[^>]+>/g, '')}
        </p>
      </div>

      {/* Albums Section */}
      {albums.length > 0 && (
        <div className="text-white mt-8 px-4">
          <h2 className="text-xl font-bold mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.slice(0, 12).map((album, index) => (
              <div
                key={index}
                className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition duration-200"
              >
                <img
                  src={album.image?.[2]?.['#text'] || '/default-cover.png'}
                  alt={album.name}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="mt-2 font-semibold truncate">{album.name}</p>
                <p className="text-sm text-gray-300">{album.artist?.name || artistName}</p>
                <a
                  href={`/albums/${encodeURIComponent(album.name)}`}
                  className="text-blue-400 text-sm mt-1 inline-block hover:underline"
                >
                  View Album
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDetails;
