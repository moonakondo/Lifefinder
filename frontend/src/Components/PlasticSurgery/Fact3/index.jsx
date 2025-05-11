// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Fact2 = () => {
//   const navigate = useNavigate();

//   const onSearch = (event) => {
//     event.preventDefault(); // Prevent the default action if needed
//     if (true) {
//       const searchCriteria = {
//         service: "Plastic Surgery",
//       };
//       console.log("🚀 ~ onSearch ~ searchCriteria:", searchCriteria);
//       navigate("/clinics", { state: searchCriteria });
//     }
//   };
//   return (
//     <div className="flex flex-col justify-center w-full md:w-[98vw] px-6 items-center mt-[6vh] mb-[3.5rem] overflow-hidden">
//       <div className="flex flex-col md:flex-col p-0 sm:p-[2vh] lg:p-[3vh] xl:p-[5vh] justify-center gap-[1rem]">
//         <div className="flex flex-col justify-center w-full">
//           <div className="text-[10vw] md:text-[3.4vw] font-semibold text-clr2 mb-[1.8rem] text-center">
//           Understanding Hair Transplantation in Plastic Surgery
//           </div>
//           <div className="text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] mb-[10px] text-center">
//             Hair transplant procedures have become a significant component of plastic surgery, providing individuals with a permanent solution to hair loss. Utilizing advanced techniques like Follicular Unit Extraction (FUE) and Follicular Unit Transplantation (FUT), plastic surgeons can restore hair density and create natural-looking hairlines. These procedures not only improve aesthetic appearance but also boost self-confidence and overall quality of life for patients. By meticulously harvesting and transplanting hair follicles, plastic surgeons achieve results that blend seamlessly with the patient's existing hair, ensuring a rejuvenated and youthful appearance.
//           </div>
//           {/* <p className="text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw] w-[100%] md:w-[42vw] mb-[10px] ">
//             One notable case involves a young woman who sought a simple
//             rhinoplasty from an unlicensed surgeon. The procedure resulted in
//             severe complications, requiring multiple corrective surgeries and
//             leaving her emotionally scarred. Her story is not isolated, as many
//             others have endured similar experiences due to the dangerous
//             practices of these charlatans.
//           </p> */}
//           <div className="w-full flex flex-col md:flex-row justify-center md:justify-evenly gap-[2rem] my-[3rem]">
//             <img
//               src="/assests/hair.jpg"
//               loading="lazy"
//               className="w-full md:w-[45%] h-[40vh] sm:h-[50vh] md:h-[38vw] rounded-xl object-cover"
//               alt="Plastic Surgery"
//             />
//             <img
//               src="/assests/hair2.jpg"
//               loading="lazy"
//               className="w-full md:w-[45%] h-[40vh] sm:h-[50vh] md:h-[38vw] rounded-xl object-cover"
//               alt="Plastic Surgery"
//             />
//           </div>
//           <div className="lg:mb-0 mb-[20px] flex justify-center">
//             <a
//               href="/clinics" // Dummy href to enable context menu
//               onClick={(e) => onSearch(e)}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-5 md:px-[4vw] bg-clr3 hover:bg-transparent text-white font-semibold text-base md:text-lg py-[14px] rounded-[5vw] hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
//             >
//               Explore More
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Fact2;

import React from "react";
import { useNavigate } from "react-router-dom";

const Fact2 = () => {
  const navigate = useNavigate();

  const onSearch = (event) => {
    event.preventDefault();
    const searchCriteria = {
      allCategeoriesFilter: "Hair Transplant",
    };
    console.log("🚀 ~ onSearch ~ searchCriteria:", searchCriteria);
    navigate("/clinics/sub/treatments", { state: searchCriteria });
  };

  return (
    <div className="flex flex-col justify-center w-full md:w-[98vw] px-6 items-center mt-[6vh] mb-[3.5rem] overflow-hidden">
      <div className="flex flex-col md:flex-col p-0 sm:p-[2vh] lg:p-[3vh] xl:p-[5vh] justify-center gap-[1rem]">
        <div className="flex flex-col justify-center w-full">
          <div className="plastic-heading text-[10vw] sm:text-[9vw] mid:text-[8vw] md:text-[3.4vw] font-semibold text-clr2 mb-[1.5rem] text-center ">
            Understanding Hair Transplantation in Plastic Surgery
          </div>
          <div className="flex justify-center">
            <div className=" w-[75%] text-justify text-[4vw] sm:text-[3.4vw] mid:text-[2.8vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.3vw]  mb-[10px]">
              Hair transplant procedures have become a significant component of
              plastic surgery, providing individuals with a permanent solution
              to hair loss. Utilizing advanced techniques like Follicular Unit
              Extraction (FUE) and Follicular Unit Transplantation (FUT),
              plastic surgeons can restore hair density and create
              natural-looking hairlines. These procedures not only improve
              aesthetic appearance but also boost self-confidence and overall
              quality of life for patients. By meticulously harvesting and
              transplanting hair follicles, plastic surgeons achieve results
              that blend seamlessly with the patient's existing hair, ensuring a
              rejuvenated and youthful appearance.
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8 my-[2rem] md:my-[3rem]">
            <div className="relative group w-full lg:w-[40%] md:w-[45%] h-[40vh] sm:h-[50vh] rounded-xl overflow-hidden shadow-xl">
              <img
                src="/assests/hair.jpg"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                alt="Plastic Surgery"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>
            </div>
            <div className="relative group w-full lg:w-[40%] md:w-[45%] h-[40vh] sm:h-[50vh] rounded-xl overflow-hidden shadow-xl">
              <img
                src="/assests/hair2.jpg"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                alt="Plastic Surgery"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>
            </div>
          </div>
          {/* <div className="flex justify-center">
            <a
              href="/clinics"
              onClick={(e) => onSearch(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-clr3 hover:bg-transparent text-white font-semibold text-lg rounded-lg hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
            >
              Explore More
            </a>
          </div> */}
          <div className="lg:mb-0 mb-[20px] flex justify-center">
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
};

export default Fact2;
