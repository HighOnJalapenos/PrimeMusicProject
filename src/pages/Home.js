import SmallCarousel from "../components/SmallCarousel";
import BigSongCarousel from "../components/Big Carousel/BigSongCarousel";
import BigArtistCarousel from "../components/Big Carousel/BigArtistCarousel";
import BigAlbumCarousel from "../components/Big Carousel/BigAlbumCarousel";
import MusicPreference from "./MusicPreference";

import {
  useGetTopChartsQuery,
  useGetExcitedSongsQuery,
  useGetHappySongsQuery,
  useGetRomanticSongsQuery,
  useGetTopArtistQuery,
  useGetTopAlbumsQuery,
} from "../redux/services/shazamCore";
import { Route, Routes } from "react-router-dom";
import GetHelp from "./GetHelp";

function Home() {
  const { data: trendingSong } = useGetTopChartsQuery();
  const { data: excitedSong } = useGetExcitedSongsQuery();
  const { data: happySong } = useGetHappySongsQuery();
  const { data: romanticSong } = useGetRomanticSongsQuery();
  const { data: trendingArtist } = useGetTopArtistQuery();
  const { data: trendingAlbum } = useGetTopAlbumsQuery();

  return (
    <>
      {/* Trending Songs */}
      <SmallCarousel data={trendingSong} mood={"Trending"} />

      {/* Trending Artists */}
      <BigArtistCarousel data={trendingArtist} />

      {/* Songs Based on Mood excited, romantic, happy */}
      <SmallCarousel data={excitedSong} mood={"Excited"} />

      <BigAlbumCarousel data={trendingAlbum} />

      <SmallCarousel data={romanticSong} mood={"Romantic"} />
      <SmallCarousel data={happySong} mood={"Happy"} />

      <BigSongCarousel data={trendingSong} />
      <Routes>
        <Route path="/musicPreference" element={<MusicPreference />} />
        <Route path="/getHelp" element={<GetHelp />} />
      </Routes>
    </>
  );
}

export default Home;
