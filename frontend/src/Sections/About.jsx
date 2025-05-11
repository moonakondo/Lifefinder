import React, { useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  const navigate = useNavigate();

  // Separate refs and inView states for each animated section
  const { ref: numberRef1, inView: numberInView1 } = useInView({ triggerOnce: true });
  const { ref: numberRef2, inView: numberInView2 } = useInView({ triggerOnce: true });
  const { ref: numberRef3, inView: numberInView3 } = useInView({ triggerOnce: true });

  useEffect(() => {
    // Initialize AOS with options
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
    AOS.refresh(); // Refresh AOS after initialization
  }, []);

  return (
    <div
      id="aboutus"
      className="flex flex-col justify-center w-[100%] items-center mt-[-10px] mb-[30px]"
    >
      <div className="w-[100%] bg-[rgb(0,9,73)] flex flex-col justify-center items-center p-[5vh] pt-[40px] mt-[2vh]">
        <p
          ref={numberRef1}
          className="text-white text-9xl font-bold mb-[10px]"
        >
          {numberInView1 ? <CountUp start={0} end={20000} duration={3} /> : "0"}
        </p>
        <h3 className="text-white text-[28px] font-semibold mt-[10px] text-center">
          REVIEWED CLINICS ON LIFEFINDERmmm
        </h3>
      </div>

      <div className="w-[100%] bg-[rgb(0,9,73)] flex flex-col items-center py-[5vh]">
        <h2 className="text-white text-4xl font-bold text-center">MEDICAL TOURISM</h2>
        <div className="flex md:flex-row flex-col justify-around gap-[14vw] mt-[4vh] pb-[40px]">
          <div
            data-aos="fade-left"
            className="relative bg-white rounded-[2vw] p-[3vh] w-[70vw] md:w-[35vw] flex justify-center flex-col items-center gap-[2vh] overflow-hidden"
          >
            <p
              ref={numberRef2}
              className="text-[gray] text-7xl font-bold"
            >
              {numberInView2 ? <CountUp start={0} end={1903025} duration={3} /> : "0"}
            </p>
            <p className="text-clr3 text-3xl font-semibold">LIPOSUCTION</p>
            <p className="text-[1.4vw] text-[#a0a0a0] text-center">
              Procedures around the world totaled 2.2 million in 2023, according to an international survey by ISAPS.
            </p>
          </div>

          <div
            data-aos="fade-right"
            className="relative bg-white rounded-[2vw] p-[3vh] w-[70vw] md:w-[35vw] flex justify-center flex-col items-center gap-[2vh] overflow-hidden"
          >
            <p
              ref={numberRef3}
              className="text-[gray] text-7xl font-bold"
            >
              {numberInView3 ? <CountUp start={0} end={30439576} duration={3} /> : "0"}
            </p>
            <p className="text-clr3 text-3xl font-semibold">PLASTIC SURGERY</p>
            <p className="text-[1.4vw] text-[#a0a0a0] text-center">
              Total Procedures performed WORLDWIDE in 2021.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;