import { useLocation } from "react-router-dom";
import SearchResults from "../components/SearchResults";

const Search = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/search" ? (
        <div className="max-w-[1600px] m-auto py-6">
          <div className="text-slate-50 justify-between lg:px-14 md:px-9 px-5">
            <div className="text-2xl font-bold">
              <h2 className="text-base">Search History</h2>
              <div>Details</div>
            </div>
            <div className="mt-8 py-8">
              <h2 className="text-2xl font-bold">Search based on Moods</h2>
              <div className="flex gap-6 justify-between mt-7">
                <div className="flex-1 h-20 bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer">
                  Happy
                </div>
                <div className="flex-1 h-20 bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer">
                  Sad
                </div>
                <div className="flex-1 h-20 bg-gradient-to-r from-orange-400 to-rose-400 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer">
                  Romantic
                </div>
                <div className="flex-1 h-20 bg-gradient-to-tr from-violet-500 to-orange-300 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer">
                  Excited
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SearchResults />
      )}
    </>
  );
};

export default Search;
