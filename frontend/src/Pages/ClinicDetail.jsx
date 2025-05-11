import React from "react";
import { useParams } from "react-router-dom";
import ClinicDetail from "../Components/Clinic/ClinicDetail";
import SEO from "../Components/Seo";

function ClinicDetailPage() {
  const params = useParams();
  return (
    <>
      <SEO
        title="Explore Detailed Clinic Information - LifeFinder"
        description="Learn more about our partnered clinics. Detailed profiles, services offered, and patient reviews to help you make informed healthcare decisions."
        keywords="Clinic Details, Healthcare Services, Clinic Reviews, Patient Information, Medical Clinic Profiles"
      />
      <ClinicDetail id={params.id} />;
    </>
  );
}

export default ClinicDetailPage;
