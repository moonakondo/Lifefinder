import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function JoinTeam({ contactRef }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const handleJoinClick = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-fit py-3 md:py-0 md:h-[60vh] flex justify-center items-center">
      <img
        src="Section/life.jpg"
        loading="lazy"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 text-center p-4 md:p-10">
        <p className="text-white text-[6vw] md:text-5xl font-medium mb-[10px]">
          JOIN LIFEFINDER'S TEAM
        </p>
        <p className="text-gray-300 2lg:text-[1.2vw] w-[85vw] md:w-[70vw] text-justify">
          It's important for patients engaging in medical tourism to conduct
          thorough research, choose accredited and reputable clinics, and
          understand the legal frameworks and regulations of the destination
          country. It's advisable to consult with legal professionals or seek
          advice from LIFEFINDER's specializing comparator in medical tourism
          clinics throughout the World, to navigate the legal aspects, hygiene
          procedures, prices, delays, and mitigate potential risks for one's
          LIFE.
        </p>
        <button
          onClick={handleJoinClick}
          className="mt-6 text-sm md:text-lg text-white bg-clr3 rounded-[5vw] px-6 py-2 hover:bg-transparent hover:text-white border-[1px] border-clr1 hover:border-clr1 transition duration-300 ease-in-out"
        >
          Become an Ambassador
        </button>
      </div>
    </div>
  );
}

export default JoinTeam;
