import React from "react";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { apiUrl } from "../../apiUrl";
import { useNavigate } from "react-router-dom";

const PricingCard = ({ card, email, hospitalId }) => {
  const month = {
    month: "/mo",
    year: "/year",
    day: "/day",
  };
  // console.log('card: ', card);
  const auth = useAuth();
  const handleSubmit = () => {
    console.log("card button clicked: ", card);
    if (card.title.toLowerCase() === "enterprise plan") {
      return navigate("/contact-us");
    }
    if (email) {
      axios
        .post(apiUrl + "/create-subscription", {
          userId: email || auth?.user?.email,
          type: card.duration === "year" ? card.title + " Yearly" : card.title,
          amount: card.price,
          duration: card.duration,
          hospitalId: hospitalId,
        })
        .then((res) => {
          console.log("make-subscription api result: ", res.data);
          if (res?.data?.link) {
            // window.location.href = res?.data?.link;
            window.open(res?.data?.link, "_self");
          }
        })
        .catch((e) => {
          console.log(
            "make-subscription api error: ",
            e.response?.data?.message
          );
        });
    } else {
      console.log(
        "location.state.email not available: create-subscription api not called!"
      );
      navigate("/signup/hospital");
    }
  };

  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col gap-6 w-full md:w-auto border border-solid rounded-xl p-6 ${
        card.title.toLowerCase() === "premium plan"
          ? "bg-[#111827] border-[#111827] relative"
          : "bg-[#fff] border-[#E5E7EB]"
      }`}
    >
      <div className="flex flex-col gap-6 pb-6 border-b border-solid border-[#E5E7EB]">
        <div
          className={`font-avenir font-medium text-base leading-[100%] ${
            card.title.toLowerCase() === "premium plan"
              ? "text-[#D1D5DB]"
              : "text-[#111827]"
          }`}
        >
          {card.title}
        </div>
        <div
          className={`font-onest font-bold text-[26px] md:text-[36px] leading-[100%] tracking-[-1.26px] whitespace-nowrap ${
            card.title.toLowerCase() === "premium plan"
              ? "text-[#F9FAFB]"
              : "text-[#111827]"
          }`}
        >
          {card.title.toLowerCase() !== "enterprise" && "$"}
          {card.price}
          <span
            className={`text-sm font-avenir font-medium text-[#6b7280] leading-[100%] ml-1 ${
              card.title.toLowerCase() === "premium plan"
                ? "text-[#F9FAFB]"
                : "text-[#6b7280]"
            }`}
          >
            {card.title.toLowerCase() !== "enterprise" &&
              month[card.duration.toLowerCase()]}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:h-[200px] h-full">
        {card.features.map((feature, index) => (
          <div
            key={index}
            className={`relative pl-[22px] font-avenir text-sm font-normal text-[#445E7C] leading-[150%]  ${
              card.title.toLowerCase() === "premium plan"
                ? "text-[#F9FAFB]"
                : "text-[#6b7280]"
            }`}
          >
            <span className="inline-flex absolute left-0 top-[2px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                className="w-[16px] h-[16px]"
              >
                <path
                  stroke="#6ab04c"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m3 8.5 4 4 6-9"
                ></path>
              </svg>
            </span>
            {feature}
          </div>
        ))}
      </div>
      <button
        type="primary"
        htmlType="submit"
        className={`w-full hover:text-clr1 ${
          card.title.toLowerCase() === "premium plan"
            ? "bg-white text-black hover:text-white hover:border-[#fff]"
            : "bg-clr1 text-white"
        } hover:bg-transparent py-2 font-semibold text-xl rounded-xl border-2 border-clr1 transition-all duration-300 ease-in-out`}
        onClick={handleSubmit}
      >
        Select
      </button>
    </div>
  );
};

export default PricingCard;
