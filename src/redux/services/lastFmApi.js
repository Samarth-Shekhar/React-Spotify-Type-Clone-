import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

export const lastFmApi = createApi({
  reducerPath: 'lastFmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ws.audioscrobbler.com/2.0/',
  }),
  endpoints: (builder) => ({
    getTopTracks: builder.query({
      query: () => `?method=chart.gettoptracks&api_key=${API_KEY}&format=json`,
    }),
    getTopArtists: builder.query({
      query: () => `?method=chart.gettopartists&api_key=${API_KEY}&format=json`,
    }),
    getArtistTopAlbums: builder.query({
  query: (artistName) =>
    `?method=artist.gettopalbums&artist=${artistName}&api_key=${API_KEY}&format=json`,
}),
    getArtistDetails: builder.query({
      query: (artistName) => `?method=artist.getinfo&artist=${artistName}&api_key=${API_KEY}&format=json`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `?method=track.search&track=${searchTerm}&api_key=${API_KEY}&format=json`,
    }),
    getSongsByGenre: builder.query({
  query: (genre) =>
    `?method=tag.gettoptracks&tag=${genre}&api_key=${API_KEY}&format=json`,
}),
    getTrackInfo: builder.query({
      query: ({ artist, track }) =>
        `?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${track}&format=json`,
    }),
  }),
});

export const {
  useGetTopTracksQuery,
  useGetTopArtistsQuery,
  useGetArtistDetailsQuery,
  useGetTrackSearchQuery,
  useGetSongsBySearchQuery,
  useGetTrackInfoQuery, // ✅ NOW VALID
  useGetArtistTopAlbumsQuery,
  useGetSongsByGenreQuery,
} = lastFmApi;

