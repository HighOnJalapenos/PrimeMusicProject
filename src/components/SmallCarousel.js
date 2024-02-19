import SmallCard from "./SmallCard";
import {
  LiaAngleDoubleRightSolid,
  LiaAngleDoubleLeftSolid,
} from "react-icons/lia";
import { useState, useRef } from "react";
import "../styles/SmallCarousel.css";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

function SmallCarousel({ mood, data }) {
  // Getting the song data
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, data, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  let scrl = useRef(null);
  let size = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  let offset = size.current?.offsetWidth + 32;

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft - 100) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  return (
    <div className="max-w-[1600px] m-auto py-6">
      <div className="text-slate-50 flex justify-between lg:px-14 md:px-9 px-5">
        <div className="md:text-xl text-base font-bold">{mood} Songs</div>
        <div className="text-2xl">
          <button className="prev pr-3" onClick={() => slide(-offset)}>
            <LiaAngleDoubleLeftSolid />
          </button>

          <button
            disabled={scrolEnd}
            className=" next pl-3"
            onClick={() => slide(offset)}
          >
            <LiaAngleDoubleRightSolid />
          </button>
        </div>
      </div>
      <div
        ref={scrl}
        className="scroll-content scroll-smooth snap-mandatory h-60 flex flex-col flex-wrap overflow-x-auto lg:px-14 md:px-9 px-5"
      >
        {data?.data.map((song, i, data) => (
          <div
            ref={size}
            className="h-20 py-2 mr-8 snap-start flex items-center md:w-96 w-full"
            key={song._id}
            onClick={() => handlePlayClick(song, data, i)}
          >
            <SmallCard
              key={song._id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmallCarousel;
