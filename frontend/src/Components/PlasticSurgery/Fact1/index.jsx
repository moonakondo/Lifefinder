import React from "react";
import { useNavigate } from "react-router-dom";

function Fact1() {
  const navigate = useNavigate();
  const onSearch = (event) => {
    event.preventDefault(); // Prevent the default action if needed
    if (true) {
      const searchCriteria = {
        allCategeoriesFilter: "Plastic Surgery",
      };
      console.log("🚀 ~ onSearch ~ searchCriteria:", searchCriteria);
      navigate("/clinics/sub/treatments", { state: searchCriteria });
    }
  };
  return (
    <div className="flex flex-col w-full xs:w-[98vw] px-6 md:px-4 mt-[0vh] 2lg:mt-[7vh] md:mt-[7vh]">
      <div className="flex justify-center items-center ">
        {/* <h2 className="text-[7vw] whitespace-nowrap md:text-[3vw]  font-bold  text-center text-clr1">
          MAKEOVER MADNESS
        </h2> */}
      </div>
      <div className="flex flex-col lg:flex-row md:flex-row p-0 xxss:p-[.5vh] xs:p-[1vh] sm:p-[2vh] lg:p-[3vh] xl:p-[5vh] gap-x-[40px] lg:gap-x-[40px] md:gap-x-[1.5rem]">
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="/assests/fact1.jpg"
            loading="lazy"
            className="w-full h-[100vw] md:h-[42vw] rounded-xl object-cover"
            alt="Plastic Surgery"
          />
        </div>
        <div className="flex flex-col justify-start md:w-1/2">
          <p className="text-[10vw] md:text-[3vw]  whitespace-nowrap font-semibold text-clr2 pb-3 pt-3 md:pt-0 plastic-heading">
            MEISEL
          </p>
          <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px]">
            Makeover Madness acts as a visual critique, shedding light on the
            consequences of conforming to an idealized image and the impact it
            has on personal identity, self-worth, and mental well-being.
          </p>
          <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px] ">
            Meisel’s portrayal of plastic surgery excess prompts us to question
            the societal pressures that drive individuals to extreme measures,
            highlighting the urgent need for a more inclusive and compassionate
            definition of beauty.
          </p>
          <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px] ">
            The series provokes dialogue about the distorted perception of self
            in an age of relentless digital filters and photo manipulation,
            reminding us that true beauty lies in embracing our imperfections.
          </p>
          <p className="text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px] ">
            Makeover Madness serves as a wake-up call, urging us to reclaim our
            unique identities and reject the pressures of conformity, fostering
            a society that celebrates diversity and embraces the beauty of
            individuality.
          </p>
          <div className="mt-5 lg:mb-0 mb-[20px]">
            <a
              href="/clinics/sub/treatments" // Dummy href to enable context menu
              onClick={(e) => onSearch(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 md:px-[4vw] bg-clr3 hover:bg-transparent text-white font-semibold text-base md:text-lg py-[14px] rounded-[5vw] hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
            >
              Explore More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fact1;
