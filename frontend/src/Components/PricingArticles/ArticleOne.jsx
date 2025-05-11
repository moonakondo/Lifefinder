// src/components/ClinicReviewsImpact.jsx

import React from "react";
import {
  FaStar,
  FaCheckCircle,
  FaBullhorn,
  FaSearch,
  FaChartLine,
} from "react-icons/fa";

const ArticleOne = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      {/* Hero Section */}
      <div className="max-w-full container mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          HOW CLINIC REVIEWS IMPACT PATIENT ACQUISITION
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
          BOOST YOUR CLINIC NOW
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-full container mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            In today’s Healthcare Environment, online reviews are one of the
            most powerful tools a clinic can leverage to attract new patients.
            Potential Patients Now Look To Reviews To Make Informed Decisions
            about where to seek care. Clinics that actively manage their Online
            Reputation not only build TRUST but also see measurable increases in
            Patient Acquisition. Here’s why clinic reviews matter and how you
            can boost your clinic’s growth with them.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-8">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-start">
            <FaStar className="text-blue-500 w-12 h-12 mb-4 md:mb-0 mr-6" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                1. REVIEWS BUILD TRUST WITH POTENTIAL PATIENTS
              </h2>
              <p className="text-gray-700 leading-relaxed">
                When searching for medical services, prospective patients tend
                to look for clinics that have positive feedback. In fact, over
                80% of people trust online reviews as much as personal
                recommendations. A clinic with consistent positive reviews
                signals reliability, professionalism, and quality care, making
                it more likely for a potential patient to book an appointment.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row items-start">
            <FaBullhorn className="text-blue-500 w-12 h-12 mb-4 md:mb-0 mr-6" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                2. SOCIAL PROOF DRIVES PATIENT DECISIONS
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Positive reviews serve as social proof—showing potential
                patients that others have had good experiences at your clinic.
                This builds confidence that they too will receive excellent
                care. On the flip side, a lack of reviews or negative feedback
                can deter patients, even if the clinic offers superior services.
                Managing and responding to reviews can help neutralize
                negativity and boost your credibility.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-start">
            <FaSearch className="text-blue-500 w-12 h-12 mb-4 md:mb-0 mr-6" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                3. HIGHER RANKINGS IN LOCAL SEARCH RESULTS
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Online reviews are a critical factor for local SEO (search
                engine optimization). Clinics with more reviews—and especially
                positive ones—are more likely to appear at the top of search
                results when potential patients search for medical services in
                their area. This improved visibility means more clicks, leading
                to more appointments. Google and other search engines prioritize
                businesses with strong review profiles, making reviews essential
                for staying competitive.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col md:flex-row items-start">
            <FaChartLine className="text-blue-500 w-12 h-12 mb-4 md:mb-0 mr-6" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                4. PATIENT ACQUISITION THROUGH REPUTATION MANAGEMENT
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Having a system in place to encourage and manage reviews allows
                clinics to control their narrative online. Whether through email
                follow-ups, in-clinic reminders, or patient review software,
                proactively asking patients for feedback ensures a steady flow
                of new reviews. A platform like ours can automate and enhance
                this process, making it easier to collect positive reviews,
                showcase them, and ultimately, attract more patients.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col md:flex-row items-start">
            <FaCheckCircle className="text-blue-500 w-12 h-12 mb-4 md:mb-0 mr-6" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                5. TURNING REVIEWS INTO MARKETING ASSETS
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Great reviews aren’t just for patients to read—they can also
                become marketing assets for your clinic. Highlighting glowing
                reviews on your website, social media, and in advertising
                campaigns helps establish your clinic as a trusted,
                well-reviewed provider. This also increases engagement on your
                digital platforms, leading to more organic growth and patient
                interest.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col md:flex-row items-start">
            <FaChartLine className="text-blue-500 w-12 h-12 mb-4 md:mb-0 mr-6" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                6. HOW TO START COLLECTING REVIEWS AND BOOST YOUR CLINIC NOW
              </h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  {" "}
                  <strong>Ask for Feedback:</strong> Encourage satisfied
                  patients to leave reviews after their appointments. A simple
                  request can go a long way.
                </li>
                <li>
                  {" "}
                  <strong>Leverage Review Management Software:</strong> Use a
                  platform like ours to easily manage patient feedback, respond
                  to reviews, and ensure your clinic stays top-of-mind.
                </li>
                <li>
                  {" "}
                  <strong>Respond to All Reviews:</strong> Thank patients for
                  positive reviews and address any negative feedback
                  professionally. This shows you care and helps build trust.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            CONCLUSION: BOOST YOUR CLINIC WITH REVIEWS
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Clinic reviews are more than just feedback—they are a cornerstone of
            patient acquisition in today’s digital world. Managing your online
            reputation effectively can be the key to attracting new patients,
            increasing visibility, and building trust. With the right tools and
            strategies, you can turn every patient experience into an
            opportunity to boost your clinic’s growth.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            By integrating our review and patient acquisition tools, you can
            streamline this process and see real results in no time. Boost your
            clinic now—start harnessing the power of patient reviews to grow
            your practice today!
          </p>
          <a
            href="/signup/hospital"
            className="inline-block bg-clr1 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-transparent hover:text-clr1 border border-clr1 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArticleOne;
