// src/components/PremiumPackagesSection.jsx

import React from "react";
import { FaArrowRight } from "react-icons/fa";

const MedisphereSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-full container mx-auto flex flex-col-reverse lg:flex-row items-center">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
            MEDISPHERE: We Build
            <br className="hidden md:block" />
            <span className="block">Profitable and Proud Ventures</span>
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-8">
            Elevate your medical practice with our comprehensive solutions
            designed to drive growth and excellence.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center bg-clr1  text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-transparent hover:text-clr1 border border-clr1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Explore Premium Packages
            <FaArrowRight className="ml-3" />
          </a>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            alt="Medisphere Premium Packages"
            src="/login.jpeg" // Replace with your actual image path
            loading="lazy"
            className="w-full h-[500px] object-contain rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default MedisphereSection;
