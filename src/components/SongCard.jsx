import React from 'react';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { addSongToPlaylist } from '../redux/features/playlistSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i, selectedPlaylistId }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    if (!song?.hub?.actions?.[1]?.uri && !song?.preview_url) {
      song.hub = {
        actions: [{}, { uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }],
      };
    }

    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleAddToPlaylist = () => {
    if (!selectedPlaylistId) {
      alert("Please select a playlist first.");
      return;
    }
    dispatch(addSongToPlaylist({ playlistId: selectedPlaylistId, song }));
    alert("Song added to playlist!");
  };

 const coverArt = song?.images?.coverart
  || song?.image?.[2]?.['#text']
  || song?.image?.[3]?.['#text']
  || 'https://via.placeholder.com/150?text=No+Cover';

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className="absolute inset-0 justify-center items-center bg-black bg-opacity-50 flex group-hover:flex">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
  alt="song_img"
  src={coverArt}
  onError={(e) => { e.target.src = '/default-cover.png'; }}
  className="w-full h-full rounded-lg"
/>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <a href={song.url} target="_blank" rel="noreferrer">
            {song.title || song.name}
          </a>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <a href={song.artist?.url || '#'} target="_blank" rel="noreferrer">
            {song.subtitle || song.artist?.name || 'Unknown Artist'}
          </a>
        </p>

        {/* Add to Playlist Button */}
        {selectedPlaylistId && (
          <button
            onClick={handleAddToPlaylist}
            className="mt-2 px-3 py-1 text-xs bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Add to Playlist
          </button>
        )}
      </div>
    </div>
  );
};

export default SongCard;

