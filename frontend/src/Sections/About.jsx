import React, { useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { RiDoubleQuotesL } from "react-icons/ri";
import "../Styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  const navigate = useNavigate();
  const { ref: numberRef1, inView: numberInView1 } = useInView({
    triggerOnce: true,
  });
  const { ref: numberRef2, inView: numberInView2 } = useInView({
    triggerOnce: true,
  });
  const { ref: numberRef3, inView: numberInView3 } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    AOS.refresh(); // Refresh AOS if needed
  }, []);

  return (
    <div
      id="aboutus"
      className="flex flex-col justify-center w-[100%] items-center mt-[40px] mb-[50px]"
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
      <div className="w-[100%] bg-clr3 flex flex-col justify-center items-center p-[5vh] mt-[4vh]">
        <p ref={numberRef1} className="text-white text-6xl font-bold mb-[10px]">
          {numberInView1 ? <CountUp start={0} end={6000} duration={3} /> : "0"}
        </p>
        <h3 className="text-white  text-[20px]  font-semibold mt-[10px] text-center">
          REVIEWED CLINICS ON LIFEFINDER
        </h3>
        <div className="flex justify-center items-center w-full">
          <h2 className="text-white text-5xl font-bold mt-[20px] mb-[40px] text-center">
            MEDICAL TOURISM
          </h2>
        </div>
        <div className="flex md:flex-row flex-col justify-around gap-[14vw]">
          <div
            data-aos="fade-left"
            className="relative bg-white rounded-[2vw] p-[4vh] 2lg:p-[4vh] md:p-[2vh] w-[70vw] md:w-[35vw] flex justify-center flex-col items-center gap-[1vh] md:gap-[3vh] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gray-200 rounded-bl-[100%]"></div>
            <p
              ref={numberRef3}
              className="text-[gray] text-[8vw] md:text-[3.6vw] relative z-10"
            >
              {numberInView3 ? (
                <CountUp start={0} end={1903063} duration={3} />
              ) : (
                "0"
              )}
            </p>
            <p className="text-clr3 text-[3.6vw] 2lg:text-[2vw] md:text-[3vw] font-semibold relative z-10">
              LIPOSUCTION
            </p>
            <p className="text-[3vw] 2lg:text-[1.2vw] md:text-[1.6vw] text-[#a0a0a0] relative z-10 text-center">
              Procedures around the world totaled 2.2 million in 2023, according
              to an international survey by ISAPS.
            </p>
          </div>

          <div
            data-aos="fade-right"
            className="relative bg-white  rounded-[2vw] p-[4vh] 2lg:p-[4vh] md:p-[2vh] w-[70vw] md:w-[35vw] flex justify-center flex-col items-center gap-[1vh] md:gap-[3vh] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gray-200 rounded-bl-[100%]"></div>
            <p
              ref={numberRef3}
              className="text-[gray] text-[8vw] md:text-[3.6vw] relative z-10"
            >
              {numberInView3 ? (
                <CountUp start={0} end={30439576} duration={3} />
              ) : (
                "0"
              )}
            </p>
            <p className="text-clr3 text-[3.6vw] 2lg:text-[2vw] md:text-[3vw] font-semibold relative z-10">
              PLASTIC SURGERY
            </p>
            <p className="text-[3vw] 2lg:text-[1.2vw] md:text-[1.6vw] text-[#a0a0a0] relative z-10 text-center">
              Total Procedures performed WORLDWIDE in 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
