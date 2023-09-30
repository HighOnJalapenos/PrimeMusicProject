import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
  data,
  i,
}) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300"
      onClick={(e) => {
        e.stopPropagation();
        handlePause();
      }}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300"
      onClick={(e) => {
        e.stopPropagation();
        handlePlay(song, data, i);
      }}
    />
  );

export default PlayPause;
