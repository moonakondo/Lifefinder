function Wave() {
  return (
    <div className="mt-[10vh] md:mt[5vh] text-justify">
      <h1 className="text-[6vw] md:text-[3vw] text-clr2 font-semibold ml-[2vw] w-[90vw] md:w-[75vw]">
        Medical Tourism vs. Local Cancer Care
        <span className="block md:text-[2vw] text-[4.5vw]">
          A Comparative Study
        </span>
      </h1>
      {/* <p className="text-black text-[3.4vw] 2lg:text-[1.2vw] md:text-[1.8vw] ml-[2vw] w-[75vw]">
            Medical tourism involves seeking treatment abroad for specialized care, but can strain local health systems. This study compared factors influencing cancer treatment choice.
            </p> */}

      <div className="bg-clr2 mt-[2rem] py-[4vh] 2lg:py-[8vh] 2xl:text-[1.17vw] base:text-[1.4vw] lg:text-[1.7vw] md:text-[2.1vw] mid:text-[3vw] sm:text-[3.3vw] xxs:text-[3.8vw] text-[4.5vw] text-white">
        <p className="ml-[3vw] italic">
          <b>Methods:</b>
          &nbsp;254 cancer patients were sampled from the Ministry of Health and
          two hospitals. Data was analyzed using SPSS.
        </p>
        <br />
        <p className="ml-[3vw] italic">
          <b>Results:</b>
          &nbsp;69.5% received treatment in Kenya, 31.5% in India. Cost was a
          major factor. Predictors for India treatment included higher income,
          time since disclosure, physician advice, influence of friends and
          family, and perception of better care.
        </p>
        <br />
        <p className="ml-[3vw] italic">
          <b>Conclusion:</b>
          &nbsp;Patients choose India for cost and quality reasons. Addressing
          these factors could improve local cancer healthcare.
        </p>
      </div>
    </div>
  );
}

export default Wave;
