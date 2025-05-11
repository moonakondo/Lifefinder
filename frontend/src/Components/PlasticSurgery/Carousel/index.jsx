import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 4,
    slidesToSlide: 1,
  },
  mainMobole: {
    breakpoint: { max: 1300, min: 900 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 540 },
    items: 2,
    slidesToSlide: 1,
  },
  secondMobile: {
    breakpoint: { max: 540, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const sliderImageUrl = [
  { url: "/assests/plastic (1).jpg" },
  { url: "/assests/plastic (2).jpg" },
  { url: "/assests/plastic (3).jpg" },
  { url: "/assests/plastic (4).jpg" },
  { url: "/assests/plastic (5).jpg" },
  { url: "/assests/plastic (6).jpg" },
  { url: "/assests/plastic (7).jpg" },
  { url: "/assests/plastic (8).jpg" },
  { url: "/assests/plastic (9).jpg" },
  { url: "/assests/plastic (10).jpg" },
  { url: "/assests/plastic (11).jpg" },
  { url: "/assests/plastic (12).jpg" },
  { url: "/assests/plastic (13).jpg" },
  { url: "/assests/plastic (14).jpg" },
  { url: "/assests/plastic/main-1.jpeg" },
  { url: "/assests/plastic/main-2.jpeg" },
  { url: "/assests/plastic/main-3.jpg" },
];

const PlasticSurgeryCarousel = () => {
  return (
    <section className="mx-auto px-5 md:px-[5.5vh]">
      <p className="text-[7vw] md:text-[2.6vw] font-bold text-clr2 mb-[40px] 2lg:mt-[10vh] text-center items-center  plastic-heading">
        Top Plastic Surgery Clinics and Specialists
      </p>
      <Carousel
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
        className="shadow-xl p-[20p] rounded-xl"
      >
        {sliderImageUrl.map((imageUrl, index) => (
          <div className="flex justify-center items-center p-4" key={index}>
            <img
              src={imageUrl.url}
              loading="lazy"
              alt={`slide ${index + 1}`}
              className="md:w-[380px] md:h-[380px] h-[380px] !w-[380px] !rounded-2xl object-cover"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default PlasticSurgeryCarousel;
