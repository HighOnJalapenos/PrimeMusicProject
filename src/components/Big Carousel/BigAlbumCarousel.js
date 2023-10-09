import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import AlbumCard from "./AlbumCard";

const BigAlbumCarousel = ({ data }) => {
  const topAlbums = data?.data;

  return (
    <section className="max-w-[1600px] m-auto py-6 mb-5">
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        style={{ paddingLeft: "56px", paddingRight: "56px" }}
      >
        {topAlbums?.map((album, i) => (
          <SwiperSlide
            key={album?._id}
            style={{
              width: "224px",
              height: "100%",
              marginRight: "0",
              paddingRight: "32px",
            }}
            className="animate-slideright"
          >
            <AlbumCard album={album} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BigAlbumCarousel;
