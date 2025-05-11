import React from "react";

function OnCloggy() {
  return (
    // <div className="relative bg-white  mt-8 px-6 bg-image-fact">
    //   <div className="flex flex-col md:flex-row gap-x-13 items-center  mx-auto relative z-[11px]">
    //     <div className="w-full md:w-1/2 p-4">
    //       <div className="space-y-4">
    //         <h1 className="text-4xl font-bold text-white drop-shadow-md">
    //           ONCOLOGY Comparator Coming up Soon
    //         </h1>
    //         <p className="text-2xl font-normal text-white drop-shadow-md leading-[40px]">
    //           As the number of cancer cases has exploded and become a global
    //           priority, comparing oncology clinics gains even greater
    //           significance, enabling patients to find the best possible care,
    //           specialized treatments, and expert support crucial to effectively
    //           combatting this widespread health challenge.
    //         </p>
    //       </div>
    //     </div>
    //     <div className="w-full md:w-1/2 p-4">
    //       <img
    //         src="/assests/m2.png"
    //         loading="lazy"
    //         className="w-full rounded-xl h-[100%]"
    //         alt="Plastic Surgery"
    //       />
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="relative bg-no-repeat bg-cover bg-center w-full bg-gray-100 px-5 xs:px-8 py-9 rounded-lg shadow-lg my-[5rem]">
        <div
          className="absolute inset-0 z-10 w-full h-full blur-sm"
          style={{
            // backgroundImage: 'url("/assests/oncology_background2.jpg")',
            backgroundImage: 'url("/assests/oncology.jfif")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        {/* <div className="absolute inset-0 z-20 w-full h-full blur-sm" style={{ backgroundImage: 'url("/assests/oncology2.jpg")', backgroundPosition: 'center', backgroundSize: 'cover'}}></div> */}
        <div className="absolute inset-0 z-10 w-full h-full bg-[#000] opacity-20"></div>
        <div className="flex flex-col justify-evenly md:flex-row gap-y-[2rem] md:gap-x-1 base:gap-x-8 items-center mx-auto">
          <div className="w-full md:w-1/2 base:w-[42%] md:p-4 z-30">
            <div className="glassmorphic p-6 py-7 md:py-10 base:p-10 rounded-lg shadow-md">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#fff]">
                Oncology Comparator
              </h1>
              <div className="h-[1px] w-full bg-white mt-4 sm:mt-6"></div>
              <p className="text-[1.15rem] sm:text-xl font-ligh text-[#fff] leading-relaxed mt-4 sm:mt-6">
                As the number of cancer cases has exploded and become a global
                priority, comparing oncology clinics gains even greater
                significance, enabling patients to find the best possible care,
                specialized treatments, and expert support crucial to
                effectively combatting this widespread health challenge.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 base:w-[40%] px-0 xs:px-4 p-4 z-30">
            <img
              src="/assests/m2.png"
              // src="/Section/oncology.jpg"
              loading="lazy"
              className="w-full rounded-xl object-cover"
              alt="Oncology Treatment"
              style={{ boxShadow: "rgba(255, 255, 255, 0.7) 0px 0px 10px 3px" }}
            />
          </div>
        </div>
      </div>

      {/* <div className="relative bg-gray-100 mt-8 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-x-8 items-center mx-auto">
        <div className="w-full md:w-1/2 p-4">
          <div className="rounded-lg">
            <h1 className="text-4xl font-bold text-[#222]">
            Oncology Comparator
            </h1>
            <p className="text-xl font-ligh text-[#222] leading-relaxed mt-6">
              As the number of cancer cases has exploded and become a global priority, comparing oncology clinics gains even greater significance, enabling patients to find the best possible care, specialized treatments, and expert support crucial to effectively combatting this widespread health challenge.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <img
            src="/assests/m2.png"
            loading="lazy"
            className="w-full rounded-xl object-cover"
            alt="Oncology Treatment"
          />
        </div>
      </div>
    </div> */}
    </>
  );
}

export default OnCloggy;
