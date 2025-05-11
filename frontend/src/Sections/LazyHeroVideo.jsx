import React, { useRef, useEffect, useState } from 'react';

const LazyVideo = ({ src, type, ...props }) => {
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 } // Adjust the threshold as needed
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div ref={videoRef}>
      {isIntersecting && (
        <video autoPlay muted loop {...props}>
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default LazyVideo;
