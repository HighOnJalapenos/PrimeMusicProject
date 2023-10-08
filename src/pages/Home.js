import SmallCarousel from "../components/SmallCarousel";
import BigSongCarousel from "../components/Big Carousel/BigSongCarousel";
import BigArtistCarousel from "../components/Big Carousel/BigArtistCarousel";
import BigAlbumCarousel from "../components/Big Carousel/BigAlbumCarousel";
import Loader from "../components/Loader";

import {
  useGetTopChartsQuery,
  useGetExcitedSongsQuery,
  useGetHappySongsQuery,
  useGetRomanticSongsQuery,
} from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: trendingSong,
    isFetchingTrending,
    errorTrending,
  } = useGetTopChartsQuery();
  const {
    data: excitedSong,
    isFetchingExcited,
    errorExcited,
  } = useGetExcitedSongsQuery();
  const {
    data: happySong,
    isFetchingHappy,
    errorHappy,
  } = useGetHappySongsQuery();
  const {
    data: romanticSong,
    isFetchingRomantic,
    errorRomantic,
  } = useGetRomanticSongsQuery();

  return (
    <>
      {/* Trending Songs */}
      {isFetchingTrending ? (
        <Loader />
      ) : (
        <SmallCarousel data={trendingSong} mood={"Trending"} />
      )}

      {/* Trending Artists */}
      <BigArtistCarousel query={useGetTopChartsQuery} />

      {/* Songs Based on Mood excited, romantic, happy */}
      {isFetchingExcited ? (
        <Loader />
      ) : (
        <SmallCarousel data={excitedSong} mood={"Excited"} />
      )}

      {isFetchingExcited ? <Loader /> : <BigAlbumCarousel />}

      {isFetchingRomantic ? (
        <Loader />
      ) : (
        <SmallCarousel data={romanticSong} mood={"Romantic"} />
      )}
      {isFetchingHappy ? (
        <Loader />
      ) : (
        <SmallCarousel data={happySong} mood={"Happy"} />
      )}

      {isFetchingTrending ? <Loader /> : <BigSongCarousel />}
    </>
  );
}

export default Home;
