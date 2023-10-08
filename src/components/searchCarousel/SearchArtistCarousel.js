import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import SearchArtistCard from "../searchCarousel/searchArtistCard";

const SearchArtistCarousel = ({ query, searchQuery }) => {
  const { data } = query(searchQuery);
  const topPlays = data?.data;
  console.log(topPlays);

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
        {topPlays?.map((artist, i) => (
          <SwiperSlide
            key={artist?._id}
            style={{
              width: "224px",
              height: "100%",
              marginRight: "0",
              paddingRight: "32px",
            }}
            className="animate-slideright"
          >
            <SearchArtistCard artist={artist} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SearchArtistCarousel;
