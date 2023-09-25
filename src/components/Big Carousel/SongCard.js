import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "../PlayPause";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <>
      <div className="relative w-full group cursor-pointer">
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
        <img className="rounded" alt="song_img" src={song?.thumbnail} />
      </div>

      <div className="flex flex-col mt-2">
        <p className="text-slate-100 text-base truncate">
          <Link to={`/songs/${song?._id}`}>{song?.title}</Link>
        </p>
        <p className="text-slate-400 text-sm truncate">
          <Link to={`/artists/${song?.artist[0]._id}`}>
            {song?.artist[0]?.name}
          </Link>
        </p>
      </div>
    </>
  );
};

export default SongCard;
