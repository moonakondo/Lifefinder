import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../Styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import SEO from "../Components/Seo";
import Article3 from "../Components/About/Article3";

function AboutUs() {
  const navigate = useNavigate();
  const { ref: numberRef1, inView: numberInView1 } = useInView({
    triggerOnce: true,
  });
  const { ref: numberRef2, inView: numberInView2 } = useInView({
    triggerOnce: true,
  });
  const { ref: numberRef3, inView: numberInView3 } = useInView({
    triggerOnce: true,
  });
  useEffect(() => {
    AOS.refresh(); // Refresh AOS if needed
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // return (
  //   <div
  //     id="aboutus"
  //     className="flex flex-col justify-center w-[100%] items-center 2lg:mt-[10vh] mt-[5vh] mb-[6vh]"
  //   >
  //     <SEO
  //       title={"About LifeFinder - Empowering Global Healthcare Choices"}
  //       description={
  //         "Discover how LifeFinder revolutionizes healthcare by connecting patients with top-tier medical facilities worldwide. Learn about our mission to empower patients with accessible, affordable, and quality medical care options."
  //       }
  //       keywords={
  //         "LifeFinder, Healthcare, Medical Tourism, Affordable Healthcare, Global Health Services, Medical Treatment Abroad, Healthcare Crisis Solutions"
  //       }
  //     />
  //     <p
  //       ref={numberRef1}
  //       className="text-clr1 text-[12vw] 2lg:text-[5vw] md:text-[7vw] font-bold"
  //     >
  //       {numberInView1 ? <CountUp start={0} end={6000} duration={3} /> : "0"}
  //     </p>
  //     <p className="text-clr3 text-base sm:text-[3vw] 2lg:text-[1.4vw] md:text-[1.8vw]">
  //       REVIEWED CLINICS ON LIFEFINDER
  //     </p>
  //     <p className="text-clr1 text-[7vw] md:text-[5vw] font-bold mt-[5vh] 2lg:mt-[5vh] md:mt-[2vh] mb-[4vh]">
  //       MEDICAL TOURISM
  //     </p>
  //     <div className="flex md:flex-row flex-col justify-around gap-[14vw] container">
  //       <div className="border border-blue-500 p-[4vh] 2lg:p-[4vh] md:p-[2vh] w-[100%]  bg-white shadow-xl md:w-[35vw] flex justify-center flex-col items-center gap-[1.5vh] md:gap-[3vh]">
  //         <p
  //           ref={numberRef3}
  //           className="text-[gray] text-3xl sm:text-[6vw] md:text-[3.6vw]"
  //         >
  //           {numberInView3 ? (
  //             <CountUp start={0} end={1903063} duration={3} />
  //           ) : (
  //             "0"
  //           )}
  //         </p>
  //         <p className="text-clr2 text-lg sm:text-[3vw] 2lg:text-[2vw] md:text-[3vw] font-semibold">
  //           LIPOSUCTION
  //         </p>
  //         <p className="text-base sm:text-[3vw] 2lg:text-[1.2vw] md:text-[1.6vw] text-[#a0a0a0] text-justify">
  //           Procedures in the World in 2021 +24% procedures since 2020 according
  //           to ISAPS international survey.
  //         </p>
  //       </div>
  //       <div className="border border-blue-500 bg-white shadow-xl p-[4vh] 2lg:p-[4vh] md:p-[2vh] w-[100%] md:w-[35vw] flex justify-center flex-col items-center gap-[1.5vh] md:gap-[3vh]">
  //         <p
  //           ref={numberRef3}
  //           className="text-[gray] text-3xl sm:text-[6vw] md:text-[3.6vw]"
  //         >
  //           {numberInView3 ? (
  //             <CountUp start={0} end={30439576} duration={3} />
  //           ) : (
  //             "0"
  //           )}
  //         </p>
  //         <p className="text-clr2 text-base sm:text-[3vw] 2lg:text-[2vw] md:text-[3vw] font-semibold">
  //           PLASTIC SURGERY
  //         </p>
  //         <p className="text-base sm:text-[3vw] 2lg:text-[1.2vw] md:text-[1.6vw] text-[#a0a0a0]">
  //           Total Procedures performed WORLDWIDE in 2021
  //         </p>
  //       </div>
  //     </div>

  //     <div className="mt-[7rem] py-10 bg-white shadow-xl border-[1px] border-gray-300 flex flex-col justify-center w-[100vw] px-[1.25rem] xxs:px-[1.5rem] xs:px-[40px] container rounded-xl ">
  //       <section className="mb-6 text-center">
  //         <h1 className="text-5xl font-bold text-clr1 mb-3">About Us</h1>
  //         <p className="text-[1.3rem] xxs:text-2xl sm:text-4xl font-medium text-gray-600 plastic-heading mb-[20px]">
  //           The Healthcare Crisis: Why LifeFinder Was Born
  //         </p>
  //         <div className="flex flex-col lg:flex-row gap-x-10">
  //           <div className="w-full flex justify-center items-center lg:w-1/2">
  //             <img
  //               src="/about-2.jpeg"
  //               alt="About Us"
  //               className="rounded-xl object-cover object-top h-[50vh] w-[50vh] 2lg:w-full 2lg:h-[70vh] 2xl:h-[60vh]"
  //             />
  //           </div>
  //           <div className=" w-[100%] 2lg:w-[55%] md:mt-[0px]2lg:mt-0 mt-[25px] text-base xs:text-lg">
  //             <p className="text-clr1 mb-5 font-medium  text-justify ">
  //               Healthcare in Europe and the USA is in a state of crisis.
  //               Despite the advances in medical technology and treatment, access
  //               to quality healthcare remains uneven, costly, and increasingly
  //               frustrating for patients. The reality is stark: long waiting
  //               times, skyrocketing costs, and a labyrinth of bureaucracy are
  //               leaving millions without the care they need.
  //             </p>
  //             <p className="text-clr1 mb-5 font-medium  text-justify ">
  //               In Europe, healthcare systems are buckling under the weight of
  //               demand. Patients often face monthslong waits for essential
  //               treatments. According to the European Health Consumer Index,
  //               many European countries are struggling to meet the growing needs
  //               of their populations. The situation is even worse for
  //               specialized care—long queues for surgeries, delays in
  //               diagnostics, and an overburdened workforce have become the norm
  //               rather than the exception.
  //             </p>
  //             <p className="text-gray-700 mb-5 font-medium text-justify ">
  //               LifeFinder is on a mission to empower patients, putting the
  //               control back into their hands. We connect patients with top-tier
  //               medical facilities worldwide, providing transparent, reliable
  //               information on treatments, costs, and outcomes. In a world where
  //               healthcare is increasingly inaccessible, LifeFinder is here to
  //               break down barriers and ensure that every patient, no matter
  //               their location, can access the care they deserve.
  //             </p>
  //           </div>
  //         </div>
  //       </section>

  //       <section className="mb-10 text-base xs:text-lg">
  //         <p className="text-gray-700 mb-5 font-medium  text-justify ">
  //           The United States, despite having some of the best medical
  //           facilities in the world, is plagued by its own set of problems.
  //           Healthcare costs have risen to unsustainable levels, with the
  //           average American spending more on healthcare than any other country,
  //           yet not necessarily getting better outcomes. The Commonwealth Fund
  //           reports that about 25% of Americans struggle to pay their medical
  //           bills, and nearly 10% have delayed or gone without care due to cost
  //           concerns.
  //         </p>
  //         <p className="text-gray-700 mb-5 font-medium  text-justify ">
  //           These issues are driving more and more patients to seek medical care
  //           abroad—a trend known as medical tourism. But this isn’t just about
  //           cosmetic procedures anymore. Patients are traveling for everything
  //           from life-saving surgeries to critical diagnostic tests, often at a
  //           fraction of the cost they would incur at home. However, navigating
  //           foreign healthcare systems, finding trustworthy providers, and
  //           ensuring the quality of care are significant challenges.
  //         </p>
  //         <p className="text-gray-700 mb-5 font-medium  text-justify ">
  //           This is where LifeFinder comes in. Born out of the need to address
  //           these global healthcare challenges, LifeFinder is on a mission to
  //           empower patients, putting the control back into their hands. With
  //           our platform, we connect patients with top-tier medical facilities
  //           worldwide, providing transparent, reliable information on
  //           treatments, costs, and outcomes. We're not just helping patients
  //           find solutions—we're giving them the power to make informed
  //           decisions about their health, no matter where they are in the
  //           world..
  //         </p>
  //         <p className="text-gray-700  font-medium text-justify ">
  //           In a world where healthcare is increasingly inaccessible, LifeFinder
  //           is here to break down barriers, eliminate uncertainties, and ensure
  //           that every patient, no matter their location, can access the care
  //           they deserve.
  //         </p>
  //       </section>

  //       <section className="rounded-lg mb-10 text-base xs:text-lg">
  //         <h3 className="text-2xl font-semibold plastic-heading">
  //           Welcome to the most disruptive team you've never met
  //         </h3>

  //         <p className="text-gray-700  mb-5 font-medium  text-justify ">
  //           We’re not your typical crew of buttoned-up, suit-wearing corporate
  //           clones. In fact, we’re the exact opposite. We’re the ones flipping
  //           the board games, breaking the monopolies, and rewriting the rules of
  //           the industry. While the big guys are busy guarding their ivory
  //           towers, we’re out here with a sledgehammer, knocking down walls and
  //           opening doors. Because why settle for the status quo when you can
  //           obliterate it?
  //         </p>
  //         <div className="bg-clr1 text-white p-5 rounded-xl">
  //           <h2 className="text-4xl font-bold mb-3 plastic-heading">
  //             Our Vision
  //           </h2>
  //           <p className="  mb-5 font-medium  text-justify">
  //             We see a world where the little guy doesn’t just have a seat at
  //             the table—they’re running the show. We're here to level the
  //             playing field, one game-changing innovation at a time. With a
  //             blend of razor-sharp wit, unyielding passion, and a bit of
  //             sarcastic charm, we’re taking on the giants and turning the tables
  //             on everything they thought they knew
  //           </p>
  //         </div>
  //       </section>

  //       <section className="mb-5 text-base xs:text-lg">
  //         <h2 className="text-4xl font-bold text-blue-800 mb-3 plastic-heading">
  //           Meet the Team
  //         </h2>
  //         <p className="text-gray-700 font-medium  text-justify">
  //           Our team is a carefully curated blend of misfits, rebels, and
  //           geniuses. Each of us brings a unique superpower to the mix, whether
  //           it’s coding circles around the competition, dreaming up ideas that
  //           shouldn’t even be possible, or just being annoyingly good at
  //           everything. We’re the behindthe-scenes magicians making the
  //           impossible look easy, with a healthy dose of sarcasm and a lot of
  //           late nights fueled by caffeine and pure determination.
  //         </p>
  //       </section>

  //       <section className="flex flex-col">
  //         <h2 className="font-medium plastic-heading">
  //           Together, we’re not just a team—we’re a movement.
  //         </h2>
  //         <p className=" text-gray-700 mb-5 font-medium  text-justify">
  //           We’re here to disrupt, to innovate, and to ensure that the future
  //           isn’t controlled by the same old power players. So, if you’re tired
  //           of the same old narrative, welcome aboard. It’s time to shake things
  //           up.
  //         </p>
  //       </section>
  //       <div className="mt-9 lg:mb-0 mb-[20px] z-10">
  //         <a
  //           href="https://hbr.org/2024/08/patients-need-a-system-to-compare-healthcare-quality-not-just-prices"
  //           target="_blank"
  //           className="px-5 md:px-[4vw] bg-clr3 hover:bg-transparent text-white font-semibold text-base md:text-lg py-[14px] rounded-[5vw] hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
  //         >
  //           Learn More
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );


  return (
    <div
      id="aboutus"
      className="flex flex-col justify-center w-[100%] items-center 2lg:mt-[10vh] mt-[5vh] mb-[6vh]"
    >
      <SEO
        title={"About LifeFinder - Empowering Global Healthcare Choices"}
        description={
          "Discover how LifeFinder revolutionizes healthcare by connecting patients with top-tier medical facilities worldwide. Learn about our mission to empower patients with accessible, affordable, and quality medical care options."
        }
        keywords={
          "LifeFinder, Healthcare, Medical Tourism, Affordable Healthcare, Global Health Services, Medical Treatment Abroad, Healthcare Crisis Solutions"
        }
      />
      <p
        ref={numberRef1}
        className="text-clr1 text-[12vw] 2lg:text-[5vw] md:text-[7vw] font-bold"
      >
        {numberInView1 ? <CountUp start={0} end={6000} duration={3} /> : "0"}
      </p>
      <p className="text-clr3 text-base sm:text-[3vw] 2lg:text-[1.4vw] md:text-[1.8vw]">
        REVIEWED CLINICS ON LIFEFINDER
      </p>
      <p className="text-clr1 text-[7vw] md:text-[5vw] font-bold mt-[5vh] 2lg:mt-[5vh] md:mt-[2vh] mb-[4vh]">
        MEDICAL TOURISMmm
      </p>
      <div className="flex md:flex-row flex-col justify-around gap-[14vw] container">
        <div className="border border-blue-500 p-[4vh] 2lg:p-[4vh] md:p-[2vh] w-[100%] bg-white shadow-xl md:w-[35vw] flex justify-center flex-col items-center gap-[1.5vh] md:gap-[3vh]">
          <p
            ref={numberRef3}
            className="text-[gray] text-3xl sm:text-[6vw] md:text-[3.6vw]"
          >
            {numberInView3 ? (
              <CountUp start={0} end={1903063} duration={3} />
            ) : (
              "0"
            )}
          </p>
          <p className="text-clr2 text-lg sm:text-[3vw] 2lg:text-[2vw] md:text-[3vw] font-semibold">
            LIPOSUCTION
          </p>
          <p className="text-[3vw] 2lg:text-[1.2vw] md:text-[1.6vw] text-[#a0a0a0] relative z-10 text-center">
            Procedures around the world totaled 2.2 million in 2023, according
            to an international survey by ISAPS.
          </p>
        </div>
        <div className="border border-blue-500 bg-white shadow-xl p-[4vh] 2lg:p-[4vh] md:p-[2vh] w-[100%] md:w-[35vw] flex justify-center flex-col items-center gap-[1.5vh] md:gap-[3vh]">
          <p
            ref={numberRef3}
            className="text-[gray] text-3xl sm:text-[6vw] md:text-[3.6vw]"
          >
            {numberInView3 ? (
              <CountUp start={0} end={30439576} duration={3} />
            ) : (
              "0"
            )}
          </p>
          <p className="text-clr2 text-base sm:text-[3vw] 2lg:text-[2vw] md:text-[3vw] font-semibold">
            PLASTIC SURGERY
          </p>
          <p className="text-base sm:text-[3vw] 2lg:text-[1.2vw] md:text-[1.6vw] text-[#a0a0a0]">
            Total Procedures performed WORLDWIDE in 2021
          </p>
        </div>
      </div>
  
      <div className="mt-[7rem] py-10 bg-white shadow-xl border-[1px] border-gray-300 flex flex-col justify-center w-[100vw] px-[1.25rem] xxs:px-[1.5rem] xs:px-[40px] container rounded-xl ">
        <section className="mb-6 text-center">
          <h1 className="text-5xl font-bold text-clr1 mb-3">About Us</h1>
          <p className="text-[1.3rem] xxs:text-2xl sm:text-4xl font-medium text-gray-600 plastic-heading mb-[20px]">
            The Healthcare Crisis: Why LifeFinder Was Born
          </p>
          <div className="flex flex-col lg:flex-row gap-x-10">
            <div className="w-full flex justify-center items-center lg:w-1/2">
              <img
                src="/about-2.jpeg"
                alt="About Us"
                className="rounded-xl object-cover object-top h-[50vh] w-[50vh] 2lg:w-full 2lg:h-[70vh] 2xl:h-[60vh]"
              />
            </div>
            <div className=" w-[100%] 2lg:w-[55%] md:mt-[0px]2lg:mt-0 mt-[25px] text-base xs:text-lg">
              <p className="text-clr1 mb-5 font-medium  text-justify ">
                Healthcare in Europe and the USA is in a state of crisis.
                Despite the advances in medical technology and treatment, access
                to quality healthcare remains uneven, costly, and increasingly
                frustrating for patients. The reality is stark: long waiting
                times, skyrocketing costs, and a labyrinth of bureaucracy are
                leaving millions without the care they need.
              </p>
              <p className="text-clr1 mb-5 font-medium  text-justify ">
                In Europe, healthcare systems are buckling under the weight of
                demand. Patients often face monthslong waits for essential
                treatments. According to the European Health Consumer Index,
                many European countries are struggling to meet the growing needs
                of their populations. The situation is even worse for
                specialized care—long queues for surgeries, delays in
                diagnostics, and an overburdened workforce have become the norm
                rather than the exception.
              </p>
              <p className="text-gray-700 mb-5 font-medium text-justify ">
                LifeFinder is on a mission to empower patients, putting the
                control back into their hands. We connect patients with top-tier
                medical facilities worldwide, providing transparent, reliable
                information on treatments, costs, and outcomes. In a world where
                healthcare is increasingly inaccessible, LifeFinder is here to
                break down barriers and ensure that every patient, no matter
                their location, can access the care they deserve.
              </p>
            </div>
          </div>
        </section>
  
        <section className="mb-10 text-base xs:text-lg">
          <p className="text-gray-700 mb-5 font-medium  text-justify ">
            The United States, despite having some of the best medical
            facilities in the world, is plagued by its own set of problems.
            Healthcare costs have risen to unsustainable levels, with the
            average American spending more on healthcare than any other country,
            yet not necessarily getting better outcomes. The Commonwealth Fund
            reports that about 25% of Americans struggle to pay their medical
            bills, and nearly 10% have delayed or gone without care due to cost
            concerns.
          </p>
          <p className="text-gray-700 mb-5 font-medium  text-justify ">
            These issues are driving more and more patients to seek medical care
            abroad—a trend known as medical tourism. But this isn’t just about
            cosmetic procedures anymore. Patients are traveling for everything
            from life-saving surgeries to critical diagnostic tests, often at a
            fraction of the cost they would incur at home. However, navigating
            foreign healthcare systems, finding trustworthy providers, and
            ensuring the quality of care are significant challenges.
          </p>
          <p className="text-gray-700 mb-5 font-medium  text-justify ">
            This is where LifeFinder comes in. Born out of the need to address
            these global healthcare challenges, LifeFinder is on a mission to
            empower patients, putting the control back into their hands. With
            our platform, we connect patients with top-tier medical facilities
            worldwide, providing transparent, reliable information on
            treatments, costs, and outcomes. We're not just helping patients
            find solutions—we're giving them the power to make informed
            decisions about their health, no matter where they are in the
            world..
          </p>
          <p className="text-gray-700  font-medium text-justify ">
            In a world where healthcare is increasingly inaccessible, LifeFinder
            is here to break down barriers, eliminate uncertainties, and ensure
            that every patient, no matter their location, can access the care
            they deserve.
          </p>
        </section>
  
        <section className="rounded-lg mb-10 text-base xs:text-lg">
          <h3 className="text-2xl font-semibold plastic-heading">
            Welcome to the most disruptive team you've never met
          </h3>
  
          <p className="text-gray-700  mb-5 font-medium  text-justify ">
            We’re not your typical crew of buttoned-up, suit-wearing corporate
            clones. In fact, we’re the exact opposite. We’re the ones flipping
            the board games, breaking the monopolies, and rewriting the rules of
            the industry. While the big guys are busy guarding their ivory
            towers, we’re out here with a sledgehammer, knocking down walls and
            opening doors. Because why settle for the status quo when you can
            obliterate it?
          </p>
          <div className="bg-clr1 text-white p-5 rounded-xl">
            <h2 className="text-4xl font-bold mb-3 plastic-heading">
              Our Vision
            </h2>
            <p className="  mb-5 font-medium  text-justify">
              We see a world where the little guy doesn’t just have a seat at
              the table—they’re running the show. We're here to level the
              playing field, one game-changing innovation at a time. With a
              blend of razor-sharp wit, unyielding passion, and a bit of
              sarcastic charm, we’re taking on the giants and turning the tables
              on everything they thought they knew
            </p>
          </div>
        </section>
  
        <section className="mb-5 text-base xs:text-lg">
          <h2 className="text-4xl font-bold text-blue-800 mb-3 plastic-heading">
            Meet the Team
          </h2>
          <p className="text-gray-700 font-medium  text-justify">
            Our team is a carefully curated blend of misfits, rebels, and
            geniuses. Each of us brings a unique superpower to the mix, whether
            it’s coding circles around the competition, dreaming up ideas that
            shouldn’t even be possible, or just being annoyingly good at
            everything. We’re the behindthe-scenes magicians making the
            impossible look easy, with a healthy dose of sarcasm and a lot of
            late nights fueled by caffeine and pure determination.
          </p>
        </section>
  
        <section className="flex flex-col">
          <h2 className="font-medium plastic-heading">
            Together, we’re not just a team—we’re a movement.
          </h2>
          <p className=" text-gray-700 mb-5 font-medium  text-justify">
            We’re here to disrupt, to innovate, and to ensure that the future
            isn’t controlled by the same old power players. So, if you’re tired
            of the same old narrative, welcome aboard. It’s time to shake things
            up.
          </p>
        </section>
        <div className="mt-9 lg:mb-0 mb-[20px] z-10">
          <a
            href="https://hbr.org/2024/08/patients-need-a-system-to-compare-healthcare-quality-not-just-prices"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 md:px-[4vw] bg-clr3 hover:bg-transparent text-white font-semibold text-base md:text-lg py-[14px] rounded-[5vw] hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
          >
            Learn More
          </a>
        </div>
      </div>
  
      {/* New Article Section */}
      <div className="mt-[7rem] py-[4rem] bg-white shadow-xl border-[1px] border-gray-300 flex flex-col justify-center w-[100vw] px-[1.25rem] xxs:px-[1.5rem] xs:px-[40px] container rounded-xl">
        <section className="mb-6 text-center">
          <h2 className="text-[1.7rem] xs:text-4xl sm:text-5xl font-bold text-clr1 mb-3 m-[-.5rem]">
            The Future of Healthcare: Predicting Tumors and Identifying Cancer Cells with AI & Digital Twins
          </h2>
          {/* <p className="text-gray-700 font-medium text-justify">
            Artificial Intelligence (AI) is set to revolutionize healthcare, and its capabilities in oncology are particularly groundbreaking. By combining AI with digital twin technology, we are entering an era where predicting tumors and identifying cancer cells becomes not only faster but more accurate, ultimately saving lives through early intervention and precision medicine.
          </p> */}
        </section>
  
        <section className="mb-6 flex lg:flex-row flex-col lg:gap-[2.5rem] gap-[1rem] py-[1rem]">
          <div className="left lg:w-1/2 w-full">
          <p className="text-gray-700 font-medium text-justify mb-5">
            Artificial Intelligence (AI) is set to revolutionize healthcare, and its capabilities in oncology are particularly groundbreaking. By combining AI with digital twin technology, we are entering an era where predicting tumors and identifying cancer cells becomes not only faster but more accurate, ultimately saving lives through early intervention and precision medicine.
          </p>
            <h3 className="text-3xl font-semibold text-clr1 mb-3">
              The Power of AI in Cancer Detection
            </h3>
            <p className="text-gray-700 font-medium text-justify mb-5">
              AI has already proven to be highly effective at detecting cancer, often outperforming human experts in analyzing medical imaging. By training algorithms on vast datasets—sometimes over 1 billion images of various cancers—AI systems can recognize subtle patterns in tissue samples, CT scans, MRIs, and X-rays that human eyes might miss. This capability translates into faster diagnoses, fewer false positives, and a much higher chance of catching tumors at earlier, more treatable stages.
            </p>
            {!isMobile && <>
              <h4 className="text-2xl font-semibold text-clr2 mb-2">
                Example: Skin Cancer Detection
              </h4>
              <p className="text-gray-700 font-medium text-justify">
                A study by Stanford University showed that AI, using deep learning, was able to match the performance of dermatologists in identifying skin cancer lesions. By continuously learning from an expanding dataset, AI systems grow even more reliable and precise with time.
              </p>
            </>
            }
          </div>
          <img src="/assests/oncology.jfif" alt="" className="rounded-2xl lg:w-1/2 w-full object-cover" />
        </section>
  
        <section className="mb-6">
          {isMobile && <>
              <h4 className="text-2xl font-semibold text-clr2 mb-2">
                Example: Skin Cancer Detection
              </h4>
              <p className="text-gray-700 font-medium text-justify mb-6">
                A study by Stanford University showed that AI, using deep learning, was able to match the performance of dermatologists in identifying skin cancer lesions. By continuously learning from an expanding dataset, AI systems grow even more reliable and precise with time.
              </p>
            </>
          }
          <h3 className="text-3xl font-semibold text-clr1 mb-3">
            Predicting Tumors: A Game-Changer for Oncology
          </h3>
          <p className="text-gray-700 font-medium text-justify mb-5">
            Beyond detecting current cancers, the next frontier is predicting the likelihood of cancer development. AI, combined with digital twin technology, is making this possible. A digital twin is a virtual representation of a patient created using data from genetics, medical history, lifestyle, and continuous monitoring from wearable devices. This digital replica can simulate various scenarios, including how a patient’s body might respond to treatments or develop diseases, allowing doctors to make highly personalized medical decisions.
          </p>
          <h4 className="text-2xl font-semibold text-clr2 mb-2">
            Real-time Monitoring and Predictions
          </h4>
          <p className="text-gray-700 font-medium text-justify">
            Imagine a future where your digital twin is continuously monitored, with AI algorithms processing your health data in real time. If AI detects any abnormal patterns—based on an analysis of billions of similar data points from other patients—it can predict the likelihood of tumor growth and alert doctors for preventive action. This proactive approach turns medicine from reactive to predictive, drastically improving patient outcomes.
          </p>
        </section>
  
        <section className="mb-6">
          <h3 className="text-3xl font-semibold text-clr1 mb-3">
            Digital Twins: A New Era in Personalized Medicine
          </h3>
          <p className="text-gray-700 font-medium text-justify mb-5">
            Digital twins are also changing the way we understand individual cancer profiles. Every cancer is unique, and digital twins allow for precision oncology, where treatments are tailored not just to the type of cancer but to the patient's specific tumor biology. Using simulations, doctors can predict how a patient will respond to certain therapies, drastically reducing trial and error, and improving success rates.
          </p>
          <h4 className="text-2xl font-semibold text-clr2 mb-2">
            AI in Personalized Drug Development
          </h4>
          <p className="text-gray-700 font-medium text-justify">
            By analyzing patient data through digital twins, AI can also accelerate drug discovery and development. Personalized medicine is the future, and AI will help match patients to treatments based on their individual profiles, improving effectiveness and minimizing side effects. A 2021 study showed that digital twin simulations reduced the time to identify the best treatment for cancer patients by up to 30%, showing how revolutionary this technology is.
          </p>
        </section>
  
        <section className="mb-6">
          <h3 className="text-3xl font-semibold text-clr1 mb-3">
            Digital Health Monitoring: Early Intervention is Key
          </h3>
          <p className="text-gray-700 font-medium text-justify mb-5">
            With wearable technology and real-time health monitoring devices, AI can continuously collect health data—like heart rate, blood pressure, glucose levels, and even stress markers. When linked to a patient’s digital twin, this data can be processed and analyzed instantly. This means that early warning systems can notify healthcare providers of any anomalies that might suggest the early onset of cancer or other diseases.
          </p>
          <p className="text-gray-700 font-medium text-justify">
            In addition to saving time, this kind of continuous AI-powered health surveillance gives patients peace of mind. Rather than waiting for annual check-ups or missing symptoms, patients can be confident that their health is under constant review.
          </p>
        </section>
  
        <section className="mb-6">
          <h3 className="text-3xl font-semibold text-clr1 mb-3">
            AI Beyond Cancer: The Full Potential of Digital Twins
          </h3>
          <p className="text-gray-700 font-medium text-justify mb-5">
            While AI in oncology is already showing remarkable results, digital twins and AI have applications far beyond cancer. These technologies are being applied in areas such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 font-medium mb-5">
            <li>Cardiology: AI models can predict heart disease before symptoms even appear.</li>
            <li>Neurology: AI tools are being used to predict neurodegenerative diseases like Alzheimer's by analyzing subtle changes in brain scans.</li>
            <li>Orthopedics: AI simulations can predict the outcomes of surgeries like hip replacements, allowing doctors to plan with unprecedented precision.</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h3 className="text-3xl font-semibold text-clr1 mb-3">
            Addressing the Healthcare Crisis with AI
          </h3>
          <p className="text-gray-700 font-medium text-justify mb-5">
            In a world where millions lack access to basic healthcare and others face astronomical medical bills, AI and digital twin technology can help solve systemic issues. By making diagnosis faster, cheaper, and more accessible, we can reduce the costs of unnecessary procedures and surgeries, giving patients more control over their health.
          </p>
          <p className="text-gray-700 font-medium text-justify">
            In the U.S. alone, nearly 100 million people could access free healthcare under the Affordable Care Act, yet many are unaware or unable to navigate the complex system. By utilizing AI-powered platforms like LifeFinder, patients will have access to transparent healthcare information, affordable consultations, and the power of predictive medicine—bridging the gap in a healthcare system rigged against them.
          </p>
        </section>
  
        {/* <section className="mb-6">
          <h3 className="text-3xl font-semibold text-clr1 mb-3">
          </h3>
          <p className="text-gray-700 font-medium text-justify">
          </p>
        </section> */}


        <div className="bg-clr1 text-white p-5 rounded-xl">
            <h2 className="text-4xl font-bold mb-3 plastic-heading">
            Conclusion: AI and the Future of LifeFinder
            </h2>
            <p className="  mb-5 font-medium  text-justify">
            At LifeFinder, we are committed to empowering patients with the tools they need to navigate the complex medical landscape. By leveraging AI, digital twins, and predictive analytics, we are redesigning healthcare to make it more accessible, transparent, and personalized. The revolution has already begun, and LifeFinder will be at the forefront, helping patients take control of their health with cutting-edge technology that has the power to save lives.
            </p>
          </div>
      </div>
      <div className="line w-[90%] mt-[7rem]">
        <div className="h-[.1rem] bg-clr1 w-full"></div>
      </div>
      <Article3 />
    </div>
  );
  
  // Note: Ensure that all the necessary imports (like React, CountUp, SEO, etc.) are included at the top of your file.
  
}

export default AboutUs;
