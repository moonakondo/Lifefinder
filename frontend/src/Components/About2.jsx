import React, { useEffect } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div
      id="aboutus"
      className="flex flex-col justify-center w-[100%] items-center pt-[20px] pb-[20px]"
    >
      <p className="text-[4.5vw] 2lg:text-[2vw] 2xl:text-[3vw] font-semibold text-clr3 uppercase">
        What Our Users Say About Us
      </p>
      <div className="flex flex-col md:flex-row  items-center  justify-center md:justify-around w-full 2lg:w-[85%]  gap-x-[30px] mb-[40px] ">
        <img
          data-aos="fade-right"
          src="/about-us2.png"
          loading="lazy"
          alt="Hospital Image"
          className="w-[32vh] 2lg:w-[33vw] md:w-[36vw] h-[36vh] ipp:h-[32vh] 2lg:h-[30vw] md:h-[32vh] ml-[2vw] 2lg:mt-[5vh] ipp:mt-[1vh] md:mt-[1vh] rounded-full shadow-2xl"
        />
        <div className="flex flex-col justify-start" data-aos="fade-left">
          <RiDoubleQuotesL className="text-[14vw] md:text-[10vw] text-clr3" />
          <p className="text-[3.8vw] 2lg:text-[1.2vw] md:text-[2vw] w-[70vw] md:w-[42vw] text-justify">
            The innovative New Website designed to protect patients traveling
            abroad by comparing medical surgery clinics. With a primary focus on
            ensuring that clinics meet legal expectations in foreign countries,{" "}
            <span className="text-clr3 text-[4.8vw] 2lg:text-[1.6vw] md:text-[2.4vw] font-semibold">
              LIFEFINDER
            </span>{" "}
            will help you navigate the complex world of medical tourism and make
            informed decisions based on various criteria, ensuring your safety
            and well-being while avoiding the pitfalls of the wild industry.
          </p>

          <button
            className="relative text-white bg-clr3 text-[4vw] 2lg:text-[1.4vw] md:text-[2vw] font-bold md:p-[0.6vw] p-[2vw] rounded-[8vw] md:rounded-[5vw] w-[46vw] 2lg:w-[16vw] md:w-[38vw] mt-[4vh] 2lg:mt-[4vh] md:mt-[1vh] border-[0.16vw] border-clr3 hover:bg-white hover:text-clr3"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;