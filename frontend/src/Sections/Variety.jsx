import React from "react";
// import { FaBriefcaseMedical } from "react-icons/fa";
import {
  FaBriefcaseMedical,
  FaTooth,
  FaBaby,
  FaHeartbeat,
  FaNotesMedical,
  FaBone,
  FaEye,
  FaWeight,
  FaBrain,
  FaUserMd,
  FaUserNurse,
  FaHeadSideVirus,
  FaUserFriends,
  FaChild,
  FaStethoscope,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function HealthCard({ title, path, category, icon, searchString }) {
  const navigate = useNavigate();

  const onSearch = (category) => {
    console.log("🚀 ~ onSearch ~ category:", category);
    if (category) {
      navigate(`/clinics/sub/${category}`);
    }
  };

  return (
    <div
      className="relative w-[60vw] xs:w-[45vw] md:w-[27vw] 2xl:w-[25vw] m-[1vw] bg-cover bg-center transform transition-transform duration-300 hover:scale-90 md:hover:scale-110 cursor-pointer"
      // style={{ backgroundImage: `url(${path})` }}
      onClick={() => onSearch(searchString)}
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <div className="relative img-container object-cover w-full aspect-[1.5]">
        <img
          className="relative object-cover w-full aspect-[1.5]"
          src={path}
          loading="lazy"
          alt=""
          style={{ objectFit: "cover", width: "100%", aspectRatio: 1.5 }}
        />
        <div className="absolute inset-0 z-0 bg-black opacity-30"></div>
        <div className="absolute bottom-0 left-[50%] w-[32%] sm:w-[22%] aspect-[1] translate-x-[-50%] translate-y-[50%] bg-[#fff] shadow-xl rounded-[50%]">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[2.2rem] text-clr3">
            {/* <FaBriefcaseMedical /> */}
            {icon}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-center h-[8rem] p-[.5rem]">
        <div>
          {/* <p className="text-xl base:text-2xl my-[2.5rem] mb-[1.4rem] font-bold text-clr2">{title}</p> */}
          <p className="text-md base:text-2xl sm:text-xl my-[2.5rem] mb-[1.4rem] font-bold text-[#444]">
            {title}
          </p>
          {/* <div className="hidden group-hover:block mt-2">
            <a
              className="bg-clr1 px-4 py-2 rounded cursor-pointer"
              onClick={() => onSearch(category)}
            >
              Learn More
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function Variety() {
  const Types = [
    {
      title: "Cosmetic and Aesthetic Procedures",
      path: "/Section/cosmetic.jpg",
      searchString: "Cosmetic and Aesthetic Procedures",
      category: "cosmetic",
      icon: <FaBriefcaseMedical />,
    },
    {
      title: "Dental Care",
      searchString: "Dental Care",
      path: "/Section/dental.jpg",
      category: "dental",
      icon: <FaTooth />,
    },
    {
      title: "Fertility Treatment",
      searchString: "Fertility Treatments Hospitals",
      path: "/Section/fertility.jpg",
      category: "fertility",
      icon: <FaBaby />,
    },
    {
      title: "Cardio Vascular Treatment",
      path: "/Section/cardio.jpg",
      searchString: "Cardio Vascular Treatment",
      category: "cardio",
      icon: <FaHeartbeat />,
    },
    {
      title: "Oncology Treatment",
      searchString: "Oncology Hospitals",
      path: "/Section/oncology.jpg",
      category: "Oncologist",
      icon: <FaNotesMedical />,
    },
    {
      title: "Orthopedic Treatment",
      searchString: "Orthopedic Treatments",
      path: "/Section/orthopedic.jpg",
      category: "orthopedic",
      icon: <FaBone />,
    },
    {
      title: "Ophthalmology",
      searchString: "Ophthalmology Hospitals",
      path: "/Section/ophthalmology.jpg",
      category: "ophthalmology",
      icon: <FaEye />,
    },
    {
      title: "Weight Loss Treatment",
      searchString: "Weight Loss Treatments",
      path: "/Section/weight.jpg",
      category: "Weight",
      icon: <FaWeight />,
    },
    {
      title: "Neurology and Neurosurgery",
      searchString: "Neurology and Neurosurgery Hospitals",
      path: "/Section/neurology.jpg",
      category: "Neurologist",
      icon: <FaBrain />,
    },
    {
      title: "Urology",
      searchString: "Urology Hospitals",
      path: "/Section/urology.jpg",
      category: "urology",
      icon: <FaUserMd />,
    },
    {
      title: "Dermatology",
      searchString: "Dermatology Hospitals",
      path: "/Section/dermatology.jpg",
      category: "Dermatologist",
      icon: <FaUserNurse />,
    },
    {
      title: "ENT Treatment",
      searchString: "Ear, Nose, and Throat (ENT) Hospitals",
      path: "/Section/ent.jpg",
      category: "ent",
      icon: <FaHeadSideVirus />,
    },
    {
      title: "Reproductive Health",
      searchString: "Reproductive Health Hospitals",
      path: "/Section/reproductive.jpg",
      category: "reproductive",
      icon: <FaUserFriends />,
    },
    {
      title: "Geriatric Care",
      searchString: "Geriatric Care Hospitals",
      path: "/Section/geriatric.jpg",
      category: "geriatric",
      icon: <FaChild />,
    },
    {
      title: "Pediatric Care",
      searchString: "Pediatric Care Hospitals",
      path: "/Section/pediatric.jpg",
      category: "pediatric",
      icon: <FaChild />,
    },
    {
      title: "Chronic Disease Management",
      path: "/Section/chronic.jpg",
      searchString: "Chronic Disease Management Hospitals",
      category: "chronic",
      icon: <FaStethoscope />,
    },
    {
      title: "Mental Health",
      searchString: "Mental Health  Hospital",
      path: "/Section/mental.jpg",
      category: "mental",
      icon: <FaBrain />,
    },
  ];

  return (
    <div className="flex flex-col p-[2vh] mt-[10vh] ipp:mt-[6vh] 2lg:mt-[20vh] md:mt-[5vh] justify-center items-center md:w-[98vw]">
      <p className="text-clr2 text-[8vw] md:text-[5vw] text-center font-bold mb-[1rem] md:mb-0">
        Search a Variety of Health Treatments
      </p>
      <p className="text-[#444] text-[.95rem] xxs:text-[3.6vw] xs:text-[3.3vw] sm:text-[3.2vw] 2lg:text-[1.4vw] md:text-[1.8vw] font-semibold text-justify w-[85%]">
        Explore a comprehensive range of health treatments tailored to your
        needs. Compare different procedures, review patient feedback, and find
        the best options for your condition. Make informed decisions with
        detailed information on success rates, costs, and recovery times.
      </p>
      <div className="flex justify-start md:justify-center 2lg:overflow-x-hidden overflow-x-auto ipp:overflow-x-auto md:overflow-x-hidden w-[100%] mt-[2vh] md:mt-[0vh] 2lg:flex-row 2lg:flex-wrap md:p-[5vh]">
        {Types.map((type, index) => (
          <div className="group" key={index}>
            <HealthCard
              title={type.title}
              path={type.path}
              category={type.category}
              icon={type.icon}
              searchString={type.searchString}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Variety;
