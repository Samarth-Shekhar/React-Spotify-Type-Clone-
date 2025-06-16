import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetTrackInfoQuery,
  useGetTopTracksQuery,
} from '../redux/services/lastFmApi';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { artist, songid: track } = useParams(); // Make sure routes use `/songs/:artist/:songid`
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails, error } = useGetTrackInfoQuery({ artist, track });
  const { data: relatedData, isFetching: isFetchingRelated } = useGetTopTracksQuery();

  if (isFetchingSongDetails || isFetchingRelated) return <Loader title="Loading song details..." />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedData.tracks.track, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artist} songData={songData?.track} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Summary:</h2>

        <div className="mt-5">
          {songData?.track?.wiki?.summary ? (
            <p className="text-gray-400 text-base">{songData.track.wiki.summary}</p>
          ) : (
            <p className="text-gray-400 text-base">Sorry, no summary or lyrics found!</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedData?.tracks?.track}
        artistId={artist}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
