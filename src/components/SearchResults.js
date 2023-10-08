import { useDispatch, useSelector } from "react-redux";
import {
  useGetSearchAlbumQuery,
  useGetSearchSongsQuery,
  useGetSearchArtistQuery,
  useGetArtistDetailsQuery,
} from "../redux/services/shazamCore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchArtistCarousel from "./searchCarousel/SearchArtistCarousel";
import SmallCarousel from "./SmallCarousel";

const SearchResults = () => {
  const { searchQuery } = useParams();

  const { data } = useGetSearchSongsQuery(searchQuery);
  console.log(data, "songData");

  return (
    <div className="max-w-[1600px] m-auto py-6">
      <div className="text-slate-50 flex flex-col justify-between lg:px-14 md:px-9 px-5 mt-14">
        <div className="text-2xl font-bold">Search results for "XYZ"</div>
        <SearchArtistCarousel
          query={useGetSearchArtistQuery}
          searchQuery={searchQuery}
        />
        <SmallCarousel mood={searchQuery} data={data} />
      </div>
    </div>
  );
};

export default SearchResults;
