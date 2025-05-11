import { FaDollarSign } from "react-icons/fa";

const Articles = () => {
  return (
    <div className="flex flex-col gap-[2rem] my-[7rem]">
        <p className="text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-[-.8rem]">
            START SMALL, GROW BIG WITH OUR MEDICAL PLATFORM
        </p>
        <p className="text-xl lg:text-2xl font-bold text-center text-blue-900 mb-4">
            Enhance your clinic’s patient acquisition and reputation management with our easy-to-use platform.
        </p>

        <div className="flex items-center gap-[2rem]">
          <div className="text-[4rem] text-blue-900 flex items-center">
            <div className="font-extrabold tt-norms-bold">1</div>
            <FaDollarSign />
          </div>
          <div className="text-blue-900 text-[1.05rem]">
            FOR JUST $1 A DAY, you’ll have access to tools that allow you to connect with New patients through
            Reviews, manage appointments seamlessly, and Improve Your Clinic’s Online Presence. Start small
            to test the benefits, then upgrade to our professional suite of KPI tools and advanced Management
            Software to maximize efficiency, streamline operations, and enhance your clinic’s organization.
          </div>
        </div>
        <div className="flex justify-center mt-[1.5rem]">
          <div className="text-[1.4rem] py-[2rem] px-[3rem] italic text-blue-300 border-blue-300 border-t-[.12rem] border-b-[.12rem]">
            1$/day - Cheaper than your morning coffee, <br/>but way better for your clinic
          </div>
        </div>
        <div className="text-[1.25rem] text-blue-900 text-center">Your patents are waiting!</div>


        <div className="">
          {/* 1st Package */}
          <div className="bg-white p-10 px-14 rounded-lg border border-[#E5E7EB] mb-9">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1st Package (Basic Plan: $1/Day):</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Teleconsultations</strong> – Offer 15-minute consultations to patients.</li>
              <li><strong>Profile Management</strong> – Update and maintain your clinic’s online profile.</li>
              <li><strong>Patient Reviews</strong> – Respond to and manage patient feedback and reviews.</li>
              <li><strong>Appointment Scheduling</strong> – Basic tools to manage appointments efficiently.</li>
              <li><strong>Analytics Dashboard</strong> – Get simple insights into clinic performance.</li>
              <li><strong>Patient Messaging</strong> – Direct communication channel with patients.</li>
              <li><strong>24/7 Support</strong> – Basic customer support to resolve issues.</li>
            </ul>
          </div>

          {/* 2nd Package */}
          <div className="bg-white p-10 px-14 rounded-lg border border-[#E5E7EB]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2nd Package PREMIUM AI PLAN ($1,200/month with AI Tools):</h2>
            <h3 className="text-lg font-semibold italic text-gray-700 mb-4">CUSTOM AI MONITORING</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Advanced Teleconsultation Features</strong> – Longer sessions, more booking flexibility.</li>
              <li><strong>Enhanced KPI Tools</strong> – Track key performance indicators to optimize clinic efficiency.</li>
              <li><strong>Profit & Performance Insights</strong> – Tools to monitor clinic profitability in real-time.</li>
              <li><strong>Patient Growth Analytics</strong> – Predict and track patient flow trends and revenue growth.</li>
              <li><strong>Management Optimization</strong> – Streamline staff and resource management.</li>
              <li><strong>Custom Reporting</strong> – Tailored reports on patient outcomes, satisfaction, and revenue metrics.</li>
              <li><strong>Financial Forecasting</strong> – AI-powered tools to predict financial health and growth opportunities.</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="w-[80%] mx-auto bg-blue-900 text-white text-center py-5 mt-16 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">REVOLUTIONIZE PATIENT CARE, CUT COSTS AND SPEND LESS MONEY ON GOOGLE ADS AND SOCIAL MEDIA.</h3>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-gray-600">
            <p>
              Transform how your clinic connects with patients. <strong>MANAGE YOUR ONLINE PROFILE</strong>, receive patient feedback, and offer teleconsultations—all with easy tools designed for your growth.
            </p>
            <p className="mt-2">
              Sign up for one of our simple plans and start thriving today. Let us help you boost visibility, grow patient trust, and make operations smooth for just $1/day.
            </p>
          </div>
        </div>

    </div>
    
  )
}

export default Articles
