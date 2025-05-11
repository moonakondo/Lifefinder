import { lazy, Suspense, useEffect, useRef } from "react";
import "../Styles/hero.css";
import { Link } from "react-router-dom";
import { Spin } from "antd";
// const hero = lazy(() => import('../assets/hero.mp4'));
// import hero from '../assets/hero.mp4';
import LazyHeroVideo from "./LazyHeroVideo";

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;

      if (video && isVideoInViewport(video)) {
        video.play();
      } else if (video) {
        video.pause();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVideoInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= 0 && rect.bottom <= windowHeight;
  };

  return (
    <div>
      <div
        id="hero_container"
        className="relative w-full h-[40vh] ipp:h-[44vh] 2lg:h-[70vh] md:h-[35vh] flex flex-col justify-center items-center"
      >
        <img
          src="/hero2.jpg"
          loading="lazy"
          className="absolute inset-0 z-0 bg-cover  bg-center"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 bg-black-overlay opacity-100"></div>
        <div className="relative z-10 flex flex-col items-center mt-[5vh]">
          <div data-aos="fade-down" className="flex items-center flex-col">
            <p
              id="txt1"
              className="text-[#00ccff] text-[1.4vw] ipp:text-[2vw] 2lg:text-[1.2vw] md:text-[2vw] font-bold mb-[10px]"
            >
              YOUR LIFEGUARD, YOUR LIFESAVER, YOUR LIFEFINDER
            </p>
            <p
              id="txt2"
              className="text-white text-[2.2vw] ipp:text-[4.2vw] 2lg:text-[2.5vw] sm:text-[3.8vw] font-bold w-[50vw] 2lg:w-[50vw] md:w-[60vw] ipp:w-[70vw] text-center uppercase"
            >
              THE WORLD'S 1<sup className="lowercase">st</sup> Medical Hospital
              COMPARATOR
            </p>
          </div>
          <Link to="/clinics/sub/treatments" data-aos="fade-up">
            <button
              id="compareNow"
              className="border-none bg-clr3 text-[2vw] 2lg:text-[1.4vw] md:text-[3vw] rounded-[6vw] 2lg:rounded-[3vw] text-white font-800 mt-[3vh] p-[1vh] px-[4vh] 2lg:p-[1.4vh] 2lg:px-[3vh] md:p-[1vh] md:px-[2vh] hover:bg-white hover:text-clr3 transition-all duration-300 ease-in-out"
            >
              Compare Now
            </button>
          </Link>
        </div>
      </div>
      <div className="hero-video-container" style={{ minHeight: "30vh" }}>
        <LazyHeroVideo src="hero.mp4" type="video/mp4" />
      </div>
    </div>
  );
}

export default Hero;
