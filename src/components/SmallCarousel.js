import SmallCard from "./SmallCard";
import {
  LiaAngleDoubleRightSolid,
  LiaAngleDoubleLeftSolid,
} from "react-icons/lia";
import { useState, useEffect } from "react";
import { useRef } from "react";
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
    console.log("debug");
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Functionality for the arrow
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

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
          <button className="prev pr-3" onClick={() => slide(-416)}>
            <LiaAngleDoubleLeftSolid />
          </button>

          <button
            disabled={scrolEnd}
            className=" next pl-3"
            onClick={() => slide(416)}
          >
            <LiaAngleDoubleRightSolid />
          </button>
        </div>
      </div>
      <div
        ref={scrl}
        className="scroll-content scroll-smooth snap-mandatory h-60 flex flex-col flex-wrap overflow-x-auto lg:mx-14 md:mx-9 mx-5"
      >
        {data?.data.map((song, i, data) => (
          <div
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

// function SmallCarousel() {
//   return (
//     <>
//       <Swiper
//         modules={[Grid, Pagination]}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//           },
//           768: {
//             slidesPerView: 3,
//           },
//           1024: {
//             slidesPerView: 4,
//           },
//         }}
//         grid={{
//           rows: 3,
//         }}
//         className="pySwiper"
//       >
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           <SmallCard />
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 2
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 3
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 4
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 5
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 6
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 7
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 8
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 9
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 10
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 11
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 12
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 13
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 14
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 15
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 16
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 17
//         </SwiperSlide>
//         <SwiperSlide className="py-2 text-center border-blue-300 border-2 shadow-lg">
//           Slide 18
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }
