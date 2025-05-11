import React, { useEffect, useState } from "react";
import {
  MdOutlineMedicalServices,
  MdOutlineLocalHospital,
  MdOutlineFavorite,
  MdOutlineChildCare,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { RiMentalHealthLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";

function Section2() {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS if needed
  }, []);

  const services = [
    {
      title: "PLASTIC SURGERY",
      animation: "fade-right",
      description:
        "The world of plastic surgery can be overwhelming, but at LIFEFINDER, we prioritize your safety and satisfaction. We believe in connecting you with reputable clinics that adhere to strict safety standards and employ board-certified surgeons. Our platform offers tools to compare plastic surgery clinics based on specialties, procedures offered, patient satisfaction, and safety records. Explore our resources, make informed choices, and ensure your plastic surgery journey is a positive and transformative experience.",
      icon: <MdOutlineMedicalServices />,
    },
    {
      title: "FERTILITY & SURROGACY",
      animation: "fade-left",
      description:
        "Building a family through surrogacy or fertility treatments is a deeply personal and important decision. At LIFEFINDER, we support your path to parenthood by connecting you with trustworthy clinics. Our platform provides resources to compare clinics specializing in surrogacy and fertility treatments. Explore options like success rates, donor programs, legal support, and patient experiences. With our guidance, make informed choices and take confident steps towards realizing your dream of parenthood.",
      icon: <MdOutlineChildCare />,
    },
    {
      title: "ONCOLOGY",
      animation: "fade-right",
      description:
        "When it comes to cancer treatments, access to world-class care is crucial. At LIFEFINDER, we connect you with renowned oncology clinics that prioritize comprehensive, cutting-edge treatments and compassionate support. Discover leading centers with multidisciplinary teams, advanced therapies, research advancements, and patient testimonials. With our platform, you can confidently choose the right oncology clinic that aligns with your needs, giving you the best chance for a successful journey to recovery.",
      icon: <MdOutlineHealthAndSafety />,
    },
    {
      title: "CARDIOLOGY",
      animation: "fade-left",
      description:
        "Your heart deserves the best care, and at life-finder, we connect you with internationally renowned cardiology clinics. We understand the complexities of heart-related conditions and the need for specialized expertise. Our platform offers insights into top clinics worldwide, providing information on treatment options, state-of-the-art facilities, expert cardiologists, and patient outcomes. Compare and choose the best cardiology clinic that aligns with your needs, and embark on a path to a healthier heart.",
      icon: <MdOutlineFavorite />,
    },
    {
      title: "YOUR SMILE IS OUR COMMAND",
      description:
        "Discover leading dental clinics worldwide, offering a range of services from routine check-ups to advanced treatments. Our platform provides information on highly skilled dentists, state-of-the-art facilities, and patient reviews. Compare dental clinics based on specialties, treatment options, affordability, and patient satisfaction. With our assistance, you can maintain a healthy smile and achieve optimal dental well-being.",
      icon: <MdOutlineLocalHospital />,
    },
    {
      title: "COMMERCIAL LITIGATION",
      animation: "fade-right",
      description:
        "Malpractice or Negligence, lack of Hygiene procedures or malinformation, Cases of medical malpractice or negligence can occur in any healthcare setting, including those catering to medical tourists. Substandard care, surgical errors, or complications due to negligence, may lead to legal disputes. Lack of Legal Framework or Regulations: Medical tourism involves crossing borders and seeking treatment in foreign countries. Differences in legal frameworks, regulations, or standards of care can create challenges and uncertainties for patients, particularly if a dispute arises.",
      icon: <RiMentalHealthLine />,
    },
  ];

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };

  const toggleDescription = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="px-4 py-8 bg-[#f3f3f3] w-full mt-[4vh] flex justify-center items-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full container">
        {services.map((service, index) => (
          <div
            key={index}
            className="m-2 w-[100%] h-auto rounded-[0.6vw]"
            data-aos={service.animation}
            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <div className="flex flex-col items-center">
              <div className="text-clr3 text-[18vw] 2lg:text-[3.4vw] border-[0.1vw] border-clr3 2lg:p-[2vh] p-[1vh] md:rounded-[10vw] rounded-full md:text-[4vw] mb-[2vh] mt-[4vh] mr-2">
                {service.icon}
              </div>
              <h2 className="text-[4vw] 2lg:text-[1.4vw] md:text-[2vw] font-bold text-clr3 text-center flex justify-center w-full">
                {service.title}
              </h2>
            </div>
            <p className="hyphens-auto mb-4  text-gray-700 text-[4vw] xs:text-[3.3vw] mid:text-[2.6vw] md:text-[1.9vw] lg:text-[1.8vw] base:text-[1.7vw] xl:text-[1.4vw] 2xl:text-[1.2vw] text-justify px-[15px]">
              {expanded === index
                ? service.description
                : truncateText(service.description, 230)}
              {service.description.length > 230 && (
                <div>
                  {/* {expanded === index ? " " : "... "} */}
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-blue-500 underline focus:outline-none"
                  >
                    {expanded === index ? "Read Less" : "Read More"}
                  </button>
                </div>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section2;
