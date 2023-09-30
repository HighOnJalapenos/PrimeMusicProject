import PlayPause from "./PlayPause";
import PlayingGif from "../assets/EQ_accent.gif";

export default function PlayPauseAlbumSong({
  song,
  i,
  isPlaying,
  activeSong,
  data,
  handlePlayClick,
  handlePauseClick,
}) {
  return (
    <div className="relative h-14 w-14 group cursor-pointer">
      <small
        className={`text-slate-400 text-xs h-14 w-14 group-hover:invisible inline-flex items-center justify-center ${
          activeSong?.title === song?.title ? "invisible" : "visible"
        }`}
      >
        {i + 1}.
      </small>
      <div
        className={`absolute inset-0 items-center justify-center group-hover:flex hidden`}
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
      <div
        className={`absolute inset-0 overflow-hidden group-hover:hidden rounded-full items-center justify-center ${
          activeSong?.title === song?.title && isPlaying ? "flex" : "hidden"
        }`}
      >
        <img className="h-7 w-7 object-cover" src={PlayingGif} alt="" />
      </div>
    </div>
  );
}
