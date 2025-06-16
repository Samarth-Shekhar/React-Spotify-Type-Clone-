import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: [], // Each: { id, name, songs: [] }
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      const newPlaylist = {
        id: Date.now().toString(),
        name: action.payload,
        songs: [],
      };
      state.playlists.push(newPlaylist);
    },
    addSongToPlaylist: (state, action) => {
      const { playlistId, song } = action.payload;
      const playlist = state.playlists.find((p) => p.id === playlistId);
      if (playlist && !playlist.songs.find((s) => s.url === song.url)) {
        playlist.songs.push(song);
      }
    },
    removeSongFromPlaylist: (state, action) => {
      const { playlistId, songUrl } = action.payload;
      const playlist = state.playlists.find((p) => p.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter((s) => s.url !== songUrl);
      }
    },
  },
});

export const {
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
