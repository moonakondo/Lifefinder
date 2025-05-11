

const HealthcareSection = () => {
  return (
    <section className="relative container px-5 sm:px-10 py-14 bg-[#f9f9f9] mx-auto mt-[5rem] z-0">
      <div className="absolute top-0 right-0 bg-pink-300 w-[70%] h-[35vh] rounded-bl-[100%] opacity-60 z-[-1]"></div>
      
      {/* Main heading */}
      <h1 className="text-4xl lg:text-6xl font-semibold italic text-center text-blue-900 mb-8">
        <span className="font-light">OCTOBER IN</span> PINK
      </h1>

      {/* Subheading */}
      <p className="text-2xl lg:text-3xl font-light italic text-center text-gray-500 mb-10">
        MORE THAN JUST A RIBBON
      </p>

      {/* Paragraph 1 */}
      
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        Did you know that <span className="font-bold">1 in 8</span> women in the U.S. will develop breast cancer in her lifetime? That’s <span className="font-bold">13%</span> of all women—your mother, your sister, your best friend. And despite the glossy campaigns, pink ribbons, and annual reminders to “get checked,” the truth is often lost in the marketing fog. <span className="font-bold">Breast cancer is the second leading cause of cancer death among women worldwide,</span> killing over <span className="font-bold">685,000 people each year.</span> And the numbers are only rising
      </p>

      {/* Paragraph 2 */}
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        But here's the kicker: while we’re bombarded with pink, the treatment landscape for
        breast cancer remains as much a financial minefield as it does a medical one. <span className="font-bold">The average
        cost of breast cancer treatment</span> in the U.S. hovers around <span className="font-bold">$100,000—</span>for a disease that kills
        over <span className="font-bold">42,000 women</span> annually in the States alone. Compare that to countries with universal
        healthcare systems, where similar treatments cost <span className="font-bold">10-20% less.</span> Why the difference? Why
        should <span className="font-bold">life-saving treatments</span> feel like luxury items?
      </p>

      {/* Image */}
      <div className="flex justify-center mb-6 py-[1.5rem]">
      <div style={{ boxShadow: '0 0 8px 8px #f9f9f9 inset', backgroundImage: 'url("/assests/pink-day.avif")'}} className="w-[100%] md:w-[80%] mds:w-[50%] aspect-square rounded bg-cover bg-center"></div>
      </div>

      {/* Paragraph 3 with large first letter */}
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        <span className="text-6xl font-serif text-blue-900 float-left mr-2">T</span>
          he truth is, as we gear up for another Pink October, <span className="font-bold"> over 2 million new breast cancer
          cases will be diagnosed globally this year.</span> Yet, despite advancements in treatments,
          including early detection through mammograms, many women remain in the dark—
          whether it’s about treatment options, costs, or survival outcomes.
          <span className="font-bold"> 5-10% of breast cancer cases are linked to genetic mutations,</span> like the BRCA1 and BRCA2
          genes, but the price tag of genetic testing can reach <span className="font-bold">$4,000</span> without insurance. How many
          women skip this life-saving test because they simply can’t afford it?
      </p>
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        Now let’s talk about disparities: African American women are <span className="font-bold"></span>40% more likely to die from
        breast cancer than white women, even though the incidence rate is lower. That’s a
        staggering and shameful statistic. Early detection? Not for everyone, not when access to
        screenings and preventative care are blocked by barriers like income, insurance, and
        location.
      </p>

      {/* Highlighted question */}
      <h2 className="text-xl md:text-2xl font-semibold italic text-center text-gray-800 mb-6">
        ARE WE TREATING PATIENTS OR EXPLOITING THEM?
      </h2>

      {/* Call to action */}
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        <span className="text-6xl font-serif text-blue-900 float-left mr-2">A</span>
        t <span className="font-bold">Lifefinder,</span> we say <span className="italic">NOT</span> enough the fluffy pink messaging. <span className="font-bold">We offer a platform for
        patients to compare clinics, treatments, and costs, empowering them to take control</span> of their
        healthcare journey. <span className="italic">FROM SECOND OPINIONS TO TELECONSULTATIONS,</span> we’re
        here to break the monopoly of information and make sure patients aren’t left in the dark—
        or worse, in debt—when battling this disease.
      </p>
      <p className="text-base md:text-lg font-light text-gray-700 mb-6">
        Let’s make October not just about awareness, but about action. <span className="font-bold">Real numbers. Real solutions. Real access.</span>
      </p>

      {/* Final Message */}
      <p className="text-lg md:text-xl font-light text-right italic text-blue-900 mb-8">
        LET’S GIVE SOMETHING MORE—
      </p>

      <p className="text-lg md:text-xl font-bold text-right italic text-blue-900 mb-8">
        TRANSPARENCY, AFFORDABILITY, AND A FIGHTING CHANCE.
      </p>

      {/* Sources */}
      {/* <div className="border-t border-gray-300 pt-4">
        <p className="text-lg text-gray-500">Sources:</p>
        <ul className="list-disc list-inside text-lg text-gray-500">
          <li>"66.5% of bankruptcies in the U.S. are tied to medical issues" – American Journal of Public Health.</li>
          <li>"Medical costs and pricing discrepancies" – Healthcare Cost and Utilization Project.</li>
        </ul>
      </div> */}
    </section>
  );
};

export default HealthcareSection;
