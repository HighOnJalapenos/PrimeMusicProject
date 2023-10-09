import SmallCarousel from "../components/SmallCarousel";
import BigSongCarousel from "../components/Big Carousel/BigSongCarousel";
import BigArtistCarousel from "../components/Big Carousel/BigArtistCarousel";
import BigAlbumCarousel from "../components/Big Carousel/BigAlbumCarousel";

import {
  useGetTopChartsQuery,
  useGetExcitedSongsQuery,
  useGetHappySongsQuery,
  useGetRomanticSongsQuery,
  useGetTopArtistQuery,
  useGetTopAlbumsQuery,
} from "../redux/services/shazamCore";

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
    </>
  );
}

export default Home;
