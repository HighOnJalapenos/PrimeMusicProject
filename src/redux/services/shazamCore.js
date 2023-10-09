import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://academics.newtonschool.co/api/v1",
    prepareHeaders: (headers) => {
      headers.set("projectId", "c4oeb3ucmlyq");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/music/song?filter={"featured":"Trending songs"}',
    }),
    getHappySongs: builder.query({
      query: () => '/music/song?filter={"mood":"happy"}',
    }),
    getExcitedSongs: builder.query({
      query: () => '/music/song?filter={"mood":"excited"}',
    }),
    getRomanticSongs: builder.query({
      query: () => '/music/song?filter={"mood":"romantic"}',
    }),
    getArtistDetails: builder.query({
      query: (artistid) => `/music/artist/${artistid}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/music/song/${songid}`,
    }),
    getTopAlbums: builder.query({
      query: () => "/music/album",
    }),
    getTopArtist: builder.query({
      query: () => "/music/artist",
    }),
    getAlbumDetails: builder.query({
      query: (albumID) => `/music/album/${albumID}`,
    }),
    getSearchSongs: builder.query({
      query: (searchTerm) => `/music/song?search={"title":"${searchTerm}"}`,
    }),
    getSearchAlbum: builder.query({
      query: (searchTerm) => `/music/album?search={"title":"${searchTerm}"}`,
    }),
    getSearchArtist: builder.query({
      query: (searchTerm) => `/music/artist?search={"name":"${searchTerm}"}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetExcitedSongsQuery,
  useGetHappySongsQuery,
  useGetRomanticSongsQuery,
  useGetTopAlbumsQuery,
  useGetTopArtistQuery,
  useGetAlbumDetailsQuery,
  useGetSearchAlbumQuery,
  useGetSearchArtistQuery,
  useGetSearchSongsQuery,
} = shazamCoreApi;
