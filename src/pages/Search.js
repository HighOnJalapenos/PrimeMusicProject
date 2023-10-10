import { useLocation, useNavigate } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import { useEffect, useState } from "react";

const Search = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    recover();
  }, []);

  const recover = () => {
    let data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
  };

  return (
    <>
      {pathname === "/search" ? (
        <div className="max-w-[1600px] m-auto py-6">
          <div className="text-slate-50 justify-between lg:px-14 md:px-9 px-5">
            <div className="text-2xl font-bold">
              <h2 className="text-base">Search History</h2>
              <div className="flex gap-2 mt-5">
                {history.map((searchTerm, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => navigate(`/search/${searchTerm}`)}
                      className="cursor-pointer text-sm bg-[#ffffff26] hover:scale-105 hover:bg-[#ffffff4d] rounded-full w-28 text-center px-4 py-2 truncate"
                    >
                      {searchTerm}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-8 py-8">
              <h2 className="text-2xl font-bold">Search based on Moods</h2>
              <div className="flex flex-wrap gap-6 justify-between mt-7">
                <button
                  onClick={() => navigate("/search/happy")}
                  className="flex-1 md:basis-1 basis-1/3 h-20 bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer"
                >
                  Happy
                </button>
                <button
                  onClick={() => navigate("/search/sad")}
                  className="flex-1 h-20 md:basis-1 basis-1/3 bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer"
                >
                  Sad
                </button>
                <button
                  onClick={() => navigate("/search/romantic")}
                  className="flex-1 h-20 md:basis-1 basis-1/3 bg-gradient-to-r from-orange-400 to-rose-400 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer"
                >
                  Romantic
                </button>
                <button
                  onClick={() => navigate("/search/excited")}
                  className="flex-1 h-20 md:basis-1 basis-1/3 bg-gradient-to-tr from-violet-500 to-orange-300 flex items-center justify-center font-bold text-lg rounded-lg cursor-pointer"
                >
                  Excited
                </button>
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
