import React from "react";
import { useNavigate } from "react-router-dom";

const PlasticBanner = () => {
  const navigate = useNavigate();

  const onSearch = (event) => {
    event.preventDefault();
    if (true) {
      const searchCriteria = {
        allCategeoriesFilter: "Plastic Surgery",
      };
      navigate("/clinics/sub/treatments", { state: searchCriteria });
    }
  };

  return (
    <div className="flex flex-col justify-center w-[100vw] sm:w-[98vw] px-5 items-center mt-[1.5rem] md:mt-[0vh] mb-[2vh]">
      <div className="flex flex-col gap-x-[20px] lg:flex-row md:flex-row p-0 xxss:p-[.5vh] xs:p-[1vh] sm:p-[2vh] lg:p-[3vh] xl:p-[5vh] justify-evenly items-center">
        <div className="relative flex flex-col justify-start md:w-1/2 gap-x-[20px]">
          {/* <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] h-[150vh] mid:h-[80%] bg-[#b3f1ff] z-0 rotate-45"></div> */}
          <div className="z-10">
            <p className="text-[10vw] md:text-[4vw] font-semibold text-clr2 mb-3 plastic-heading">
              Unveiling Society’s Loss of Identity
            </p>
            <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px]">
              Meisel’s powerful imagery reflects the excessive pursuit of
              plastic surgery, capturing the stark contrast between natural
              beauty and the artificially sculpted faces that have become a
              societal norm.
            </p>
            <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px] ">
              The series brings attention to the consequences of plastic surgery
              excess, emphasizing the damages inflicted on individuality and
              self-acceptance in the relentless quest for flawlessness.
            </p>
            <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] ">
              The series brings attention to the consequences of plastic surgery
              excess, emphasizing the damages inflicted on individuality and
              self-acceptance in the relentless quest for flawlessness.
            </p>
          </div>
          <div className="mt-9 lg:mb-0 mb-[20px] z-10">
            <a
              href="/clinics/sub/treatments"
              onClick={(e) => onSearch(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 md:px-[4vw] bg-clr3 hover:bg-transparent text-white font-semibold text-base md:text-lg py-[14px] rounded-[5vw] hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
            >
              Explore More
            </a>
          </div>
        </div>
        <div className="w-full sm:w-[90%] md:w-1/2 xl:w-[42.5%] 2xl:w-[40%] mt-6 md:mt-0 z-10">
          <img
            src="/assests/plastic.jpeg"
            loading="lazy"
            // className="w-full h-full 2lg:h-full 2lg:w-full md:h-[40vh] lg:h-full sm:h-[40vh] ml-[0vh] 2lg:ml-[0vh] md:ml-[1vw] rounded-xl object-cover"
            className="w-full aspect-[.9] md:aspect-[.7] lg:aspect-[.9] ml-[0vh] 2lg:ml-[0vh] md:ml-[1vw] rounded-xl object-cover"
            alt="Plastic Surgery"
          />
        </div>
      </div>
    </div>
  );
};

export default PlasticBanner;
