import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaHospital, FaStethoscope } from "react-icons/fa";

function EncologyStats() {
  const { ref: numberRef1, inView: numberInView1 } = useInView({
    triggerOnce: true,
  });
  const { ref: numberRef2, inView: numberInView2 } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="flex flex-col justify-center items-center w-full mt-16">
      <div className="flex flex-col md:flex-row gap-8 justify-center w-full items-center md:items-stretch text-center">
        <div className="bg-clr3 text-white p-8 rounded-lg shadow-lg w-[90%] xs:w-[80%] md:w-[45%] 2lg:w-[30vw] 2lg:h-[40vh] flex flex-col justify-center items-center">
          <FaHospital className="text-6xl mb-4" />
          <p ref={numberRef1} className="text-5xl md:text-4xl font-semibold">
            {numberInView1 ? (
              <CountUp start={0} end={6000} duration={5} />
            ) : (
              "0"
            )}
          </p>
          <p className="text-xl md:text-lg font-semibold mt-2">
            REVIEWED CLINICS ON LIFEFINDER
          </p>
        </div>
        <div className="bg-clr3 text-white p-8 rounded-lg shadow-lg w-[90%] xs:w-[80%] md:w-[45%] 2lg:w-[30vw] 2lg:h-[40vh] flex flex-col justify-center items-center">
          <FaStethoscope className="text-6xl mb-4" />
          <p ref={numberRef2} className="text-5xl md:text-4xl font-bold">
            {numberInView2 ? (
              <CountUp start={0} end={2300000} duration={5} />
            ) : (
              "0"
            )}
          </p>
          <p className="text-xl md:text-lg text-center font-semibold mt-2">
            BREAST CANCER DIAGNOSED IN THE WORLD
          </p>
        </div>
      </div>
      <p className="text-lg md:text-base italic mt-[6vh]">
        New Cases Reported Annually - 2020
      </p>
    </div>
  );
}

export default EncologyStats;
