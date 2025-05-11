import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';

const HowItWorks = () => {
  const [containerSize, setContainerSize] = useState(700);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Debounced resize handler for performance
  const handleResize = useCallback(
    debounce(() => {
      const windowWidth = window.innerWidth;
      const newIsMobile = windowWidth <= 640;
      let newContainerSize = windowWidth * 0.8;
      let newScaleFactor = 1;

      if (newIsMobile) {
        newContainerSize = windowWidth * 0.95;
        newScaleFactor = Math.max(windowWidth / 480, 0.4);
      }

      setContainerSize(Math.min(newContainerSize, 800));
      setScaleFactor(newScaleFactor);
      setIsMobile(newIsMobile);
    }, 100),
    []
  );

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel(); // Cancel debounce on cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const containerHeight = rect.height;
    const centerY = containerHeight / 2;
    const normalizedPosition = (mouseY - centerY) / centerY;
    const maxY = 30 * scaleFactor;
    const maxX = 30 * scaleFactor;
    const offsetY = normalizedPosition * maxY;
    const offsetX = -normalizedPosition * maxX;
    setTranslateY(offsetY);
    setTranslateX(offsetX);
  }, [isMobile, scaleFactor]);

  const items = [
    {
      label: 'Nutrition & Weight Management',
      subtitle: 'Clinics for metabolism, food intolerance & weight loss programs.',
      image: '/weight loss.jpg',
      position: { desktop: { x: -450, y: -700 }, mobile: 0 },
      tilt: '-3deg',
      size: { width: 270, height: 210 },
      style: 'perspective(400px) rotateX(15deg) rotateY(25deg) skew(-13deg, 3deg)',
      textTransform: 'rotate(3deg)',
      borderRadius: '10px 25px 25px 35px',
    },
    {
      label: 'Fertility & IVF Clinics',
      subtitle: 'Clinics that prep your body for IVF success — from gut to womb.',
      image: '/fertility.jpg',
      position: { desktop: { x: -90, y: -570 }, mobile: 0 },
      tilt: '0deg',
      size: { width: 64, height: 90 },
      style: 'rotate(10deg) skewY(-5deg)',
      textTransform: 'rotate(0deg)',
      textOffset: 'translateX(-10px)',
    },
    {
      label: 'Dermatology & Aesthetic Skin Clinics',
      subtitle: 'Clinics for personalized skincare, acne, pigmentation & anti-aging.',
      image: '/ii.jpg',
      position: { desktop: { x: 40, y: -730 }, mobile: 0 },
      tilt: '2deg',
      size: { width: 140, height: 160 },
      style: '',
      textTransform: 'rotate(0deg)',
      textOffset: 'translateX(-10px)',
    },
    {
      label: 'Fertility & Endocrinology',
      subtitle: 'Clinics specializing in hormonal health and fertility treatments.',
      image: '/fdd.jpg',
      position: { desktop: { x: 280, y: -700 }, mobile: 0 },
      tilt: '3deg',
      size: { width: 320, height: 210 },
      style: 'perspective(700px) rotateX(10deg) rotateY(-40deg) skew(13deg, -3deg)',
      borderRadius: '25px 10px 35px 25px',
      textTransform: 'rotate(-5deg) translateY(10px)',
      textOffset: 'translateX(80px)',
    },
    {
      label: 'Plastic Surgery Clinics',
      subtitle: 'Clinics using pre/post-op biomarkers for safer aesthetic results.',
      image: '/plasticsurgery2.jpg',
      position: { desktop: { x: -490, y: -350 }, mobile: 0 },
      tilt: '-5deg',
      size: { width: 180, height: 160 },
      style: '',
      textTransform: 'rotate(0deg)',
      textOffset: 'translateX(10px)',
    },
    {
      label: 'Mental Health',
      subtitle: 'Clinics providing therapy and psychiatric care for mental well-being.',
      image: '/mental health.jpg',
      position: { desktop: { x: 473, y: -350 }, mobile: 0 },
      tilt: '-5deg',
      size: { width: 180, height: 160 },
      style: '',
      textTransform: 'rotate(0deg)',
      textOffset: 'translateX(20px)',
    },
    {
      label: 'Skin Non Invasive Treatments',
      subtitle: 'Clinics offering non-surgical skin rejuvenation and treatments.',
      image: '/Cover-Art-Cell-01-Jun-2018-252x300.png',
      position: { desktop: { x: -518, y: -80 }, mobile: 0 },
      tilt: '0deg',
      size: { width: 320, height: 210 },
      style: 'perspective(700px) rotateX(10deg) rotateY(-40deg) skew(13deg, -3deg)',
      borderRadius: '25px 10px 35px 25px',
      textTransform: 'rotate(-5deg) translateY(5px)',
      textOffset: 'translateX(150px)',
    },
    {
      label: 'Oncology Nephrology',
      subtitle: 'Clinics using AI to detect disease early — before symptoms show.',
      image: '/skh.jpg',
      position: { desktop: { x: 168, y: -10 }, mobile: 0 },
      tilt: '5deg',
      size: { width: 60, height: 80 },
      style: 'rotate(8deg)',
      textTransform: 'rotate(0deg)',
      textOffset: 'translateX(-10px)',
    },
    {
      label: 'Cancer Treatments',
      subtitle: 'Clinics using AI for early cancer detection.',
      image: '/fgd.jpg',
      position: { desktop: { x: -26, y: 30 }, mobile: 0 },
      tilt: '2deg',
      size: { width: 140, height: 160 },
      style: '',
      textTransform: 'rotate(0deg)',
    },
    {
      label: 'Plastic Surgery Makeover Clinics',
      subtitle: 'Clinics offering full-body imaging to sculpt the ideal you.',
      image: '/nnn.jpg',
      position: { desktop: { x: 370, y: -80 }, mobile: 0 },
      tilt: '2deg',
      size: { width: 270, height: 210 },
      style: 'perspective(400px) rotateX(15deg) rotateY(25deg) skew(-13deg, 3deg)',
      borderRadius: '10px 25px 25px 35px',
      textTransform: 'rotate(0deg)',
    },
  ];

  const centerBlock = (
    <div
      className="relative z-20 text-center text-white rounded-lg shadow-lg mb-6 md:absolute w-full max-w-[250px] md:max-w-[300px] mx-auto"
      style={{
        top: isMobile ? '0' : '-20px',
        left: isMobile ? undefined : '63%',
        transform: isMobile ? undefined : 'translateX(-50%)',
        padding: `${16 * scaleFactor}px`,
        background: 'linear-gradient(to bottom, #0f172a, #1e3a8a)',
      }}
    >
      {/* Updated icon with a glowing star and proper centering */}
      <div
        className="mb-2 flex justify-center items-center"
        style={{ fontSize: `${36 * scaleFactor}px` }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow effect */}
          <circle cx="18" cy="18" r="18" fill="#FFD700" fillOpacity="0.2" />
          <circle cx="18" cy="18" r="14" fill="#FFD700" fillOpacity="0.3" />
          {/* Star shape with gradient */}
          <path
            d="M18 3L22.5 12.5L32 14L24 21.5L25.5 31L18 26.5L10.5 31L12 21.5L4 14L13.5 12.5L18 3Z"
            fill="url(#starGradient)"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="starGradient" x1="18" y1="3" x2="18" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD700" />
              <stop offset="1" stopColor="#FFA500" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1
        className="font-extrabold mb-1 uppercase text-white underline"
        style={{ fontFamily: 'Uber, sans-serif', fontSize: `${18 * scaleFactor}px` }}
      >
        Search
      </h1>
      <p style={{ fontSize: `${12 * scaleFactor}px` }} className="mb-1">
        Find doctors and treatments
      </p>
      <h1
        className="font-extrabold mb-1 uppercase text-white underline"
        style={{ fontFamily: 'Uber, sans-serif', fontSize: `${18 * scaleFactor}px` }}
      >
        Compare
      </h1>
      <p style={{ fontSize: `${12 * scaleFactor}px` }} className="mb-1">
        See reviews and pricing
      </p>
      <h1
        className="font-extrabold mb-1 uppercase text-white underline"
        style={{ fontFamily: 'Uber, sans-serif', fontSize: `${18 * scaleFactor}px` }}
      >
        Connect
      </h1>
      <p style={{ fontSize: `${12 * scaleFactor}px` }} className="mb-1">
        Book your consultation
      </p>
      <h1
        className="font-extrabold mb-1 uppercase text-white underline"
        style={{ fontFamily: 'Uber, sans-serif', fontSize: `${18 * scaleFactor}px` }}
      >
        Review
      </h1>
      <p style={{ fontSize: `${12 * scaleFactor}px` }} className="mb-2">
        Share your experience
      </p>
      <a href="https://life-finder.com/clinics/sub/treatments">
        <button
          style={{
            padding: `${8 * scaleFactor}px ${16 * scaleFactor}px`,
            fontSize: `${14 * scaleFactor}px`,
          }}
          className="bg-blue-500 text-white rounded-full font-extrabold hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Find your clinic doctor"
        >
          Find Your Clinic Doctor
        </button>
      </a>
    </div>
  );

  const renderItem = (item, index) => {
    const {
      image,
      label,
      size,
      style = '',
      tilt = '0deg',
      textTransform = 'none',
      borderRadius = '12px',
      textOffset = '',
      position,
    } = item;

    const adjustedWidth = isMobile ? 250 * scaleFactor : size.width * scaleFactor;
    const adjustedHeight = isMobile ? 180 * scaleFactor : size.height * scaleFactor;
    const adjustedX = isMobile ? '0' : (position.desktop.x + containerSize / 2) * scaleFactor;
    const adjustedY = isMobile ? '0' : (position.desktop.y + containerSize / 2) * scaleFactor;

    return (
      <motion.div
        key={index}
        className="relative flex flex-col items-center md:items-start w-full max-w-[250px] mx-auto md:absolute"
        style={{
          left: isMobile ? '0' : `${adjustedX}px`,
          top: isMobile ? '0' : `${adjustedY}px`,
          transform: isMobile ? 'none' : `translate(-50%, -50%) rotate(${tilt})`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.06, duration: 0.6 }}
        whileHover={{ scale: isMobile ? 1 : 1.05, transition: { type: 'spring', stiffness: 200 } }}
      >
        <div
          className="overflow-hidden shadow-md"
          style={{
            width: adjustedWidth,
            height: adjustedHeight,
            borderRadius,
            transform: isMobile ? 'none' : style,
            backgroundColor: '#f3f3f3',
          }}
        >
          <img
            src={image}
            alt={label}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.backgroundColor = '#ddd';
            }}
          />
        </div>
        <p
          className="font-medium text-black text-center md:text-left"
          style={{
            marginTop: isMobile ? '8px' : '10px',
            transform: isMobile ? 'none' : `${textTransform} ${textOffset}`,
            fontSize: isMobile ? `${16 * scaleFactor}px` : `${12 * scaleFactor}px`,
            lineHeight: isMobile ? '1.3' : 'normal',
            width: isMobile ? adjustedWidth : 'auto',
          }}
        >
          {label}
        </p>
      </motion.div>
    );
  };

  // Show text section after first 5 items on mobile
  const firstFiveItems = items.slice(0, 5);
  const remainingItems = items.slice(5);

  return (
    <div className="relative w-full h-auto bg-white flex flex-col items-center justify-start mt-[50px]">
      <div
        ref={containerRef}
        className="relative max-sm:flex max-sm:flex-col max-sm:items-center max-sm:mx-auto max-sm:mt-[50px] max-sm:pb-[50px] md:mt-[400px] md:-ml-32"
        style={{
          width: containerSize,
          height: isMobile ? 'auto' : containerSize,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setTranslateY(0);
          setTranslateX(0);
        }}
      >
        <div
          className="relative max-sm:flex max-sm:flex-col max-sm:items-center max-sm:space-y-6"
          style={{
            transform: isMobile ? 'none' : `translate(${translateX}px, ${translateY}px)`,
            transition: 'transform 0.6s ease',
          }}
        >
          {/* Desktop: Render center block first */}
          {!isMobile && centerBlock}

          {/* First 5 items */}
          {firstFiveItems.map((item, index) => renderItem(item, index))}

          {/* Mobile: Render center block after first 5 items */}
          {isMobile && centerBlock}

          {/* Remaining items */}
          {remainingItems.map((item, index) => renderItem(item, index + 5))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;