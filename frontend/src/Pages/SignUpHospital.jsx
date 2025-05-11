import React from "react";
import SignUpHospital from "../Components/Auth/Hospital/Signup";
import SEO from "../Components/Seo";

function SignUpHospitalPage() {
  return (
    <>
      <SEO
        title="Register Your Clinics or Clinic on Life Finder"
        description="Join Life Finder and expand your hospital or clinic's reach. Register today to connect with more patients and enhance your healthcare services through our digital platform."
        keywords="hospital registration, clinic registration, Life Finder platform, healthcare provider sign up, connect with patients"
      />
      <SignUpHospital />
    </>
  );
}

export default SignUpHospitalPage;
