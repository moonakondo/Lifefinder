import { useNavigate } from "react-router-dom";
import CategoryDisplay from "./Card";
import MapHome from "../../Sections/Map";
import Fact2 from "../PlasticSurgery/Fact3";

const Clinic = () => {
  const navigate = useNavigate();
  const showAllClinics = () => {
    navigate("/clinics/sub/treatments");
  };
  return (
    <>
      <section className="mx-auto pt-[30px] w-full  container">
        <div className="flex justify-center items-center flex-row  text-center w-full">
          <h1 className="text-center font-semibold text-4xl text-gray-700">
            Medical Treatments Clinics
          </h1>
        </div>
        <CategoryDisplay i18nIsDynamicList key={"hello"} />
        <div className="mt-auto flex justify-center items-center mb-[20px]">
          <button
            type="button"
            onClick={showAllClinics}
            className="px-[50px] gap-x-5 bg-clr1 hover:bg-transparent text-lg py-2 text-white font-semibold rounded-xl hover:text-clr1 border-2 border-clr1 transition-all duration-300 ease-in-out"
          >
            View All Clinics
          </button>
        </div>
        <MapHome />
      </section>
      <div className="max-auto w-[100vw]">
        <Fact2/>
      </div>
    </>
  );
};

export default Clinic;
