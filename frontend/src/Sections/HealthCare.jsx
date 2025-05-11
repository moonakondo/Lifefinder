// HealthcareSection.jsx

import React from "react";
import { FaGlobe, FaStar, FaVideo } from "react-icons/fa";

const HealthcareSection = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-12 lg:px-24">
      {/* Statistic Banner */}
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8">
        <p className="font-semibold">
          66.5% of BANKRUPTCIES in the U.S. are tied to medical issues
        </p>
        <p className="text-sm">– American Journal of Public Health</p>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          TIME TO FLIP THE CHESS BOARD
        </h2>
        <p className="text-lg text-gray-700">
          Stop Guessing. Start Comparing. Own Your Health Journey.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-6 mb-8 w-full">
        <div className="flex flex-col items-center text-center">
          <FaGlobe className="text-blue-500 w-12 h-12 mb-2" />
          <h3 className="text-xl font-semibold">Explore Healthcare</h3>
          <p className="text-gray-600">
            Browse and compare clinics worldwide to find the best fit for you.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaStar className="text-blue-500 w-12 h-12 mb-2" />
          <h3 className="text-xl font-semibold">Read Real Reviews</h3>
          <p className="text-gray-600">
            Gain insights from other patients to make informed decisions.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaVideo className="text-blue-500 w-12 h-12 mb-2" />
          <h3 className="text-xl font-semibold">Book Teleconsultations</h3>
          <p className="text-gray-600">
            Schedule appointments with top professionals from home.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="/signup"
          className="bg-clr1 text-white px-6 py-[8px] rounded-md text-lg font-medium hover:bg-transparent hover:text-clr1 border-[1px] border-clr1 transition"
        >
          Register
        </a>
        <a
          href="/login"
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-300 transition"
        >
          Start for Free
        </a>
      </div>
    </section>
  );
};

export default HealthcareSection;
