function CancerTable() {
  return (
    <div
      className="relative flex flex-col md:flex-row justify-around bg-fixed bg-cover bg-center mt-[5vh] p-[5vh] 2xl:text-[1.17vw] base:text-[1.4vw] lg:text-[1.7vw] md:text-[2.1vw] mid:text-[3vw] sm:text-[3.3vw] xxs:text-[3.8vw] text-[4.5vw] text-white text-justify"
      // style={{ backgroundImage: `url('/Section/lifeline.png')` }}
      style={{ backgroundImage: `url('/assests/oncology_background4.jpg')` }}
    >
      <div className="absolute z-0 inset-0 bg-black bg-opacity-80"></div>
      <div className="w-[45vw] md:w-[35vw] ml-[5vw] flex flex-col mt-[2vh] 2lg:mt-[10vh] md:mt-[2vh] z-10">
        <p className="text-white text-[8vw] md:text-[4vw] font-bold">
          8,900,000
        </p>
        <p className="text-white text-[3vw] md:text-[1.8vw] font-semibold">
          DEADLY HEART ATTACKS 2020
        </p>
      </div>
      <div className="flex flex-col ml-[-5vw] xs:ml-0 md:ml-[0vh] w-[86vw] md:w-[50vw] mt-[3vh] 2lg:mt-[15vh] md:mt-[2vh] z-10">
        <p>
          Regardless of gender or race, heart disease is the leading cause of
          mortality in the United States. It is estimated that 47% of people
          these days have excessive blood pressure and cholesterol.<br></br>
          Contact any of the best international cardiologists for medical
          tourism and get top quality services.
        </p>
        <p className="text-white text-[3.4vw] 2lg:text-[1.4vw] md:text-[2vw] mt-[6vh] 2lg:mt-[6vh] md:mt-[2vh] font-bold">
          MOST POPULAR PROCEDURES
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-white shadow-md mt-[4vh]">
            <thead>
              <tr className="bg-opacity-50">
                <th className="p-4 border border-white">Procedure</th>
                <th className="p-4 border border-white">Average savings</th>
                <th className="p-4 border border-white">Hospital stay</th>
                <th className="p-4 border border-white">Cleared to fly</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-black bg-opacity-30">
                <td className="p-4 border border-white">Aneurysm repair</td>
                <td className="p-4 border border-white">66.7%</td>
                <td className="p-4 border border-white">2 – 6 hrs.</td>
                <td className="p-4 border border-white">1 – 3 days</td>
              </tr>
              <tr className="bg-black bg-opacity-40">
                <td className="p-4 border border-white">Angioplasty</td>
                <td className="p-4 border border-white">78.7%</td>
                <td className="p-4 border border-white">30 min. – 2 hrs.</td>
                <td className="p-4 border border-white">2 – 5 days</td>
              </tr>
              <tr className="bg-black bg-opacity-30">
                <td className="p-4 border border-white">Catheter ablation</td>
                <td className="p-4 border border-white">71.8%</td>
                <td className="p-4 border border-white">2 hrs.</td>
                <td className="p-4 border border-white">2 – 5 days</td>
              </tr>
              <tr className="bg-black bg-opacity-40">
                <td className="p-4 border border-white">
                  Coronary artery bypass
                </td>
                <td className="p-4 border border-white">73.5%</td>
                <td className="p-4 border border-white">3 – 6 hrs.</td>
                <td className="p-4 border border-white">7 – 10 days</td>
              </tr>
              <tr className="bg-black bg-opacity-30">
                <td className="p-4 border border-white">Heart valve repair</td>
                <td className="p-4 border border-white">88.2%</td>
                <td className="p-4 border border-white">2 – 4 hrs.</td>
                <td className="p-4 border border-white">7 – 10 days</td>
              </tr>
              <tr className="bg-black bg-opacity-40">
                <td className="p-4 border border-white">Pacemaker surgery</td>
                <td className="p-4 border border-white">88.6%</td>
                <td className="p-4 border border-white">1 hr.</td>
                <td className="p-4 border border-white">2 – 3 days</td>
              </tr>
              <tr className="bg-black bg-opacity-30">
                <td className="p-4 border border-white">TAVR</td>
                <td className="p-4 border border-white">71.8%</td>
                <td className="p-4 border border-white">2 – 4 hrs.</td>
                <td className="p-4 border border-white">7 – 10 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="2xl:text-[1.17vw] base:text-[1.4vw] lg:text-[1.7vw] md:text-[2.1vw] mid:text-[3vw] sm:text-[3.3vw] xxs:text-[3.8vw] text-[4.5vw]">
          <div className="mt-[2vh] md:mt-[4vh]">
            <p className="text-[4vw] md:text-[2vw] ">
              Cardiology additional procedures information
            </p>
            <p className="underline font-bold mt-[1vh] md:mt-[2vh]">
              Coronary angiography
            </p>
            <p>
              Angiographies are used to assess blood flow and pressure and to find
              restricted, obstructed, or deformed arteries. The interventional
              cardiologist inserts a catheter and then injects a specific dye into
              the veins. The doctor can check how the blood flows and discover any
              clogged arteries by using an X-ray equipment. The dye is eliminated
              through your kidneys and urine.
            </p>
            <p className="underline font-bold mt-[1vh] md:mt-[2vh]">
              Echocardiogram
            </p>
            <p>
              An echocardiogram is a test that measures the heart’s pumping
              strength, and movement to assess overall heart and blood vessel
              function. The specialist uses a probe that emits high-frequency
              sound waves that bounce throughout the heart. The probe receives the
              echoes and converts them into a moving picture.
            </p>
            <p className="underline font-bold mt-[1vh] md:mt-[2vh]">
              Electrocardiogram
            </p>
            <p>
              ECG or EKG is a test that measures the electrical signal of the
              heart to identify arrhythmias, coronary artery disease, and to
              determine if you’ve had a heart attack or how well your pacemaker is
              performing. The doctor will place 12 electrodes on your chest that
              are linked to a monitor and will record the electrical activity.
            </p>
            <p className="underline font-bold mt-[1vh] md:mt-[2vh]">
              Exercise stress test
            </p>
            <p>
              A stress test is advised for diagnosing cardiac diseases such as
              coronary artery disease or a heart attack. The test is meant to
              examine how the heart handles work; thus, you will be walking on a
              treadmill that raises its pace and elevation during the test. The
              heart rate, blood pressure, and respiration will all be monitored by
              the cardiologist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancerTable;
