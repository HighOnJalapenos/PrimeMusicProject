import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useGetTopChartsQuery } from "../../redux/services/shazamCore";
import { useSelector, useDispatch } from "react-redux";

import "swiper/css";
import "swiper/css/free-mode";
import SongCard from "./SongCard";

const BigSongCarousel = ({ children }) => {
  const dispatch = useDispatch();
  const { data } = useGetTopChartsQuery();
  const topPlays = data?.data;
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return (
    <section className="max-w-[1600px] m-auto py-6">
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        style={{ paddingLeft: "56px", paddingRight: "56px" }}
      >
        {topPlays?.map((song, i) => (
          <SwiperSlide
            key={song?._id}
            style={{
              width: "224px",
              height: "100%",
              marginRight: "0",
              paddingRight: "32px",
            }}
            className="animate-slideright"
          >
            <SongCard
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BigSongCarousel;
