import React, { useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Terms from "../Components/Terms";
import "../Styles/Home.css";
import {
  Hero,
  About,
  Section1,
  Section2,
  JoinTeam,
  Contact,
  LatestClinics,
  Variety,
  SearchOption,
  PriceSection,
} from "../Sections";
import MapHome from "../Sections/Map";
import SEO from "../Components/Seo";
import HealthcareSection from "../Sections/HealthCare";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const contactRef = useRef(null);

  return (
    <div>
      <SEO
        title="LIFEFINDER - Explore Global Medical Treatments with Our Comprehensive Healthcare Comparison Tool"
        description="Life Finder helps you discover and compare a wide range of medical treatments and services worldwide. Connect with top doctors and healthcare facilities to make informed decisions about your health care needs."
        keywords="global medical treatments, healthcare comparison, find doctors, medical services worldwide, health care options, compare medical prices"
      />
      <Hero />
      <SearchOption />
      <HealthcareSection />
      {/* <LatestClinics /> */}
      <Section1 />
      <Section2 />
      <PriceSection />
      <About />
      <Variety />
      <JoinTeam contactRef={contactRef} />
      <MapHome />
      <div ref={contactRef} className="w-full">
        <Contact />
      </div>
      <Terms />
    </div>
  );
}

export default Home;
