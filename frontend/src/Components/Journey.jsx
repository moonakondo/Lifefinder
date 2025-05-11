import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MedicalServicesSection = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  const [ref1, inView1] = useInView({ threshold: 0.2 });
  const [ref2, inView2] = useInView({ threshold: 0.2 });
  const [ref3, inView3] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView1) controls1.start("visible");
    if (inView2) controls2.start("visible");
    if (inView3) controls3.start("visible");
  }, [controls1, inView1, controls2, inView2, controls3, inView3]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 10px rgba(0, 150, 255, 0.5)",
        "0 0 20px rgba(0, 150, 255, 0.8)",
        "0 0 10px rgba(0, 150, 255, 0.5)",
      ],
      transition: { repeat: Infinity, duration: 2 },
    },
  };

  const buttonHover = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={controls1}
        variants={sectionVariants}
        className="bg-[#0D1A2D] flex flex-col items-center justify-center w-full px-2 md:px-3 py-16 pt-24 pb-24 md:pb-32"
      >
        <div className="flex flex-col md:flex-row items-center md:gap-12 max-w-4xl w-full">
          <div className="text-center md:text-left mb-8 md:mb-0 md:w-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              The Health Partner <br />
              for Your Entire Journey
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-6">
              💡 If it matters to your health, it’s on Life Finder.
            </p>
            <a href="https://life-finder.com/about">
              <motion.button
                className="text-blue-400 text-lg md:text-xl font-semibold flex items-center mx-auto md:mx-0 transition-all duration-300 hover:text-blue-300 border-2 border-blue-400 rounded-md px-4 py-1"
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
              >
                Discover More →
              </motion.button>
            </a>
          </div>
          <motion.div
            variants={glowVariants}
            animate="glow"
            className="md:w-auto flex justify-center items-center border border-gray-700 rounded-lg md:ml-8"
          >
            <img
              src="/kidney-image.jpg"
              alt="Kidney"
              className="relative w-40 h-40 md:w-48 md:h-48 object-contain"
              onError={(e) => {
                e.target.alt = "Kidney image failed to load";
                console.error("Failed to load image at /kidney-image.jpg");
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        ref={ref2}
        initial="hidden"
        animate={controls2}
        variants={sectionVariants}
        className="bg-[#0D1A2D] flex items-center justify-center w-full px-6 md:px-10 py-16 pb-24 md:pb-32"
      >
        <div className="max-w-4xl w-full no-shadow">
          <div className="border-t-2 border-blue-400 md:hidden mb-6"></div>
          <div className="flex flex-col">
            <div className="flex items-center mb-6 md:mr-8">
              <svg
                className="w-12 h-12 mr-3 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Take Control of Your Health
              </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="text-left mb-6 md:mb-0">
                <ul className="text-gray-300 text-base md:text-xl space-y-6">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h16v16H4z"
                      />
                    </svg>
                    Access resources, tools, and personalized health insights
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h16v16H4z"
                      />
                    </svg>
                    Get personalized advice
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h16v16H4z"
                      />
                    </svg>
                    Access to health records & lab results
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h16v16H4z"
                      />
                    </svg>
                    Track progress with dashboard
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center w-full md:items-end md:w-48 h-full pt-0 mt-6">
                <div className="group flex items-center h-12">
                  <a href="https://life-finder.com/about">
                    <motion.button
                      className="text-blue-400 text-base md:text-xl font-semibold flex items-center transition-all duration-300 hover:text-blue-300 border-t-2 border-r-2 border-blue-400 rounded-md px-4 py-1"
                      variants={buttonHover}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Learn More
                      <svg
                        className="w-8 h-8 ml-2 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 8h16M4 16h16M12 4v16"
                        />
                      </svg>
                      <span className="ml-1">→</span>
                    </motion.button>
                  </a>
                  <div className="absolute right-0 mt-16 w-48 bg-[#1A2A44] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ul className="text-gray-300 text-base py-2 space-y-2">
                      <li className="flex items-center px-4 py-2 hover:bg-[#2A3B5A]">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4h16v16H4z"
                          />
                        </svg>
                        Eadrytlien
                      </li>
                      <li className="flex items-center px-4 py-2 hover:bg-[#2A3B5A]">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4h16v16H4z"
                          />
                        </svg>
                        Easigletnq
                      </li>
                      <li className="flex items-center px-4 py-2 hover:bg-[#2A3B5A]">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4h16v16H4z"
                          />
                        </svg>
                        Sypros ap
                      </li>
                      <li className="flex items-center px-4 py-2 hover:bg-[#2A3B5A]">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4h16v16H4z"
                          />
                        </svg>
                        Yevu fovch
                      </li>
                    </ul>
                  </div>
                </div>
                <a href="https://life-finder.com/about">
                  <motion.button
                    className="text-blue-400 text-base md:text-xl font-semibold flex items-center transition-all duration-300 hover:text-blue-300 border-b-2 border-l-2 border-blue-400 rounded-md px-4 py-1 mt-6"
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Discover More
                    <svg
                      className="w-8 h-8 ml-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span className="ml-1">→</span>
                  </motion.button>
                </a>
              </div>
            </div>
            <div className="border-b-2 border-blue-400 md:hidden mt-6"></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={ref3}
        initial="hidden"
        animate={controls3}
        variants={sectionVariants}
        className="bg-[#0D1A2D] flex flex-col items-center justify-center w-full px-2 md:px-3 py-16 pb-24 md:pb-32"
      >
        <div className="border-t-2 border-blue-400 md:hidden mb-6"></div>
        <div className="flex flex-col md:flex-row items-center md:gap-8 max-w-4xl w-full">
          <div className="text-center md:text-left mb-8 md:mb-0 md:w-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Medical Debt Crisis: <br />
              66% of U.S. Bankruptcies
            </h2>
            <p className="text-lg md:text-2xl text-gray-300 mb-6">
              💡 If it matters to your health, it’s on Life Finder.
            </p>
            <a href="https://life-finder.com/about">
              <motion.button
                className="text-blue-400 text-lg md:text-xl font-semibold flex items-center mx-auto md:mx-0 transition-all duration-300 hover:text-blue-300 border-2 border-blue-400 rounded-md px-4 py-1"
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
              >
                Discover More →
              </motion.button>
            </a>
          </div>
          <motion.div
            variants={glowVariants}
            animate="glow"
            className="md:w-auto flex justify-center items-center border border-gray-700 rounded-lg"
          >
            <img
              src="/secondd.jpg"
              alt="Medical Debt Crisis"
              className="relative w-40 h-40 md:w-48 md:h-48 object-contain"
              onError={(e) => {
                e.target.alt = "Image failed to load";
                console.error("Failed to load image at /secondd.jpg");
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalServicesSection;