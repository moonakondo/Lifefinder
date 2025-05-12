import React, { useEffect, useRef, useState } from "react";
import { FaLanguage, FaSearch, FaUser } from "react-icons/fa";
import About from "../Sections/About";
import About2 from "./About2";
import HowItWorks from "./Imagery";
import MedicalServicesSection from "./Journey";
import ContactForm from "./Form";
import TeamSection from "./Team2";
import Welcome from "./Welcome";
import Register from "./Register";
import SearchOptions from "../Sections/SearchOption";



const languages = [
  { code: "en", name: "English", flag: "./Flags/english.png" },
  { code: "es", name: "Spanish", flag: "./Flags/spanish.png" },
  { code: "fr", name: "French", flag: "./Flags/french.png" },
  { code: "de", name: "German", flag: "./Flags/german.png" },
  { code: "zh-CN", name: "Chinese", flag: "./Flags/china.png" },
  { code: "pt", name: "Portuguese", flag: "./Flags/portuguese.png" },
];

const Home2 = () => {
  const videoRef = useRef(null);
  const headerRef = useRef(null);
  const videoSectionRef = useRef(null);
  const textSectionRef = useRef(null);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [scrollCount, setScrollCount] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isClinicDropdownOpen, setIsClinicDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [videoDuration, setVideoDuration] = useState(null);
  const [timeIncrement, setTimeIncrement] = useState(0.1);
  const [scale, setScale] = useState(1);
  const [isShrinking, setIsShrinking] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [animateHeading, setAnimateHeading] = useState(false);

  const isAuthenticated = false;
  const user = null;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onLoadedData = () => {
        setIsVideoReady(true);
        setVideoDuration(video.duration);
        const increment = video.duration / 30;
        setTimeIncrement(increment);
        video.currentTime = 0;
        video.play().catch((error) => {
          console.error("Video autoplay failed:", error);
        });
      };

      video.addEventListener("loadeddata", onLoadedData);
      video.load();

      return () => {
        video.removeEventListener("loadeddata", onLoadedData);
      };
    }
  }, [resetKey]);

  useEffect(() => {
    const handleScroll = (e) => {
      const now = Date.now();
      if (now - lastScrollTime < 20) return;
      setLastScrollTime(now);

      const video = videoRef.current;
      const videoSection = videoSectionRef.current;
      if (!video || !videoSection || !isVideoReady || !videoDuration) return;

      const rect = videoSection.getBoundingClientRect();
      const scrollY = window.scrollY;
      const isNearTop = scrollY <= 50 && !isScrollLocked;
      const isPartiallyInView = rect.top <= window.innerHeight && rect.bottom >= 0;

      setIsScrolling(true);

      const direction = e.deltaY > 0 ? "down" : "up";

      if (direction === "up" && isNearTop) {
        setIsScrollLocked(true);
        setScrollCount(0);
        setShowContent(false);
        setVideoEnded(false);
        setScale(1);
        setIsShrinking(false);
        setResetKey((prev) => prev + 1);
        video.pause();
        video.currentTime = 0;
        video.load();
        video.play().catch((error) => {
          console.error("Video play failed on reset:", error);
        });
        window.scrollTo({ top: 0, behavior: "instant" });
        console.log("Full Reset: scrollCount=0, isShrinking=false, isScrollLocked=true, showContent=false, resetKey=", resetKey + 1);
      }

      if (isScrollLocked) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "instant" });

        if (direction === "down" && video.currentTime < video.duration) {
          const newTime = Math.min(video.duration, video.currentTime + timeIncrement);
          video.currentTime = newTime;
        } else if (direction === "up" && video.currentTime > 0) {
          const newTime = Math.max(0, video.currentTime - timeIncrement);
          video.currentTime = newTime;
        }

        setScrollCount((prev) => {
          const newCount = direction === "down" ? prev + 1 : prev - 1;

          if (newCount < 0) {
            console.log("Scroll count reached 0, preventing negative count");
            return 0;
          }

          if (newCount >= 25 && newCount <= 30) {
            setIsShrinking(true);
            const progress = (newCount - 25) / 5;
            const finalScale = 0.5;
            const newScale = 1 - progress * (1 - finalScale);
            setScale(newScale);
            console.log(`Shrinking: scrollCount=${newCount}, isShrinking=true, scale=${newScale}`);
          } else {
            setIsShrinking(false);
            if (newCount < 25) {
              setScale(1);
            }
            console.log(`Not Shrinking: scrollCount=${newCount}, isShrinking=false`);
          }

          if (newCount >= 30 || video.currentTime >= video.duration - 0.01) {
            setIsScrollLocked(false);
            setShowContent(true);
            setVideoEnded(true);
            video.pause();
            if (textSectionRef.current) {
              const textSectionTop = textSectionRef.current.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: textSectionTop, behavior: "instant" });
            }
            console.log("Video Ended: scrollCount=30+, isScrollLocked=false, showContent=true");
          }

          return newCount;
        });
      } else if (isPartiallyInView) {
        if (direction === "down" && video.currentTime < video.duration) {
          const newTime = Math.min(video.duration, video.currentTime + timeIncrement);
          video.currentTime = newTime;
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isScrollLocked, lastScrollTime, isVideoReady, videoDuration, timeIncrement]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeout;
    if (isScrolling) {
      timeout = setTimeout(() => {
        setIsScrolling(false);
        video.pause();
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [isScrolling]);

  useEffect(() => {
    document.body.style.overflow = isScrollLocked ? "hidden" : "";
    document.body.style.height = isScrollLocked ? "100vh" : "";
    document.body.style.position = isScrollLocked ? "fixed" : "";
    document.body.style.width = isScrollLocked ? "100%" : "";

    if (isScrollLocked) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isScrollLocked]);

  useEffect(() => {
    if (!isScrollLocked) {
      setAnimateHeading(true);
    } else {
      setAnimateHeading(false);
    }
  }, [isScrollLocked]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsClinicDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
    setIsUserDropdownOpen(false);
    setIsClinicDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
    setIsLanguageDropdownOpen(false);
    setIsClinicDropdownOpen(false);
  };

  const toggleClinicDropdown = () => {
    setIsClinicDropdownOpen((prev) => !prev);
    setIsLanguageDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleTranslate = (language) => {
    setSelectedLanguage(language);
    const translateElement = document.querySelector(".goog-te-combo");
    if (translateElement) {
      translateElement.value = language.code;
      translateElement.dispatchEvent(new Event("change"));
    } else {
      console.error("Google Translate element (.goog-te-combo) not found. Ensure the Google Translate script is loaded.");
    }
    setIsLanguageDropdownOpen(false);
  };

  const unAuthenticatedUserDropdown = [
    { name: "Login", href: "https://life-finder.com/login" },
    { name: "Signup", href: "https://life-finder.com/signup" },
    { name: "Register Hospital", href: "https://life-finder.com/signup/hospital" },
  ];

  const authenticatedUserDropDown = [
    { name: "Profile", href: "https://life-finder.com/profile" },
    { name: "Register Hospital", href: "https://life-finder.com/signup/hospital" },
    { name: "Log Out", href: "#", onClick: () => console.log("Log out") },
  ];

  const userDropdownData = isAuthenticated
    ? authenticatedUserDropDown
    : unAuthenticatedUserDropdown;

  const clinicDropdownData = [
    { name: "Home", href: "https://life-finder.com/pricing" },
    { name: "About", href: "https://life-finder.com/pricing" },
    { name: "Services", href: "https://life-finder.com/pricing" },
    { name: "Contact", href: "https://life-finder.com/pricing" },
  ];

  const navItems = [
    { name: "Find", href: "https://life-finder.com/clinics/sub/treatments" },
    { name: "Our Vision", href: "https://life-finder.com/about" },
    { name: "Oncology", href: "https://life-finder.com/encology" },
    { name: "Plastic Surgery", href: "https://life-finder.com/plasticsurgery" },
    { name: "JOIN", href: "https://life-finder.com/pricing" },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Inline CSS for slower continuous pulse animation */}
      <style>
        {`
          .animate-heading {
            animation: pulse 4s ease-in-out infinite;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>

      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full bg-transparent pt-8 pb-4 px-4 sm:px-6 flex justify-between items-center z-20 transition-all duration-300 ${
          isScrollLocked ? "fixed" : "absolute"
        }`}
        style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
      >
        {/* Logo */}
        <div
          className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
            isShrinking ? "text-blue-500" : "text-white"
          }`}
        >
          LifeFinder
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className={`md:hidden focus:outline-none transition-colors duration-300 ${
            isShrinking ? "text-blue-500" : "text-white"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:justify-between md:min-w-[600px] absolute md:static top-16 left-0 w-full bg-gray-900 md:bg-transparent z-10 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center mx-auto">
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 justify-center p-4 md:p-0 flex-wrap">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className={`text-sm sm:text-base font-bold transition-colors duration-300 ${
                    isShrinking ? "text-blue-500 hover:text-blue-300" : "text-white hover:text-gray-300"
                  }`}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-center p-4 md:p-0 flex-wrap md:ml-8">
              <li className="relative text-sm sm:text-base font-bold">
                <button
                  className={`cursor-pointer bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition-colors duration-300 text-white`}
                  onClick={toggleClinicDropdown}
                  aria-expanded={isClinicDropdownOpen}
                  aria-haspopup="true"
                >
                  I'm a Clinic
                </button>
                <ul
                  className={`${
                    isClinicDropdownOpen ? "block opacity-100" : "hidden opacity-0"
                  } absolute bg-gray-900 shadow-lg rounded-md mt-2 w-48 flex flex-col space-y-2 p-2 transition-all duration-200 ease-in-out top-full left-0 md:left-auto md:right-0 z-20`}
                >
                  {clinicDropdownData.map((item) => (
                    <li
                      key={item.name}
                      className={`text-sm sm:text-base font-bold transition-colors duration-300 ${
                        isShrinking ? "text-blue-500 hover:text-blue-300" : "text-white hover:text-gray-300"
                      }`}
                    >
                      <a
                        href={item.href}
                        className="block"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsClinicDropdownOpen(false);
                        }}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 p-4 md:p-0 flex-wrap">
            <li className="relative flex items-center">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={toggleLanguageDropdown}
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="true"
              >
                <FaLanguage
                  className={`text-3xl transition-colors duration-300 ${
                    isShrinking ? "text-blue-500" : "text-white"
                  }`}
                />
              </button>
              <ul
                className={`${
                  isLanguageDropdownOpen ? "block opacity-100" : "hidden opacity-0"
                } absolute bg-gray-900 shadow-lg rounded-md mt-2 w-48 flex flex-col space-y-2 p-2 transition-all duration-200 ease-in-out top-full right-0 z-20`}
              >
                {languages.map((language) => (
                  <li
                    key={language.code}
                    className={`text-sm sm:text-base font-bold flex items-center gap-x-2 cursor-pointer transition-colors duration-300 ${
                      isShrinking ? "text-blue-500 hover:text-blue-300" : "text-white hover:text-gray-300"
                    }`}
                    onClick={() => handleTranslate(language)}
                  >
                    <img
                      src={language.flag}
                      alt={`${language.name} flag`}
                      className="w-5 h-5"
                    />
                    <span>{language.name}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="flex items-center">
              <a
                href="https://life-finder.com/clinics/sub/treatments"
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSearch
                  className={`text-2xl transition-colors duration-300 ${
                    isShrinking ? "text-blue-500" : "text-white"
                  }`}
                />
              </a>
            </li>
            <li className="relative flex items-center">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={toggleUserDropdown}
                aria-expanded={isUserDropdownOpen}
                aria-haspopup="true"
              >
                <FaUser
                  className={`text-2xl transition-colors duration-300 ${
                    isShrinking ? "text-blue-500" : "text-white"
                  }`}
                />
              </button>
              <ul
                className={`${
                  isUserDropdownOpen ? "block opacity-100" : "hidden opacity-0"
                } absolute bg-gray-900 shadow-lg rounded-md mt-2 w-48 flex flex-col space-y-2 p-2 transition-all duration-200 ease-in-out top-full right-0 z-20`}
              >
                {userDropdownData.map((item) => (
                  <li
                    key={item.name}
                    className={`text-sm sm:text-base font-bold transition-colors duration-300 ${
                      isShrinking ? "text-blue-500 hover:text-blue-300" : "text-white hover:text-gray-300"
                    }`}
                  >
                    <a
                      href={item.href}
                      className="block"
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setIsUserDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Video Section */}
      <section
        key={resetKey}
        ref={videoSectionRef}
        className={`relative w-full overflow-hidden transition-all duration-300 will-change-transform z-10 bg-black ${
          isScrollLocked
            ? "fixed top-0 left-0 h-screen w-full"
            : "h-48 w-full mx-auto bg-black"
        }`}
        style={{
          transform: isScrollLocked ? `scale(${scale})` : "none",
          transformOrigin: "center center",
        }}
      >
        <video
          ref={videoRef}
          src="/loop.mp4"
          muted
          playsInline
          className={`w-full h-full object-cover ${
            isScrollLocked ? "absolute top-0 left-0" : "relative"
          }`}
        />
      </section>

      {/* Content Section */}
      <div className={isScrollLocked ? "hidden" : "block"}>
        <section
          id="home"
          ref={textSectionRef}
          className="relative z-0 py-12 px-4 md:px-6 min-h-screen bg-cover bg-center flex justify-start items-start"
          style={{
            backgroundImage: 'url("/mybg.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-sm md:max-w-md mx-4 md:ml-56 mt-12 md:mt-24">
            <h2
              className={`text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white mb-3 text-shadow-md border-b-4 border-blue-500 inline-block ${
                animateHeading ? "animate-heading" : ""
              }`}
            >
              Your Health,
              <br />
              Your Power
            </h2>
            <p className="text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-gray-200 mb-6">
              <span className="font-bold">
                The World’s 1st Global Medical Comparator
              </span>
              <br />
              LifeFinder gives you real Insights, real Transparency &
              <br />
              Real Control over your Medical journey.
              <br />
              No Middlemen. Free. Just the Truth.
            </p>
            <div className="mt-4 flex space-x-2 md:space-x-4 items-center flex-wrap md:flex-nowrap">
              <button className="bg-transparent text-white border-2 border-white px-3 py-1 md:px-4 md:py-2 font-semibold rounded-lg shadow-md hover:bg-white hover:text-black text-xs md:text-sm whitespace-nowrap">
                Find your clinic, leave a review, rate your experience
              </button>
              <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 font-semibold rounded-lg shadow-md hover:bg-blue-600 text-xs md:text-sm whitespace-nowrap">
                Start Now
              </button>
            </div>
          </div>
        </section>
        <div>
        <SearchOptions />
        </div>
        <section id="our-vision">
          <About />
          <About2 />
        </section>

        <section id="find">
          <div className="animate-fade-in-up duration-1000">
            <HowItWorks />
          </div>
          <MedicalServicesSection />
        </section>
        <div>
          <Register />
        </div>

        <div>
          <Welcome />
        </div>
        
        <div>
          <TeamSection />
        </div>
      </div>
      <ContactForm />
    </div>
      

  );
};

export default Home2;
