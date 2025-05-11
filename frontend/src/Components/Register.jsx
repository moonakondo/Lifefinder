import React from 'react';

const Register = () => {
  return (
    <div
      className="w-full min-h-screen px-5 md:px-12 text-white flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#0A1C3A',
        backgroundImage: 'url(/noise.png)',
        backgroundBlendMode: 'overlay',
        paddingTop: '40px',
        paddingBottom: '40px',
        marginTop: '1px',
      }}
    >
      {/* Text Content */}
      <div className="flex flex-col items-center max-w-5xl">
        {/* Main Heading with Sharper Glowing Blue Effect */}
        <h2
          className="text-4xl md:text-6xl font-extrabold text-center mb-8 tracking-wide"
          style={{
            color: '#00D4FF',
            textShadow: '0 0 5px rgba(0, 212, 255, 0.9), 0 0 10px rgba(0, 212, 255, 0.7)',
            zIndex: 10,
          }}
        >
          Boost Your Clinic Now
        </h2>

        {/* Subheading with Highlighted Price */}
        <h3 className="text-2xl md:text-4xl font-bold text-center mb-2">
          Register for only <span className="text-green-400">$1/day!</span>
        </h3>

        {/* Tagline */}
        <h4 className="text-lg md:text-xl font-medium text-center mb-12">
          SEE HOW AFFORDABLE AI CAN TRANSFORM YOUR CLINIC
        </h4>

        {/* Dollar Bill Graphic */}
        <div className="mb-12 flex justify-center">
          <img
            src="/usd.jpg"
            alt="Dollar Bill Graphic"
            className="max-w-[75px] h-auto object-contain"
            style={{
              transform: 'rotate(-4deg)',
              maxWidth: '50%',
            }}
            onError={(e) => {
              e.target.alt = "Dollar bill image failed to load";
              console.error("Failed to load image at /usd.jpg");
            }}
          />
        </div>

        {/* Subscription Features with Adjusted Margin-Left */}
        <div
          className="flex flex-col md:flex-row gap-8 w-full"
          style={{ marginLeft: '150px' }} // Increased from 120px to 150px
        >
          {/* Left Column */}
          <ul className="flex-1 space-y-1 text-left">
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Global Visibility
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Verified Reviews
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Teleconsultation Integration
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Patient Management
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Advanced Analytics
            </li>
          </ul>

          {/* Right Column */}
          <ul className="flex-1 space-y-1 text-left">
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Full Profile Customization
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Access Services & Prices
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24  yminmax-w-5xl">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Data Security
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Patient Acquisition
            </li>
            <li className="flex items-start gap-2 text-base md:text-lg">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Real-Time Insights
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <a href="https://life-finder.com/signup/hospital">
            <button
              className="bg-transparent border-2 border-blue-500 text-blue-400 font-semibold py-4 px-10 rounded-full uppercase hover:bg-blue-500 hover:text-white transition-colors text-lg shadow-lg shadow-blue-500/50 flex items-center gap-2"
              aria-label="Register my clinic"
            >
              Register My Clinic
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;