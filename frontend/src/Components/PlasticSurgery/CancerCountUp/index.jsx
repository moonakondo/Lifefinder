import React from "react";
import CountUp from "react-countup";

function CancerCounting() {
  const data = [
    { title: "Global Cancer Cases", count: 19292789 },
    { title: "Global Mortality Rate", count: 50, suffix: "%" },
    { title: "Asian Mortality Rate", count: 58.3, suffix: "%" },
    { title: "Worldwide Lung Cancer", count: 18, suffix: "%" },
  ];

  return (
    <div className="mx-auto px-4 mt-12 md:px-20">
      <div className="mt-8">
        <p className="text-[7vw] md:text-[3vw] font-bold text-clr2 mb-[10px] text-center items-center ">
          Global Cancer Statistics Overview
        </p>
        <div className="flex justify-center items-center w-full mb-[30px]">
          <p className="text-justify text-[4.5vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[2.1vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] text-clr1 mb-4 items-center lg:w-[62vw] mid:w-[78%] w-[95%]">
            <span className="font-bold">Cancer</span> is the leading cause of
            premature mortality in France, surpassing cardiovascular diseases.
            In 2023, it is estimated that over
            <span className="font-bold ml-[10px] mr-[10px]">
              <CountUp start={0} end={433136} duration={2.5} separator="," />
            </span>
            new cancer cases will be diagnosed in France. Currently, it is
            estimated that
            <span className="font-bold ml-[10px] mr-[10px]">
              <CountUp start={0} end={3800000} duration={2.5} separator="," />
            </span>
            people are living in France with a cancer diagnosis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 base:grid-cols-4 gap-8">
        {data.map((statistic, index) => (
          <div
            key={index}
            className="rounded-lg bg-blue-100 p-4 flex flex-col justify-between"
          >
            <h2 className="text-[26px] font-bold text-clr1 mb-4 h-fit xxss:h-12 lg:h-14">
              {statistic.title}
            </h2>
            <p className="text-[1.6rem] font-semibold text-clr2">
              <CountUp
                start={0}
                end={statistic.count}
                duration={2.5}
                separator=","
                suffix={statistic.suffix || ""}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CancerCounting;
