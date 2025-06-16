import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeSongFromPlaylist } from '../redux/features/playlistSlice';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const PlaylistDetails = () => {
  const { id: playlistId } = useParams();
  const dispatch = useDispatch();

  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const playlist = useSelector((state) =>
    state.playlist.playlists.find((p) => p.id === playlistId)
  );

  if (!playlist) return <div className="text-white p-4">Playlist not found.</div>;

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data: playlist.songs, i }));
    dispatch(playPause(true));
  };

  const handleRemove = (songUrl) => {
    dispatch(removeSongFromPlaylist({ playlistId, songUrl }));
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-3xl font-bold mb-6">Playlist: {playlist.name}</h2>

      {playlist.songs.length === 0 ? (
        <p className="text-gray-400">No songs in this playlist.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {playlist.songs.map((song, i) => (
            <div
              key={song.url}
              className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] bg-white/5 p-4 rounded shadow"
            >
              <img
  src={
    song.images?.coverart ||
    song.image?.[3]?.['#text'] ||
    'https://via.placeholder.com/300x300?text=No+Image'
  }
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
  }}
  alt={song.title || 'Song Cover'}
  className="w-full h-40 object-cover rounded mb-2"
/>
              <h3 className="text-lg font-semibold">{song.title || song.name}</h3>
              <p className="text-sm text-gray-300">
                {song.subtitle || song.artist?.name || 'Unknown Artist'}
              </p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handlePlay(song, i)}
                  className="bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded text-sm"
                >
                  Play
                </button>
                <button
                  onClick={() => handleRemove(song.url)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetails;
