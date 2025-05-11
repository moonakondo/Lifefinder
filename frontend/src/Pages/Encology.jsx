import {
  EncologyHero,
  Vascular,
  EncologyStats,
  CancerTable,
  Treatments,
  Korean,
  Wave,
  Contact,
  Article3Oncology,
} from "../Sections";
import CancerCounting from "../Components/PlasticSurgery/CancerCountUp";
import Oncology from "../Components/PlasticSurgery/Onclogy";
import SEO from "../Components/Seo";
import OncologyHeroSection from "../Sections/OncologyHealthCare";

function Encology() {
  return (
    <div>
      <SEO
        title="Oncology Services - Comprehensive Cancer Care and Treatment"
        description="Explore our advanced oncology services designed to provide comprehensive cancer care. Learn about our latest cancer treatments and supportive care programs tailored to meet individual needs."
        keywords="Oncology, Cancer Care, Cancer Treatments, Comprehensive Cancer Services, Advanced Oncology Care, Cancer Support"
      />
      <EncologyHero />
      <Article3Oncology />
      <CancerCounting />
      <Vascular />
      <EncologyStats />
      <CancerTable />
      <Wave />
      <OncologyHeroSection />
      <Treatments />
      <Oncology />
      {/* <Contact/> */}
    </div>
  );
}

export default Encology;
