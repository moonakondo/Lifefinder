function Vascular() {
  return (
    <div
      className="oncology-vascular flex flex-col rounded-t-[5rem] bg-cover bg-center pb-[4vh] my-[4rem] mt-[8rem] text-justify"
      style={{ backgroundImage: `url('/oncology-background2.png')` }}
    >
      <div className="absolute inset-0 bg-[#fff] opacity-20"></div>
      <div className="relative z-10 py-[3.5rem]">
        <div className="flex items-center flex-col">
          <div className="w-[90%] ml-[0vh] 2lg:ml-[0vh] md:ml-[1vw]">
            <div className="text-[1.6rem] xxs:text-3xl sm:text-[6vw] md:text-[4.5vw] font-semibold text-center text-clr1 mt-[.7rem] sm:mt-[2rem] mb-[1rem]">
              VASCULAR & CARDIAC SURGERY
            </div>
          </div>{" "}
          
        </div>

        <div className="flex flex-col md:flex-row gap-[2rem] px-[6%] md:px-[5%] pt-[4%] text-[4.5vw] 2xl:text-[1.17vw] base:text-[1.4vw] lg:text-[1.7vw] md:text-[2.1vw] mid:text-[3vw] sm:text-[3.3vw] xxs:text-[3.8vw]">
          <div className="content w-full md:w-[50%] flex flex-col items-center md:items-start">
          <p>
              Cancer, one of the most challenging and prevalent medical
              conditions worldwide, demands our utmost attention and care. In
              2020, an astounding 19.3 million new cancer cases were reported
              globally, and this number is projected to rise significantly in
              the coming years. The battle against cancer continues, and we
              understand the importance of finding the right medical solutions
              when traveling abroad for treatment.
            </p>
            <img
              src="/Section/dna.jpg"
              loading="lazy"
              alt="Vascular Image"
              className="rounded-[2vw] w-[100%] xs:w-[80%] md:w-[40vw] h-fit 2lg:h-[60vh] md:h-[50vh] mt-[1.5rem] 2lg:mt-[5vh] 2xl:mt-[7vh] md:mt-[2vh]"
              />
            {/* <br></br>
            <p className="text-left text-[4vw] 2lg:text-[1.25vw] md:text-[1.6vw]">
              
              <br></br>
            </p> */}
          </div>
          <div className="content w-full md:w-[50%]">
            <p>
            Asia, home to diverse cultures and landscapes, has also witnessed
              an alarming evolution in cancer cases. The region accounted for
              nearly 50% of all new cancer cases reported in 2020.
              This surge in numbers highlights the critical need for accessible and reliable
              medical treatment options in Asia. Unfortunately, approximately
              half of the diagnosed cases in the region led to mortality,
              underscoring the urgency of choosing the best medical facilities
              and services.
            </p>
            <br></br> 
            <p>
              At our Medical Tourism Comparator, we aim to empower patients
              seeking oncology treatments abroad to make informed decisions that
              prioritize safety and well-being. By providing comprehensive
              information and transparent comparisons, we aim to reduce
              potential dangers associated with traveling for medical
              procedures.
            </p>
            {/* <ul className="text-[4vw] 2lg:text-[1.25vw] md:text-[1.6vw] flex flex-col mt-[4vh] space-y-[-.7rem] w-full">
              <li>
                <span className="text-[6vw] md:text-[3vw]">.</span> In 2020,
                lung cancer emerged as the leading cause of cancer-related
                deaths, accounting for 18% of all cancer deaths worldwide.
              </li>
              <li>
                <span className="text-[6vw] md:text-[3vw]">.</span> Prostate
                cancer affected more than 1.4 million men in 2020, making it the
                most prevalent cancer in men.
              </li>
              <li>
                <span className="text-[6vw] md:text-[3vw]">.</span> Colorectal
                cancer ranked third in terms of both new cases and mortality,
                underlining the importance of early detection and advanced
                treatments.
              </li>
              <li>
                <span className="text-[6vw] md:text-[3vw]">.</span> Cervical
                cancer claimed the lives of over 300,000 women in 2020, with the
                majority of fatalities occurring in low- and middle-income
                countries.
              </li>
            </ul> */}
            <ul className="flex flex-col mt-[4vh] space-y-4 w-full pl-[1rem] md:pl-0">
              {[
                "In 2020, lung cancer emerged as the leading cause of cancer-related deaths, accounting for 18% of all cancer deaths worldwide.",
                "Prostate cancer affected more than 1.4 million men in 2020, making it the most prevalent cancer in men.",
                "Colorectal cancer ranked third in terms of both new cases and mortality, underlining the importance of early detection and advanced treatments.",
                "Cervical cancer claimed the lives of over 300,000 women in 2020, with the majority of fatalities occurring in low- and middle-income countries."
              ].map((text, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[6vw] md:text-[3vw] mt-[-.5rem] md:mt-0 mr-2">•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>            
          </div>
        </div>

        <div className="content mt-[2rem] xxs:mt-[4%] px-[6%] text-[4.5vw] 2xl:text-[1.17vw] base:text-[1.4vw] lg:text-[1.7vw] md:text-[2.1vw] mid:text-[3vw] sm:text-[3.3vw] xxs:text-[3.8vw]">
            <p>
              Choosing the right clinic and medical facility can make a
              significant difference in the outcome of cancer treatment. Factors
              like budget constraints or inadequate infrastructure in some
              countries can hinder access to high-quality care. Our platform
              allows you to compare clinics, services, and treatment options,
              empowering you to make decisions that prioritize both your health
              and financial well-being. By utilizing our Medical Tourism
              Comparator for oncology, you can gain access to vital information,
              such as:
              {/* <ul className="text-[4vw] 2lg:text-[1.25vw] md:text-[1.6vw] flex flex-col mt-[4vh] pl-[.4rem] space-y-[-1rem]">
                <li>
                  <span className="text-[6vw] md:text-[3vw]">.</span> Clinic
                  accreditations and certifications, ensuring adherence to
                  international medical standards.
                </li>
                <li>
                  <span className="text-[6vw] md:text-[3vw]">.</span> Doctor
                  qualifications and specialties to find experts in your
                  specific cancer type.
                </li>
                <li>
                  <span className="text-[6vw] md:text-[3vw]">.</span> Success
                  rates and patient testimonials, providing insights into the
                  clinic’s track record.
                </li>
                <li>
                  <span className="text-[6vw] md:text-[3vw]">.</span> Treatment
                  costs and available financing options, helping you plan your
                  medical journey wisely.
                </li>
                <li>
                  <span className="text-[6vw] md:text-[3vw]">.</span> Reviews
                  and ratings from patients who have undergone similar
                  treatments.
                </li>
              </ul> */}
              <ul className="flex flex-col mt-[4vh] pl-[1rem] space-y-4 md:space-y-0 leading-tight">
                {[
                  "Clinic accreditations and certifications, ensuring adherence to international medical standards.",
                  "Doctor qualifications and specialties to find experts in your specific cancer type.",
                  "Success rates and patient testimonials, providing insights into the clinic’s track record.",
                  "Treatment costs and available financing options, helping you plan your medical journey wisely.",
                  "Reviews and ratings from patients who have undergone similar treatments.",
                ].map((text, index) => (
                  <li key={index} className="flex items-center">
                    <div className="text-[6vw] md:text-[3vw] mt-[-.5rem] mr-2">•</div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <br></br>
              At our core, we believe that life should always prevail. Through
              informed decisions and comparisons, we aim to contribute to
              positive treatment outcomes and improved quality of life for
              patients seeking oncology care abroad. Together, let us navigate
              the path to recovery with confidence and hope.
            </p>
          </div>

      </div>
    </div>
  );
}

export default Vascular;
