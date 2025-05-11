import { Link, useNavigate } from "react-router-dom";

function EncologyHero() {
  const navigate = useNavigate();

  const onSearch = (event) => {
    event.preventDefault();
    if (true) {
      const searchCriteria = {
        allCategeoriesFilter: "Oncologist",
      };
      console.log("🚀 ~ onSearch ~ searchCriteria:", searchCriteria);
      navigate("/clinics/sub/treatments", { state: searchCriteria });
    }
  };
  return (
    <div className="flex flex-col justify-center w-[98vw] items-center mt-[1.5rem] mb-[2vh] text-justify">
      <div className="flex flex-col md:flex-row p-[2vh] md:p-[5vh]">
        <div className="flex flex-col justify-start gap-[2rem]">
          <p className="text-[10vw] 2lg:text-[6vw] md:text-[8vw] text-clr2">
            Oncology Treatement
          </p>
          <p className="2xl:text-[1.17vw] base:text-[1.4vw] lg:text-[1.7vw] md:text-[2.1vw] mid:text-[3vw] sm:text-[3.3vw] xxs:text-[3.8vw] text-[4.5vw] w-[90vw] 2lg:w-[40vw] md:w-[46vw]">
            A cancer diagnosis can be a traumatic experience for anyone, but it
            doesn’t have to be a death sentence. Recent advances in medical
            technology have allowed for many types of cancer to be reduced or
            eliminated entirely. But the cutting edge of medical treatment is
            not always available to everyone because of necessary bureaucratic
            approvals that need to be obtained before a treatment can be
            performed beyond the experimental stage. Oncology tourism or cancer
            treatment tourism has become a very popular choice for many cancer
            sufferers as it offers them treatment options that may not yet be
            available or legal in their home country.
          </p>
          <div className="md:hidden flex justify-center">
            <img
              src="/Section/encology1.jpg"
              loading="lazy"
              alt="Hospital Image"
              className="w-[88vw] md:w-[28vw] lg:w-[24vw] h-[44vh] 2lg:h-[32vh] md:h-[27vh] lg:h-[35vh] md:ml-[2vw] rounded-[10vw] object-cover shadow-xl"
            />
          </div>
          <button
            // onClick={() => navigate("/clinics")}
            onClick={onSearch}
            className="relative text-white bg-clr3 text-[6vw] 2lg:text-[1.6vw] md:text-[2vw] font-bold p-[0.6vw] md:ml-[0vw] rounded-[5vw] w-[88vw] 2lg:w-[16vw] md:w-[45vw] mt-[0.5rem] border-[0.16vw] border-clr3 hover:bg-white hover:text-clr3 transition-all duration-300 ease-in-out"
          >
            Compare Now
          </button>
        </div>
        {/* <div className="flex flex-col ml-[4vw] md:mt-[-10vh]"> */}
        <div className="flex flex-col ml-[4vw] justify-center md:mt-[-3rem]">
          <img
            src="/Section/encology1.jpg"
            loading="lazy"
            alt="Hospital Image"
            className="w-[88vw] md:w-[28vw] lg:w-[20vw] aspect-[1] md:ml-[2vw] mt-[15vh] 2lg:mt-[5vh] md:mt-[2vh] rounded-[10vw] object-cover shadow-xl hidden md:block"
          />
          <img
            src="/Section/encology2.jpg"
            loading="lazy"
            alt="Hospital Image"
            className="w-[88vw] md:w-[24vw] lg:w-[16vw] aspect-[1] ml-[-10vw] mt-[3vh] 2lg:mt-[-6vh] md:mt-[2vh] rounded-[10vw] shadow-xl object-cover hidden md:block"
          />
          <img
            src="/Section/encology3.jpg"
            loading="lazy"
            alt="Hospital Image"
            className="w-[88vw] md:w-[20vw] aspect-[1] ml-[2vw] mt-[3vh] 2lg:mt-[-6vh] md:mt-[2vh] rounded-[10vw] shadow-xl hidden object-cover md:block"
          />
        </div>
      </div>
    </div>
  );
}

export default EncologyHero;
