import {
  useGetSearchAlbumQuery,
  useGetSearchSongsQuery,
  useGetSearchArtistQuery,
} from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";
import SmallCarousel from "./SmallCarousel";
import BigAlbumCarousel from "./Big Carousel/BigAlbumCarousel";
import BigArtistCarousel from "./Big Carousel/BigArtistCarousel";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const searchTerm = searchQuery.toUpperCase();

  const { data: songResult, error: songError } =
    useGetSearchSongsQuery(searchQuery);
  const { data: artistResult } = useGetSearchArtistQuery(searchQuery);
  const { data: albumResult, error: albumError } =
    useGetSearchAlbumQuery(searchQuery);

  console.log(artistResult?.data);

  return (
    <div className="max-w-[1600px] m-auto py-6">
      <div className="text-slate-50 flex flex-col justify-between lg:px-14 md:px-9 px-5 mt-5">
        <div className="text-2xl font-bold">
          Search results for {searchTerm}
        </div>
      </div>
      {songError ? (
        <div className="text-slate-300 text-base lg:px-14 md:px-9 px-5 mt-8">
          {songError.data.message}
        </div>
      ) : (
        <SmallCarousel mood={searchTerm} data={songResult} />
      )}
      <h2 className="text-white font-bold text-xl lg:px-14 md:px-9 px-5 mt-8">
        Artists
      </h2>
      {artistResult?.data.length === 0 ? (
        <div className="text-slate-300 text-base lg:px-14 md:px-9 px-5 mt-8">
          No Artists found
        </div>
      ) : (
        <BigArtistCarousel data={artistResult} />
      )}
      <h2 className="text-white font-bold text-xl lg:px-14 md:px-9 px-5 mt-8">
        Albums
      </h2>
      {albumError ? (
        <div className="text-slate-300 text-base lg:px-14 md:px-9 px-5 mt-8">
          {albumError.data.message}
        </div>
      ) : (
        <BigAlbumCarousel data={albumResult} />
      )}
    </div>
  );
};

export default SearchResults;
