import { configureStore } from '@reduxjs/toolkit';

import { lastFmApi } from './services/lastFmApi';  // ✅ use Last.fm now
import playerReducer from './features/playerSlice';
import playlistReducer from './features/playlistSlice';

export const store = configureStore({
  reducer: {
    [lastFmApi.reducerPath]: lastFmApi.reducer,   // ✅ hook up Last.fm API reducer
    player: playerReducer,
    playlist: playlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lastFmApi.middleware),
});
