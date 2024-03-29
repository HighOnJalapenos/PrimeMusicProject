import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Login from "./components/UserInfo/Login";
import SignUp from "./components/UserInfo/SignUp";
import Likes from "./pages/Likes";
import Search from "./pages/Search";
import SearchResults from "./components/SearchResults";
import { useEffect } from "react";
import { isUserLoggedIn } from "./redux/features/userSlice";
import Podcast from "./pages/Podcast";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  const { activeSong } = useSelector((state) => state.player);
  return (
    <div className="scroll-smooth relative no-scrollbar">
      <ScrollToTop />
      <div className="min-h-[100vh] hide-scrollbar pt-[72px] pb-28">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<Home />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/artists/:id" element={<Artist />} />
          <Route path="/Library" element={<Likes />} />
          <Route path="/search" element={<Search />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/search/:searchQuery" element={<SearchResults />} />
        </Routes>
      </div>
      {activeSong?.title && (
        <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#000000] backdrop-blur-lg rounded-t-3xl z-50">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default App;
