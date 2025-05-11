import React from "react";
import PlasticBanner from "./Banner";
import PlasticSurgeryCarousel from "./Carousel";
import Fact1 from "./Fact1";
import Fact3 from "./Fact3";
// import OnCloggy from "./Onclogy";
// import CancerCounting from "./CancerCountUp";
import SurrogacyCollapse from "./Faqs";
import Fact2 from "./Fact2";
import { Korean } from "../../Sections";
import './index.css';

function PlasticSurgery() {
  return (
    <>
      <PlasticBanner />
      <PlasticSurgeryCarousel />
      <Fact2 />
      <Fact1 />
      <Korean />
      <Fact3 />
      <SurrogacyCollapse />
    </>
  );
}

export default PlasticSurgery;
