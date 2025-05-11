import "../Styles/hero.css";
import { useEffect } from "react";

function Section1() {
  return (
    <div className=" mt-[70px] mb-[70px] relative w-full flex flex-col justify-between sm:justify-start sm:flex-row items-center h-[33vh] xxss:h-[36vh] xs:h-[40vh] sm:h-[50vh] md:h-[60vh] xl:h-[70vh]">
      <div className="absolute left-[50%] base:w-[60%] lg:w-[65%] md:w-[70%] sm:w-[70%] xs:w-[85%] w-[95%] aspect-[1.6] top-[50%] translate-x-[-50%] translate-y-[-50%] z-0 flex justify-center items-center bg-gradient-to-b from-transparent to-white opacity-80 rounded-md p-2">
        {/* <img
          src="/Section/sec1.webp"
          loading="lazy"
          alt="picture"
          className="w-full h-full object-contain rounded-[2vw] z-[-10]"
          data-aos="fade-down"
        /> */}
        <div className="relative w-full aspect-[1.6] rounded-[2vw] overflow-hidden">
          <img
            src="/photo-2.jpeg"
            loading="lazy"
            alt="picture"
            className="w-full h-full object-cover object-top"
            data-aos="fade-down"
          />
        </div>
      </div>
      {/* <div className="w-[90%] sm:w-[50%] sm:ml-[6vw] leading-tight text-[8vw] sm:text-[6vw] pl-[10%]" data-aos="fade-down"> */}
      <div className="w-[90%] sm:w-[50%] sm:ml-[4vw] md:ml-0 leading-tight text-[8.5vw] xs:text-[8vw] sm:text-[6vw] pl-[7%] xs:pl-[8%] z-[22]">
        <p className="text-clr2 w-[100%] sm:w-[40vw] relative z-[22] plastic-heading">
          COMPARE CLINICS
        </p>
        <p className="text-clr2 w-[100%] sm:w-[40vw] plastic-heading">
          <p className="inline sm:block text-clr2 w-[40vw] mr-[0.6rem] sm:mr-0 italic font-normal">
            &
          </p>
          PROCEDURES
        </p>
      </div>
      <div className="w-[80%] xxss:w-[70%] sm:w-[50%] flex justify-center sm:justify-end base:pr-[7vw] sm:pr-[6vw] text-[#333] text-[.85rem] xxss:text-[.9rem] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.4vw] z-20 font-semibold">
        <div
          className="w-[100%] sm:w-[22vw] text-justify hyphens-auto"
          data-aos="fade-down"
        >
          Your Ultimate resource for Safe Medical Tourism. Are you planning to
          undergo a medical surgery abroad? Concerned about the potential risks
          and the variability in quality across clinics?
        </div>
      </div>
    </div>
  );
}

export default Section1;
