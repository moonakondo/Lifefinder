import React, { useEffect } from "react";
import Pricing from "../Components/Pricing";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../Components/Seo";

function PricingPage() {
  const location = useLocation();
  const email = location.state?.email;
  const hospitalId = location.state?.hospitalId;
  // useEffect(() => {
  //   if(!email) {
  //     navigate('/');
  //   }
  // }, [])
  // const navigate = useNavigate();
  return (
    <>
      <SEO
        title="Clinic Registration Pricing - Join Our Healthcare Platform"
        description="Explore our competitive pricing plans for clinics. Join our platform to expand your visibility and access state-of-the-art healthcare service features."
        keywords="healthcare platform pricing, clinic registration, healthcare services, medical platform fees, clinic growth opportunities"
      />
      <Pricing email={email} hospitalId={hospitalId} />
    </>
  );
}

export default PricingPage;
