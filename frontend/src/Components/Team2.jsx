import React from 'react';

const teamMembers = [
  {
    title: 'VISION',
    name: 'ANNE-CHARLOTTE FORTIER',
    subtitle: 'Ceo & Founder, Cmo & Strategic Partnerships',
    image: '/BU8A4925 (1).jpg',
  },
  {
    title: 'BACKBONE',
    name: 'CHRISTINE KIEFFER',
    subtitle: 'Cfo, Private Equity Catalyst, Financing Advisor, Business Development',
    image: '/Screenshot_ffpng.png',
  },
  {
    title: 'APPLE GENIUS',
    name: 'DANIEL KOTTKE',
    subtitle: 'First Apple Engineer: Prototyped The Apple, Computer, Debugged The Apple II, Prototyped Apple III & The Macintosh', // Updated "Apple II" and "Apple III"
    image: '/2020-10-03-TPC-9-DanielKottke-_on_cnn_with_appleiii_sq_1200x1200.jpg',
  },
  {
    title: 'AI',
    name: 'SOHINI ROYCHOWDHURY',
    subtitle: 'Phd Berkeley, Gen Ai & Data Science Director',
    image: '/Sohini_Roychowdhury-200x200-1.jpeg',
  },
  {
    title: 'ACADEMICIAN',
    name: 'RICHARD VILLET',
    subtitle: 'Head Of The French Academy Of Medicine, Former Hospital Director, Surgeon & Professor, Head Of The French Medical Foundation',
    image: '/3-Portrait-du-Professeur-Richard-Villet.jpg',
  },
  {
    title: 'THE KILL BILL',
    name: 'BILL HENNESSEY, MD',
    subtitle: 'Chief Innovation & Billing Integrity Officer At ',
    linkText: 'Careguide Advocates',
    linkUrl: 'https://www.cgasaves.com/',
    image: '/hennessey_bill_linkedin_01_0.jpg',
  },
  {
    title: 'MAPMAKER',
    name: 'MANIRUZZAMAN MOON',
    subtitle: '',
    image: '/ImportedPhoto_1723407254733.jpg',
  },
  {
    title: 'MUSE',
    name: 'LAUREN WASSER',
    subtitle: 'Fashion Icon, Toxic Syndrome Survivor, Activist',
    image: '/Screenshot_1ff.png',
  },
  {
    title: 'INSPIRATION',
    name: 'LT COL, BRIAN KIEFFER',
    subtitle: '(1966-2021), U.S. Airforce Pilot',
    image: '/Screenshccot_2.png',
  },
];

const TeamSection = () => {
  // Split team members into two groups: left (first 4) and right (last 5) for 9 members
  const leftTeamMembers = teamMembers.slice(0, 4); // First 4 members
  const rightTeamMembers = teamMembers.slice(4); // Last 5 members

  return (
    <div className="py-16 px-5 bg-white flex flex-col items-center">
      {/* Enhanced Heading: LIFEFINDER FAMILY */}
      <h2 className="text-6xl md:text-7xl font-extrabold text-center text-blue-900 mb-12 tracking-wide shadow-md">
        LIFEFINDER FAMILY
      </h2>

      {/* Team Members List: Two Columns */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row justify-center gap-8 border-b-4 border-blue-900 pb-8">
        {/* Left Column */}
        <div className="w-full md:w-1/2 space-y-6">
          {leftTeamMembers.map((member, index) => (
            <div key={index} className="flex items-center space-x-4">
              {/* Team Member Image */}
              <img
                src={member.image}
                alt={member.name}
                className={`w-16 h-16 rounded-full object-cover grayscale ${
                  member.name === 'RICHARD VILLET' ? 'object-top aspect-square' : ''
                }`} // Added aspect-square for Richard Villet
              />
              {/* Team Member Info */}
              <div>
                <h4 className="text-sm font-bold text-blue-900 uppercase">
                  {member.title}
                </h4>
                <h3 className="text-lg font-semibold text-blue-900 uppercase">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {member.subtitle}
                  {member.linkText && member.linkUrl ? (
                    <a
                      href={member.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline ml-1"
                    >
                      {member.linkText}
                    </a>
                  ) : null}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 space-y-6">
          {rightTeamMembers.map((member, index) => (
            <div key={index} className="flex items-center space-x-4">
              {/* Team Member Image */}
              <img
                src={member.image}
                alt={member.name}
                className={`w-16 h-16 rounded-full object-cover grayscale ${
                  member.name === 'RICHARD VILLET' ? 'object-top aspect-square' : ''
                }`} // Added aspect-square for Richard Villet
              />
              {/* Team Member Info */}
              <div>
                <h4 className="text-sm font-bold text-blue-900 uppercase">
                  {member.title}
                </h4>
                <h3 className="text-lg font-semibold text-blue-900 uppercase">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {member.subtitle}
                  {member.linkText && member.linkUrl ? (
                    <a
                      href={member.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline ml-1"
                    >
                      {member.linkText}
                    </a>
                  ) : null}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;