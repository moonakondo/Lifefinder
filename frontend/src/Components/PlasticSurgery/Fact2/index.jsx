import React from "react";
import { useNavigate } from "react-router-dom";

const Fact2 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center w-[100vw] xs:w-[98vw] px-6 items-center mt-[6vh] mb-[2vh] overflow-hidden">
      <div className="flex flex-col lg:flex-row md:flex-row p-0 xxss:p-[.5vh] xs:p-[1vh] sm:p-[2vh] lg:p-[3vh] xl:p-[5vh] justify-center gap-[2.5rem]">
        <div className="flex flex-col justify-start md:w-1/2">
          <p className="text-[10vw] md:text-[3.4vw] font-semibold text-clr2 mb-3 plastic-heading">
            The Dark Side of Plastic Surgery Overview
          </p>
          <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px]">
            Plastic surgery, a field dedicated to enhancing beauty and
            confidence, unfortunately, attracts its fair share of charlatans
            seeking to exploit unsuspecting patients. Shocking statistics reveal
            that in 2021 alone, there were over 500 reported cases of plastic
            surgery malpractice globally, leading to severe complications and
            even fatalities.
          </p>
          <p className=" text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px] ">
            One notable case involves a young woman who sought a simple
            rhinoplasty from an unlicensed surgeon. The procedure resulted in
            severe complications, requiring multiple corrective surgeries and
            leaving her emotionally scarred. Her story is not isolated, as many
            others have endured similar experiences due to the dangerous
            practices of these charlatans.
          </p>
          {/* <div className="mt-5 lg:mb-0 mb-[20px]">
            <a
              href="/clinics" // Dummy href to enable context menu
              onClick={(e) => onSearch(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 md:px-[4vw] bg-clr3 hover:bg-transparent text-white font-semibold text-base md:text-lg py-[14px] rounded-[5vw] hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
            >
              Explore More
            </a>
          </div> */}
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="/assests/fact2.jpg"
            loading="lazy"
            className="w-full  h-[90vw] md:h-[42vw] rounded-xl object-cover"
            alt="Plastic Surgery"
          />
        </div>
      </div>
    </div>
  );
};

export default Fact2;
