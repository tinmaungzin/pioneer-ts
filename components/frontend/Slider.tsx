import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import { Pagination, Autoplay, EffectCoverflow, Navigation } from "swiper";
import { Event } from "@/utils/types";

type SliderProps = {
  events: Event[] | undefined;
  setActiveImageIndex: (value: number | undefined) => void;
};

function Slider({ events, setActiveImageIndex }: SliderProps) {
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;
  return (
    <>
      <div className="flex justify-center px-4 md:px-32 py-6">
        <Swiper
          style={{ paddingBottom: "50px" }}
          effect={"coverflow"}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          onSlideChange={(swiper) => {
            setActiveImageIndex(swiper.realIndex);
          }}
          loop={true}
        >
          {events?.map((event, index) => {
            const url = `${originUrl}/download_image/${event.photo}`;
            return (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <Image
                    className="h-full "
                    src={url}
                    alt="banner"
                    width={500}
                    height={300}
                    priority
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default Slider;