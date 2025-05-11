import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessMeeting() {
  const navigate = useNavigate();

  const BackToHome = () => navigate("/");
  return (
    <div className="flex flex-col justify-center items-center w-[100%] mt-[5vh]">
      <h1 className="md:text-[2.4vw] text-[4.4vw] font-700 text-clr1">
        ThankYou for Attending Meeting
      </h1>
      <p className="md:text-[1.8vw] text-[3.8vw] font-700 text-clr2">
        Stay Connected
      </p>
      <img
        src="doctor.png"
        loading="lazy"
        alt="Greetings Image"
        className="md:w-[30vw] w-[60vw] md:h-[44vh] h-[34vh] ml-[2vw]"
      ></img>
      <button
        className="text-white bg-clr2 px-[2.2vw] py-[1.2vh] md:text-[1.4vw] text-[3.4vw] font-700 rounded-[1vw] my-[4vh] hover:bg-clr3"
        onClick={BackToHome}
      >
        Back to Home
      </button>
    </div>
  );
}

export default SuccessMeeting;
