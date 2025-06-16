import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, nextSong, prevSong } from '../redux/features/playerSlice';
import { FaPauseCircle, FaPlayCircle, FaForward, FaBackward } from 'react-icons/fa';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, currentSongs, currentIndex } = useSelector((state) => state.player);
  const audioRef = useRef(null);

  // Use a dummy audio URL or custom fallback
  const audioSrc = activeSong?.hub?.actions?.[1]?.uri || activeSong?.preview_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(nextSong((currentIndex + 1) % currentSongs.length));
  };

  const handlePrevSong = () => {
    dispatch(prevSong((currentIndex - 1 + currentSongs.length) % currentSongs.length));
  };

  return (
    <div className="flex items-center justify-between w-full px-4">
      <div className="text-white flex-1">
        <h3 className="font-bold">{activeSong?.title || activeSong?.name || 'No song selected'}</h3>
        <p className="text-sm">{activeSong?.subtitle || activeSong?.artist?.name || 'Unknown Artist'}</p>
      </div>

      <div className="flex items-center gap-4">
        <FaBackward onClick={handlePrevSong} size={24} className="text-white cursor-pointer" />
        {isPlaying ? (
          <FaPauseCircle onClick={handlePlayPause} size={40} className="text-white cursor-pointer" />
        ) : (
          <FaPlayCircle onClick={handlePlayPause} size={40} className="text-white cursor-pointer" />
        )}
        <FaForward onClick={handleNextSong} size={24} className="text-white cursor-pointer" />
      </div>

      <audio ref={audioRef} src={audioSrc} autoPlay />
    </div>
  );
};

export default MusicPlayer;


