import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { useState } from "react";
import Portal from "./Portal/Portal";
import ModalContent from "./Portal/ModalContent";

export default function SmallCard({
  song,
  i,
  isPlaying,
  activeSong,
  data,
  handlePauseClick,
  handlePlayClick,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleFav = () => {
    document.documentElement.style.overflow = "hidden";
    setShowModal(true);
  };

  const onModalClose = () => {
    document.documentElement.style.overflow = "";
    setShowModal(false);
  };

  return (
    <article className="text-slate-200 items-center w-full inline-flex group">
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
            data={data}
            i={i}
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
      <i
        onClick={(e) => {
          e.stopPropagation();
          handleFav();
        }}
        className="group-hover:block hidden ml-auto hover:cursor-pointer"
      >
        <FavoriteBorderRoundedIcon />
      </i>
      {showModal && (
        <Portal onClose={onModalClose}>
          <ModalContent onClose={onModalClose} />
        </Portal>
      )}
    </article>
  );
}
