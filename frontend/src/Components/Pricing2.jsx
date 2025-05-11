// src/Components/Pricing2.jsx
import { useEffect, useState } from 'react';
import './App.css';
import Footer from '../Sections/Footer';

function HeroSection() {
  return (
    <section
      className="bg-cover bg-center text-white min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/PM.png')",
        backgroundPositionX: '118px',
        backgroundPositionY: '-200px',
      }}
    >
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-2/3 text-left">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 mx-auto lg:ml-[40px]"
            style={{ fontFamily: 'TTNorms, sans-serif' }}
          >
            Grow Your Clinic & Get More Patients
          </h1>
          <p
            className="text-white text-base sm:text-lg mb-2 mx-auto lg:ml-[40px]"
            style={{ marginTop: '20px' }}
          >
            Lifefinder is the exchange platform for clinic growth,<br />
            reputation management, and Patient Acquisition.
          </p>
          <p
            className="text-white text-base sm:text-lg mb-2 mx-auto lg:ml-[40px]"
            style={{ marginTop: '20px' }}
          >
            Trusted by Clinics Worldwide, we help you attract New<br />
            Patients, manage Booking appointments and track<br />
            performance –
          </p>
          <div
            className="inline-block mx-auto lg:ml-[40px]"
            style={{
              marginBottom: '28px',
              marginTop: '20px',
              backgroundColor: '#0A1E3F',
              borderRadius: '50px',
              padding: '12px 24px',
              border: '2px solid #00A3FF',
              boxShadow: '0 0 10px rgba(0, 163, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <p
              className="text-white font-extrabold text-xl sm:text-2xl lg:text-3xl"
              style={{ fontFamily: 'TTNorms, sans-serif' }}
            >
              Starting at just $1/Day
            </p>
            <span className="text-white text-xl sm:text-2xl">→</span>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/3 flex justify-center items-center relative">
          <div className="w-72 h-72 rounded-full overflow-hidden rotate-slow">
            <img src="/preview.png" alt="Rotating Graphic" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [countdown, setCountdown] = useState('');
  const deadline = new Date('2025-05-29T23:59:59').getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setCountdown('Offer expired');
        return;
      }

      const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

      setCountdown(`Ends in: ${hours}:${minutes}:${seconds}`);
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="background_color_price">
      <section className="price_up_sectrion py-12">
        <h1
          className="bostyourclinic text-[45px] font-semibold text-center"
          style={{ fontFamily: 'TTNorms, sans-serif', color: '#60A5FA' }}
        >
          BOOST YOUR CLINIC NOW
        </h1>
        <p className="text-white text-center text-[30px] font-semibold">
          $1/day – START SMALL, SCALE BIG
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12 py-12">
        <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">BASIC – Visibility Starter</h3>
            <p className="text-4xl font-bold">
              $365<span className="text-base font-medium">/year</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">= $1/day</p>
            <hr className="my-4 border-gray-200" />
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Clinic profile: name, photos, hours, specialties
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Appear in search results by city & treatment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Patient reviews
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Verified LifeFinder badge
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> SEO visibility + unlimited profile edits
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Direct link to your Socials
              </li>
            </ul>
            <p className="mt-4 text-sm text-indigo-600 font-medium">
              Join now – instant listing in global directory
            </p>
          </div>
          <button className="mt-8 bg-indigo-900 text-white py-3 rounded-xl hover:bg-indigo-800 transition">
            Select
          </button>
        </div>
        <div
          className="custom_backgound text-gray-900 rounded-2xl shadow-lg p-6 flex flex-col justify-between relative overflow-hidden middle_price"
          style={{
            background: 'linear-gradient(rgb(8 106 255 / 50%), rgba(0, 9, 73, 0.5)), url(https://www.transparenttextures.com/patterns/hexellence.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '3px solid rgb(0 204 255)',
            boxShadow: '0 2px 14px rgb(0, 204, 255)',
          }}
        >
          <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
            <div
              className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded animate-pulse"
              style={{ 
                color: '#FFFFFF', 
                fontSize: '14px', 
                marginTop: '-13px',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
              }}
            >
              Limited Offer
            </div>
            <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded" style={{ marginTop: '30px' }}>
              {countdown}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">GROWTH – Bookings Engine</h3>
            <p className="text-4xl font-bold text-white">
              $1,800<span className="text-base font-medium text-white">/year</span>
            </p>
            <p className="text-sm text-white mb-4">or $200/month</p>
            <hr className="my-4 border-gray-200" />
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> All features of the BASIC plan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Online bookings + calendar management
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> SMS & email confirmations for patients
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> “Book Now” button added to your profile
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Secure Teleconsultation Module
              </li>
            </ul>
            <p className="mt-4 text-sm text-white font-medium">
              Only 500 clinics can claim this before 14th July 2025
            </p>
          </div>
          <button className="mt-8 bg-indigo-900 text-white py-3 rounded-xl hover:bg-indigo-800 transition">
            Reserve Your Spot
          </button>
        </div>
        <div className="bg-gray-900 text-black rounded-2xl shadow-lg p-6 flex flex-col justify-between relative overflow-hidden" style={{ backgroundColor: 'white' }}>
          <div className="absolute top-4 right-4 bg-green-500 text-xs font-bold px-2 py-1 rounded text-white">
            1-Month Free Trial
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 uppercase">Prestige</h3>
            <p className="text-sm text-black mb-2">MEDISPHERE PRESTIGE PLAN Powered by LifeFinder x Statra</p>
            <p className="text-4xl font-bold text-black">
              $4,500<span className="text-base font-medium text-black">/year</span>
            </p>
            <p className="text-sm text-black mt-1">Includes Free Setup – Start Risk-Free</p>
            <hr className="my-4 border-gray-700" />
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>💎 Prestige Plan for Large scaled Clinics & Hospitals
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>Patient entry fee: $4,500 upfront, then instantly transferred to the clinic via Medisphere’s global concierge system and $1,200 monthly Support. Cancel any time
              </li>
            </ul>
          </div>
          <button className="mt-8 bg-indigo-900 text-white py-3 rounded-xl hover:bg-indigo-800 transition">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

function CoffeeSection() {
  return (
    <div className="bg-blue-900 text-white flex items-center justify-center min-h-screen" style={{ paddingBottom: '50px' }}>
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold" style={{ fontSize: '100px' }}>
            $1/<span className="text-3xl md:text-4xl">DAY</span><span className="text-3xl md:text-4xl">–</span>
          </h1>
          <p className="text-xl md:text-2xl mt-4">
            Cheaper than your<br /> morning coffee, <br />but way better for <br />your clinic
          </p>
          <button
            className="start_now_button bg-white text-black px-7 py-2.5 text-lg font-semibold rounded-3xl mt-7 border-2 border-white hover:bg-black hover:text-blue-600 hover:border-blue-600 md:-ml-4"
          >
            START NOW
          </button>
        </div>
        <div style={{ margin: 0 }}>
          <img
            src="/ss.png"
            alt="Coffee Cup with LifeFinder Logo"
            className="w-48 md:w-64"
            style={{ marginTop: '34%', width: '23rem' }}
          />
        </div>
      </div>
    </div>
  );
}

function CallToActionSection() {
  return (
    <section
      className="py-6"
      style={{
        backgroundColor: '#0A1E3F',
        boxShadow: '0 0 10px rgba(0, 163, 255, 0.5)',
      }}
    >
      <div className="fiq_div text-center px-4 sm:px-6 py-8">
        <h1 className="text-4xl sm:text-5xl font-semibold text-white">
          List Your Clinic. Get Seen. Get Booked.
        </h1>
        <p className="text-base sm:text-lg font-semibold mt-4 text-white">
          Your next patient might be searching right now.
        </p>
        <a href="#">
          <button className="cta_button bg-white text-[#041837] px-4 py-3.5 rounded-[15px] text-base font-semibold uppercase mt-7">
            Start Now – $365/Year – Instant Setup
          </button>
        </a>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      className="py-12 px-4"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png'), linear-gradient(135deg, rgba(10, 30, 63, 0.9), rgba(0, 0, 20, 0.9))",
        backgroundColor: '#0A1E3F',
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Partnered clinics say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
          <div className="card bg-[#050B17] border border-[#1E4FFF] rounded-2xl p-8 text-white shadow-[0_0_53px_rgba(30,79,255,0.5)]">
            <div className="quote-icon text-[#1E4FFF] text-[66px] pb-2">“</div>
            <p className="text-2xl pb-12">We joined LifeFinder for $1 /day and got 12 new patients in our first month.</p>
            <div className="tag bg-[#19213a] px-3.5 py-1.5 text-base font-medium rounded-full mt-4 border border-[#1E4FFF] shadow-[0_0_36px_rgb(0,56,255)]">Basic plan</div>
            <div className="name mt-3 font-semibold">Dr. Lucia R.</div>
            <div className="clinic text-sm text-gray-400">Dental Clinic, Sao Paulo</div>
          </div>
          <div className="card bg-[#050B17] border border-[#1E4FFF] rounded-2xl p-8 text-white shadow-[0_0_53px_rgba(30,79,255,0.5)]">
            <div className="quote-icon text-[#1E4FFF] text-[66px] pb-2">“</div>
            <p className="text-2xl pb-12">Adding bookings helped us triple our international inquiries.</p>
            <div className="tag bg-[#19213a] px-3.5 py-1.5 text-base font-medium rounded-full mt-4 border border-[#1E4FFF] shadow-[0_0_36px_rgb(0,56,255)]">Growth plan</div>
            <div className="name mt-3 font-semibold">Dr. Y1L.</div>
            <div className="clinic text-sm text-gray-400">IVF Center, Soiu</div>
          </div>
          <div className="card bg-[#050B17] border border-[#1E4FFF] rounded-2xl p-8 text-white shadow-[0_0_53px_rgba(30,79,255,0.5)]">
            <div className="quote-icon text-[#1E4FFF] text-[66px] pb-2">“</div>
            <p className="text-2xl pb-12">We've had more patient trust since adding the Global Trust plan. LifeFinder changed everything.</p>
            <div className="name mt-4 font-semibold">Dr. Hana S.</div>
            <div className="clinic text-sm text-gray-400">Fertility Clinic, Helsinki</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdCampaignSection() {
  return (
    <div
      className="w-full relative overflow-hidden py-16 px-6 lg:px-24"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png'), linear-gradient(135deg, rgba(10, 30, 63, 0.9), rgba(0, 0, 20, 0.9))",
        backgroundColor: '#0A1E3F',
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div
          style={{
            backgroundColor: 'transparent',
            padding: '20px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <img
            src="/add.jpg"
            alt="Ad Campaign"
            className="rounded-2xl shadow-2xl w-full lg:w-1/2 object-cover transition-transform hover:scale-105 duration-300"
            style={{ width: '27%' }}
          />
          <div className="text-white flex-1 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Ad Campaign Boost</h2>
            <p className="text-lg text-indigo-100 mb-6 mx-auto max-w-xl">
              Supercharge your clinic's visibility with our targeted ad campaigns. Reach high-value patients across social platforms and healthcare search networks.
            </p>
            <ul className="space-y-3 text-indigo-100 font-medium mx-auto max-w-md">
              <li className="flex items-center justify-center gap-2">✅ Geo-targeted patient reach</li>
              <li className="flex items-start justify-center gap-2">✅ Automated appointment funnels</li>
              <li className="flex items-start justify-center gap-2">✅ Weekly performance reports</li>
              <li className="flex items-start justify-center gap-2">✅ Seamless Medisphere integration</li>
            </ul>
            <button className="mt-8 bg-white text-black font-semibold py-3 px-8 rounded-xl shadow-lg transition-transform duration-300 hover:bg-gray-200">
              START NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyLifeFinderSection() {
  return (
    <div className="w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Why LifeFinder Works</h2>
          <ul className="space-y-4 text-lg text-gray-700 font-medium">
            <li>✅ Built to get you discovered by international patients</li>
            <li>✅ No commissions. No hidden fees. One flat yearly price</li>
            <li>✅ A platform with sci-fi clarity and Apple simplicity</li>
            <li>✅ Works for plastic surgery, fertility, dental, oncology, cardiology clinics and more</li>
          </ul>
          <button className="mt-8 bg-[#041736] text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-transform duration-300">
            GiVE REVIEW
          </button>
        </div>
        <div className="flex-1 w-full">
          <video
            className="w-full rounded-2xl shadow-xl"
            style={{ height: '448px', width: '451px' }}
            controls
            autoPlay
            muted
            playsInline
            loop
            poster="https://via.placeholder.com/640x360.png?text=LifeFinder+Video+Preview"
          >
            <source src="/ss.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleAccordion = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const faqs = [
    {
      id: 'faq1',
      question: '1. REVIEWS BUILD TRUST WITH POTENTIAL PATIENTS',
      answer: `When searching for medical services, prospective patients tend to look for clinics that have positive feedback. In fact, over 80% of people trust online reviews as much as personal recommendations. A clinic with consistent positive reviews signals reliability, professionalism, and quality care, making it more likely for a potential patient to book an appointment.`,
    },
    {
      id: 'faq2',
      question: '2. SOCIAL PROOF DRIVES PATIENT DECISIONS',
      answer: `Positive reviews serve as social proof—showing potential patients that others have had good experiences at your clinic. This builds confidence that they too will receive excellent care. On the flip side, a lack of reviews or negative feedback can deter patients, even if the clinic offers superior services. Managing and responding to reviews can help neutralize negativity and boost your credibility.`,
    },
    {
      id: 'faq3',
      question: '3. HIGHER RANKINGS IN LOCAL SEARCH RESULTS',
      answer: `Online reviews are a critical factor for local SEO (search engine optimization). Clinics with more reviews—and especially positive ones—are more likely to appear at the top of search results when potential patients search for medical services in their area. This improved visibility means more clicks, leading to more appointments. Google and other search engines prioritize businesses with strong review profiles, making reviews essential for staying competitive.`,
    },
    {
      id: 'faq4',
      question: '4. PATIENT ACQUISITION THROUGH REPUTATION MANAGEMENT',
      answer: `Having a system in place to encourage and manage reviews allows clinics to control their narrative online. Whether through email follow-ups, in-clinic reminders, or patient review software, proactively asking patients for feedback ensures a steady flow of new reviews. A platform like ours can automate and enhance this process, making it easier to collect positive reviews, showcase them, and ultimately, attract more patients.`,
    },
    {
      id: 'faq5',
      question: '5. TURNING REVIEWS INTO MARKETING ASSETS',
      answer: `Great reviews aren’t just for patients to read—they can also become marketing assets for your clinic. Highlighting glowing reviews on your website, social media, and in advertising campaigns helps establish your clinic as a trusted, well-reviewed provider. This also increases engagement on your digital platforms, leading to more organic growth and patient interest.`,
    },
    {
      id: 'faq6',
      question: '6. HOW TO START COLLECTING REVIEWS AND BOOST YOUR CLINIC',
      answer: (
        <div className="space-y-2">
          <p><strong>ASK FOR FEEDBACK:</strong> Encourage satisfied patients to leave reviews after their appointments. A simple request can go a long way.</p>
          <p><strong>LEVERAGE REVIEW MANAGEMENT SOFTWARE:</strong> Use a platform like ours to easily manage patient feedback, respond to reviews, and ensure your clinic stays top-of-mind.</p>
          <p><strong>RESPOND TO ALL REVIEWS:</strong> Thank patients for positive reviews and address any negative feedback professionally. This shows you care and helps build trust.</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-[#001F5B]">
          <h2 className="text-2xl md:text-3xl font-bold italic mb-6">
            FAQ : HOW CLINIC REVIEWS IMPACT PATIENT ACQUISITION: BOOST YOUR CLINIC NOW
          </h2>
          <p className="mb-4 text-lg">
            In today’s <span className="font-bold">Healthcare Environment</span>,
            <span className="font-bold underline">online reviews are one of the most powerful tools a clinic can leverage to attract new patients.</span>
          </p>
          <p className="mb-4 text-lg">
            Potential Patients Now Look To <span className="font-bold underline">Reviews</span>
            To Make Informed Decisions about <em className="font-semibold">where to seek care</em>.
          </p>
          <p className="mb-4 text-lg">
            Clinics that actively manage their <span className="font-bold underline">Online Reputation</span>
            not only build <em>TRUST</em> but also see measurable increases in <span className="font-bold">Patient Acquisition</span>.
          </p>
          <p className="text-lg">
            <a href="#" className="text-blue-600 italic underline">
              Here’s why clinic reviews matter and how you can boost your clinic’s growth with them.
            </a>
          </p>
        </div>
      </section>
      <div className="w-full bg-[#001F5B] py-6 px-4 text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-white rounded">
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-semibold focus:outline-none"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`bg-white text-black px-6 py-4 ${openFAQ === faq.id ? 'block' : 'hidden'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="bg-white w-full py-16 px-6 md:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-500">
            Clinic reviews are more than just feedback<span className="text-black">—</span>
          </h2>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed">
            they are a cornerstone of <span className="font-semibold italic underline text-blue-900">patient acquisition</span> in today’s digital world. Managing your online reputation effectively can be the key
            to attracting new patients, increasing visibility, and building trust. With the right tools and strategies,
            you can turn every patient experience into an opportunity to boost your clinic’s growth.
          </p>
          <p className="mt-6 italic text-blue-900 text-base md:text-lg">
            By integrating our review and patient acquisition tools, you can streamline this process and see real
            results in no time. <span className="font-semibold">Boost your clinic now—start harnessing the power of patient reviews to grow your practice today!</span>
          </p>
          <div className="mt-12 bg-gray-100 rounded-2xl p-6 max-w-2xl mx-auto shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-blue-700 font-semibold flex items-center gap-2">
                🚀 <span>Start for $1/day. Global visibility.</span>
              </div>
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-medium"
              >
                ☞ Join Now – Be Found by Patients Worldwide
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GlobalTrustSection() {
  const [openAccordion, setOpenAccordion] = useState(false);

  const toggleAccordion = () => {
    setOpenAccordion(!openAccordion);
  };

  return (
    <div className="bg-white text-black px-10 py-8 w-full space-y-10 font-sans text-lg">
      <div className="w-full max-w-full mx-auto my-8 bg-white p-4 rounded-lg">
        <div className="accordion-item">
          <button
            className="accordion-header flex justify-between items-center w-full py-3 px-4 text-lg font-semibold text-gray-800 bg-gray-200 rounded-md focus:outline-none"
            onClick={toggleAccordion}
          >
            <span>📘 READ MORE What you get for our GLOBAL TRUST PLAN – Enterprise-Level Transformation</span>
            <svg
              className={`accordion-icon w-5 h-5 transform transition-transform duration-300 ${openAccordion ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`accordion-content mt-2 text-gray-600 ${openAccordion ? 'open' : ''}`}>
            <div>
              <h2 className="text-xl font-bold">1. Real-time Workplace Dashboard by STATRA</h2>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>Full-stack performance monitoring across clinics</li>
                <li>Aligns real-time metrics with medical operational KPIs</li>
                <li>Accurately published via EMR</li>
                <li>Used by top-tier institutions to scale growth while minimizing practice variation</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">2. Booking & Concierge Suite</h2>
              <p className="font-semibold mt-3">Enterprise-grade multilingual booking (for international patients, high-acuity, VIP hospitals)</p>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>AI-based matching with global patient preferences</li>
                <li>Auto-navigation through complex country/city stages</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">3. Advanced Conversion Control Center</h2>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>Advanced encrypted + HIPAA/GDPR-compliant patient record sharing</li>
                <li>Smart real-time follow-up suggestions</li>
                <li>Human-assisted decision making per session</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">4. Patient Payment and Legal System</h2>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>Lifefinder handles $4.9B onboarding fees</li>
                <li>Sutra supports further billing, insurance, deposit policies</li>
                <li>Smart integrations (Stripe, Razorpay, Klarna)</li>
                <li>Disputes resolution built-in (in multi-region ops)</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">5. Global Branding + Partner Trust System</h2>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li><strong>Featured as “Sutra Verified Elite Partner Hospital”</strong></li>
                <li>Highlights institution’s elite international KPIs</li>
                <li>Helps win in Sutra’s global patient servicing map</li>
                <li>Custom content videos, PRs, SEO-ready markets</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">6. Quarterly Growth Consultation (optional)</h2>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>Led by Sutra Business Engineers & Strategists</li>
                <li>Review operational KPIs with AI metrics</li>
                <li>Align on quarterly OKRs, actionable goals & profitability</li>
                <li>Enterprise diagnostics for sustainable growth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-blue-700 text-xl font-bold">💙 Why Hospitals Choose Medisphere Prestige</h2>
        <div className="mt-3 space-y-2">
          <p><strong>Case Study – Foundational Health</strong><br /><span className="pl-4">Sutra improves team efficiency by 19.5%, transforming operational accountability and employee alignment.</span></p>
          <p><strong>Case Study – Bowers Imaging Center</strong><br /><span className="pl-4">Improved patient care and continuity trust by tracking KPI-driven employee performance.</span></p>
          <p><strong>Case Study – Cancer Care Group</strong><br /><span className="pl-4">Achieving $2.5M increase in ROI, 60% drop in marketing spend, and major operational time savings across teams.</span></p>
        </div>
      </div>
      <div>
        <h2 className="text-blue-800 text-xl font-bold">💼 Enhanced Profitability and Accountability</h2>
        <ul className="list-disc pl-8 mt-3 space-y-2">
          <li>We empower healthcare institutions by:</li>
          <li>Tracking staff alignment with mission goals</li>
          <li>Connecting growth strategy and finance goals</li>
          <li>Offering real-time accountability tracking via Sutra’s intelligent system</li>
        </ul>
      </div>
      <div className="border-t border-gray-300 pt-8">
        <ul className="list-disc pl-8 mt-3 space-y-2">
          <li><span className="text-blue-600 font-semibold">🚀 Start Your Free Trial Today</span> – Includes Sutra KPI Suite & Global Booking</li>
          <li><span className="text-green-600 font-semibold">📥 $0 setup point inclusion, only Sutra handles the rest</span></li>
          <li><span className="text-purple-600 font-semibold">⭐ Premium service for clinics serious about transformation</span></li>
          <li><span className="text-red-600 font-semibold">🔥 Next Starter = Next Prestige Impact</span></li>
          <li><span className="text-gray-700 font-semibold">Backed by Lifefinder & Sutra. Trusted by giants. Proven by performance.</span></li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: 'TTNorms, sans-serif' }}>
      <HeroSection />
      <PricingSection />
      <CoffeeSection />
      <CallToActionSection />
      <TestimonialsSection />
      <AdCampaignSection />
      <WhyLifeFinderSection />
      <FAQSection />
      <GlobalTrustSection />
      <Footer />
    </div>
  );
}

export default App;