

const HealthcareSection = () => {
  return (
    <section className="container px-5 sm:px-10 py-14 bg-[#f9f9f9] mx-auto mt-[5rem]">
      {/* Main heading */}
      <h1 className="text-4xl lg:text-6xl font-semibold italic text-center text-blue-900 mb-8">
        HEALTHCARE <span className="font-light">OR A HOUSE?</span> PICK ONE
      </h1>

      {/* Subheading */}
      <p className="text-2xl lg:text-3xl font-light italic text-center text-gray-500 mb-10">
        DID YOU KNOW THAT IN THE UNITED STATES, 66.5% OF ALL BANKRUPTCIES ARE TIED TO MEDICAL ISSUES?
      </p>

      {/* Paragraph 1 */}
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        That’s nearly <span className="font-bold"> 530,000 families</span> every year forced to make the impossible choice between 
        healthcare or keeping their home. It’s a brutal reality in a nation where healthcare spending has soared to 
        <span className="font-bold"> $4.3 trillion annually</span>, yet millions remain without basic access to necessary treatments.
      </p>

      {/* Paragraph 2 */}
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        Despite the introduction of policies like the <span className="font-bold"> Affordable Care Act</span>, which promises care to 
        over <span className="font-bold"> 100 million Americans</span>, navigating the complexities and costs of the system is still 
        a nightmare for many. The average medical bill after insurance is a staggering 
        <span className="font-bold"> $4,000</span>.
      </p>

      {/* Image */}
      <div className="flex justify-center mb-6 py-[1.5rem]">
      <div style={{ boxShadow: '0 0 8px 8px #f9f9f9 inset', backgroundImage: 'url("/assests/saline_bags.jpg")'}} className="w-[100%] md:w-[80%] mds:w-[50%] h-[30vh] xs:h-[40vh] sm:h-[50vh] rounded bg-cover bg-center"></div>
      </div>

      {/* Paragraph 3 with large first letter */}
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        <span className="text-6xl font-serif text-blue-900 float-left mr-2">T</span>his isn’t just about elective procedures or minor 
        surgeries; this is life and death. In a system that values profit over people, hospitals are charging as much as 
        <span className="font-bold"> $10,000 per night</span> for a stay, while pharmaceutical companies hike drug prices by 
        <span className="font-bold"> 30-40% every year</span>—crippling access to lifesaving medications.
      </p>
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
      Incredibly, over <span className="font-bold"> 250,000 deaths a year</span> are linked to medical errors and preventable mistakes. As patients become numbers in a profit-driven system, one has to ask:
      </p>

      {/* Highlighted question */}
      <h2 className="text-xl md:text-2xl font-semibold italic text-center text-gray-800 mb-6">
        ARE WE TREATING PATIENTS OR EXPLOITING THEM?
      </h2>

      {/* Call to action */}
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        <span className="text-6xl font-serif text-blue-900 float-left mr-2">A</span>t <span className="font-bold">LIFEFINDER</span>, we recognize that transparency and patient empowerment are the answers. We 
        offer access to detailed healthcare provider comparisons, verified reviews, and the power for patients to make informed 
        decisions without fear of losing their homes or their future. Our mission is to <span className="font-bold">change the game</span> 
        by providing equal access to healthcare insights across borders — whether you need a consultation, a second opinion, or to simply compare costs. 
      </p>
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        It’s time to shift from "Survival of the Wealthiest" to "Survival for All."
      </p>

      {/* Final Message */}
      <p className="text-lg md:text-xl font-light italic text-gray-500 mb-8">
        HEALTH SHOULDN’T BE A GAMBLE. WITH LIFEFINDER, YOU CAN FINALLY PICK HEALTH AND YOUR HOME.
      </p>

      {/* Sources */}
      <div className="border-t border-gray-300 pt-4">
        <p className="text-lg text-gray-500">Sources:</p>
        <ul className="list-disc list-inside text-lg text-gray-500">
          <li>"66.5% of bankruptcies in the U.S. are tied to medical issues" – American Journal of Public Health.</li>
          <li>"Medical costs and pricing discrepancies" – Healthcare Cost and Utilization Project.</li>
        </ul>
      </div>
    </section>
  );
};

export default HealthcareSection;
