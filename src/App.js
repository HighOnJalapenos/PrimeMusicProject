import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
import Album from "./pages/Album";

function App() {
  const { activeSong } = useSelector((state) => state.player);
  return (
    <div className="scroll-smooth relative no-scrollbar">
      <div className="h-[100vh] overflow-y-scroll hide-scrollbar">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:id" element={<Album />} />
        </Routes>
      </div>
      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#000000] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default App;
