import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

export default function SmallCard({ song, i, isPlaying, activeSong, data }) {
  const [favVisible, setFavVisible] = useState(false);
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleHover = () => {
    setFavVisible(!favVisible);
  };

  return (
    <article
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="text-slate-200 items-center w-full inline-flex"
    >
      <div className="relative h-14 w-14 group cursor-pointer flex-shrink-0">
        <div
          className={`absolute inset-0 items-center justify-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song?.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img
          className="h-14 w-14 object-cover rounded-md hover:cursor-pointer"
          src={song?.thumbnail}
          alt="song-thumbnail"
        />
      </div>
      <div className="px-3 overflow-ellipsis truncate hover:cursor-pointer">
        <p className="md:text-base text-sm text-slate-200 md:truncate whitespace-nowrap">
          {song?.title}
        </p>
        <p className="md:text-sm text-sm text-slate-400">
          <Link to={`/artists/${song?.artist[0]._id}`}>
            {song?.artist[0]?.name}
          </Link>
        </p>
      </div>
      {favVisible && (
        <i className="ml-auto hover:cursor-pointer">
          <FavoriteBorderRoundedIcon />
        </i>
      )}
    </article>
  );
}
