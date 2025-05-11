import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import PricingCard from "./PricigCard";
import { PricingData, PricingTabs } from "./Pricing";
import Articles from "./Articles";
import { useNavigate } from "react-router-dom";

const Pricing = ({ email, hospitalId }) => {
  const navigate = useNavigate();
  // pricing offers state
  const [PricingOffers, setPricingOffers] = useState([]);
  const [duration, setDuration] = useState("monthly");

  // filter pricing offers based on duration
  useEffect(() => {
    if (duration === "monthly") {
      setPricingOffers(
        PricingData.filter(
          (offer) => offer.duration === "month" || offer.duration === "day"
        )
      );
    } else {
      setPricingOffers(
        PricingData.filter((offer) => offer.duration === "year")
      );
    }
  }, [duration]);

  // handle duration change
  const handleDurationChange = (duration) => {
    setDuration(duration);
  };

  return (
    <div className="py-20 lg:py-[107px] bg-[#fbfdff] overflow-hidden">
      <div className="w-full max-w-[1244px] mx-auto px-8">
        <div className="flex flex-col">
          <h1 className="font-onest font-bold text-[#111827] text-center text-[32px] lg:text-[40px] leading-[110%] tracking-[-1px] mx-auto mb-6">
            Are you a Clinic or a Hospital? Subscribe Now!
          </h1>

          {/* Main heading */}
          <h1 className="text-4xl lg:text-6xl font-semibold text-center text-blue-400 mb-7 mt-2">
            BOOST YOUR CLINIC NOW
          </h1>

          {/* Subheading */}
          <p className="text-2xl lg:text-3xl font-semibold text-center mb-4">
            Register for Only 1$/Day
          </p>
          <p className="text-2xl lg:text-3xl font-light italic text-center text-blue-900 mb-10">
            MORE THAN JUST A RIBBON
          </p>
          <div className="flex flex-col">
            <div className="flex justify-center items-center flex-wrap gap-3 w-full max-w-[980px] md:mx-auto mb-9 relative z-[1] ">
              <Tabs
                tabs={PricingTabs}
                selectedTab={duration}
                changeHandler={handleDurationChange}
              />
            </div>
            <div className="relative w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-x-4 gap-y-6">
                {PricingData &&
                  PricingOffers.map((card) => {
                    return (
                      <PricingCard
                        key={card.id}
                        card={card}
                        email={email}
                        hospitalId={hospitalId}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          {/* New components */}
          <Articles />
        </div>
        <div className="flex justify-center items-center gap-x-[40px]">
          <button
            onClick={() => navigate("/signup/hospital")}
            className="bg-clr1 px-[20px] py-[10px] text-white rounded-lg hover:bg-transparent hover:text-clr1 border border-clr1 duration-300 ease-in-out"
          >
            Get Started for $1 a Day
          </button>
          <button
            onClick={() => navigate("/premium-packages")}
            className="bg-clr1 px-[20px] py-[10px] text-white rounded-lg hover:bg-transparent hover:text-clr1 border border-clr1 duration-300 ease-in-out"
          >
            Explore Our Premium Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
