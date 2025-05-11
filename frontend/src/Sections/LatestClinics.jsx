import React, { useEffect, useRef } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { useGetLatestClinics } from "../apis/hospitals/scrapClinics";
import { Spin, Tag } from "antd";
import categories from "../Components/Clinic/Card/data.json";
import { Link } from "react-router-dom";
import LazyHeroVideo from "./LazyHeroVideo";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function LatestClinics() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // const cardContainerRef = useRef(null);
  // const cardRef = useRef(null);

  // useEffect(() => {
  //   console.log('width: ', cardRef.current?.offsetWidth, cardContainerRef.current?.offsetWidth);
  // }, [])

  const {
    data: clinicData2,
    isLoading,
    isError,
    error,
  } = useGetLatestClinics();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full max-h-screen">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(clinicData2)) {
    return <div>No clinic data available</div>;
  }

  const sortedData = [...clinicData2].sort(
    (a, b) => b.totalScore - a.totalScore
  );
  const data = sortedData.slice(0, 6);
  console.log("🚀 ~ LatestClinics ~ data:", data);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="flex flex-col mb-[2rem] sm:mb-[4rem] my-[1rem]">
      <div className="w-full px-[1.5rem] relative">
        {/* <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          swipeable={true}
          draggable={true}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
          className="shadow-xl p-[20px] rounded-xl flex flex-row gap-[1rem]"
        > */}
        <div className="swiper-button-prev" ref={prevRef}>
          <button className="absolute top-0 left-[-.3rem] sm:left-0 bg-clr1 opacity-80 text-white p-2 rounded-full text-4xl w-[2.3rem] xs:w-[2.8rem] border-[2px] border-clr1  hover:text-clr1 hover:bg-transparent">
            <FaArrowLeft />
          </button>
        </div>
        <div className="swiper-button-next" ref={nextRef}>
          <button className="absolute top-0 right-[-.3rem] sm:right-0 bg-clr1 opacity-80 text-white p-2 rounded-full text-4xl w-[2.3rem] xs:w-[2.8rem] border-[2px] border-clr1  hover:text-clr1 hover:bg-transparent">
            <FaArrowRight />
          </button>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
          className="px-[1.5rem]"
        >
          {categories?.map((item, index) => (
            <SwiperSlide className="w-[37vw] max-w-[30rem]">
              <Link
                to={`/clinics/sub/${item?.searchString}`}
                className="justify-center items-center p-[10px] rounded-xl shadow-lg flex flex-col x border-2 border-white"
              >
                <img
                  src={item.image}
                  loading="lazy"
                  alt={item.title}
                  className="w-full min-h-[250px] h-[250px] object-cover mb-4"
                />
                <div className="flex flex-col flex-grow px-[.7rem] gap-[1.7rem] w-full">
                  <h3 className="text-2xl font-bold text-clr1 truncate mb-[-1rem]">
                    {item.title || item.name}
                  </h3>
                  <span className="text-base font-medium line-clamp-3 h-[50px]">
                    {item.description}
                  </span>
                  {/* <div className="flex justify-start items-center w-full gap-2 gap-y-3 flex-wrap"> */}
                  <div className="flex justify-start items-center w-full gap-y-3 flex-wrap">
                    {item.items.slice(0, 3).map((subItem, i) => (
                      <>
                        {/* <div
                          key={i}
                          className="bg-blue-100 min-w-fit text-blue-600 px-3 text-sm rounded-full border border-blue-300 py-[8px] text-center flex justify-center items-center whitespace-nowrap"
                        > */}
                        <Tag color="blue">{subItem}</Tag>
                        {/* </div> */}
                        {/* <div
                        key={i}
                        className="bg-blue-100 text-blue-600 px-2 text-sm rounded-full border border-blue-300 py-[10px] text-center flex justify-center items-center"
                        >
                        {subItem}
                        </div> */}
                      </>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <button
                      type="button"
                      className="w-full bg-clr1 hover:bg-transparent text-lg py-2 text-white font-semibold rounded-xl hover:text-clr1 border-2 border-clr1 transition-all duration-300 ease-in-out"
                    >
                      View Clinics
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </Carousel> */}
      </div>
    </div>
  );
}

export default LatestClinics;
