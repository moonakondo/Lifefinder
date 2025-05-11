import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

function PriceSection() {
  return (
    // <div className="bg-white px-[40px] py-10 rounded-3xl shadow-xl mx-auto border-[1px] border-gray-200 container mt-8 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 max-h-[60%] h-auto transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
    <div className="ppc w-full px-[.7rem] xs:px-[1.2rem] sm:px-[2.5rem] md:px-[5.5rem] py-[2.5rem] mid:py-[3rem] md:py-[4rem] !pb-[5rem] shadow-xl mx-auto mt-[4rem] flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 max-h-[60%] h-auto">
      {/* <div className="background-image"><img src="/public/hero/hospital-building.webp" alt="" /></div> */}
      <img
        src="/Section/lifeline.png"
        alt=""
        className="background-image"
      />
      <div className="flex flex-col items-start w-full lg:1w-1/2 max-w-full space-y-6 lg:pr-10 container m-0 z-50 text-white ">
        <h1 className="text-2xl xxs:text-3xl md:text-4xl 880:text-[30px ] lg:text-4xl 2lg:text-[36px] xl:text-5xl 2xl:text-6xl font-extrabold leading-tight mb-[12px] tracking-wide transition-transform duration-300 ease-in-out hover:scale-[1.03]">
          Boost Your Clinic Now
        </h1>
        <div className="w-full h-[.1rem] bg-[#fff]"></div>
        <p className="text-lg md:text-xl 880:text-[20px] lg:text-[22px] xl:text-2xl 2xl:text-2xl font-semibol mb-4">
          Register for only{" "}
          <span className="text-[#f6f6f6] font-bold animate-pulse">
            $1/day!
          </span>
        </p>
        <p className="text-lg md:text-xl 880:text-[20px] lg:text-[22px] xl:text-2xl 2xl:text-2xl font-bold uppercase">
          SEE HOW AFFORDABLE AI CAN TRANSFORM YOUR CLINIC
          <p className="text-lg md:text-xl 880:text-[20px] lg:text-[22px] xl:text-2xl 2xl:text-2xl normal-case mt-2">
            Subscription Features:
          </p>
        </p>
        <ul className="text-[16px] md:text-lg 880:text-[18px] lg:text-lg 2lg:text-lg xl:text-lg 2xl:text-lg space-y-1 font-medium md:text-justify custom-list list-disc pl-4">
          <li><span className="font-[600]">Get Noticed Globally:</span> Quality Ranking in Search Results and attract International Patients seeking trusted Healthcare options.</li>
          <li><span className="font-[600]">Build Verified Reviews & Ratings:</span> Highlight patient satisfaction + Boost your clinic’s credibility instantly.</li>
          <li><span className="font-[600]">Teleconsultation Integration:</span> Video Conferencing and start receiving bookings from anywhere in the world.</li>
          <li><span className="font-[600]">Patient Appointment Management</span></li>
          <li><span className="font-[600]">Advanced Analytics:</span> Access powerful STATRA insights, KPI TOOLS and patient behavior trends to optimize your services and increase engagement.</li>
          <li><span className="font-[600]">Full-Profile Customization:</span> Showcase your clinic with detailed Information, Prices, Opening Hours, profiles, photos, and success stories to enhance trust and visibility.</li>
          <li><span className="font-[600]">Compliance & Data Security :</span> Standard Data Security and privacy regulations</li>
          {/* <li>
            Basic Telemedicine Integration: Audio and video conferencing up to
            15 minutes.
          </li>
          <li>
            Patient Appointment Management: Simplified scheduling and
            management.
          </li>
          <li>
            Patient Feedback & Rating System: Build credibility with reviews.
          </li>
          <li>
            Compliance & Data Security: Standard data security and privacy
            regulations.
          </li> */}
        </ul>
        <Link to="/pricing">
          <button className="px-8 py-3 mt-[.5rem] text-[18px] font-semibold text-black bg-white rounded-full border-2 border-transparent hover:bg-transparent hover:text-blue-600 hover:border-blue-600 transition-colors duration-300">
            START NOW
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PriceSection;
