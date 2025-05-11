import React from 'react';
import { FaRadiation, FaStethoscope, FaUserMd, FaPills, FaBullseye, FaShieldAlt } from 'react-icons/fa';

function Treatments() {
  const treatments = [
    {
      icon: <FaRadiation className="text-4xl text-clr2" />,
      title: 'Radiation Therapy',
      description: 'Utilizes radiation to destroy cancerous cells',
    },
    {
      icon: <FaStethoscope className="text-4xl text-clr2" />,
      title: 'Medical Oncology',
      description: 'General care and treatment as well as regular checkups',
    },
    {
      icon: <FaUserMd className="text-4xl text-clr2" />,
      title: 'Surgical Oncology',
      description: 'Biopsy of tumors and other surgeries associated with cancer treatment',
    },
    {
      icon: <FaPills className="text-4xl text-clr2" />,
      title: 'Chemotherapy',
      description: 'Uses pharmaceuticals to eliminate cancer cells',
    },
    {
      icon: <FaBullseye className="text-4xl text-clr2" />,
      title: 'Targeted Therapy',
      description: 'Blocks cell growth and spread of cancer',
    },
    {
      icon: <FaShieldAlt className="text-4xl text-clr2" />,
      title: 'Immunotherapy',
      description: 'Reinforces natural immunity and cell function',
    },
  ];

  return (
    <div className='flex flex-col justify-center items-center mt-[6vh] md:mt-[12vh] px-[1rem]'>
      <p className='text-clr3 text-[7vw] md:text-[3vw] font-semibold'>Oncology Treatments</p>
    <div className="flex flex-wrap justify-center gap-6 mt-[6vh]">
      {treatments.map((treatment, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-96 flex flex-col items-center text-center">
          <div className="mb-4 text-clr3">
            {treatment.icon}
          </div>
          <h3 className="text-2xl font-semibold text-clr1">{treatment.title}</h3>
          <p className="text-gray-600 mt-2">{treatment.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Treatments;
