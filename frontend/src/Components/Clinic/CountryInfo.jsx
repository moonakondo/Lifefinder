import React, { useEffect, useState } from "react";
import Flag from "react-world-flags"; // Import the Flag component
import getCountryInfo from "../../utils/fetchCountry";

const CountryInfo = ({ countryCode, city, Class, detail }) => {
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (countryCode) {
        const info = await getCountryInfo(countryCode);
        setCountryInfo(info);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  const flagCode = countryInfo.cca2 || countryCode;
  const showPlaceholder = !countryInfo.cca2;

  return detail ? (
    <div
      className={`flex px-[10px]  md:w-[200px] mb-[5px] items-center bg-white rounded-lg shadow-md  border-[1px] border-gray-400 ${Class}`}
    >
      <h2 className="text-[14px] font-medium md:text-base font-semibold line-clamp-2">
        {city || countryInfo.name.common}
      </h2>
      <div className="flex items-center">
        {showPlaceholder ? (
          <div className="w-[40px] h-[40px] bg-gray-200 flex items-center justify-center rounded-full mb-[5px]">
            <span className="text-gray-500 text-xs">N/A</span>
          </div>
        ) : (
          <Flag code={flagCode} className="w-[40px] h-[40px]" />
        )}
      </div>
    </div>
  ) : (
    <div
      className={`flex w-[250px] items-center gap-x-[20px] bg-white mb-[10px] py-[10px]   ${Class}`}
    >
      <div className="flex items-center">
        {showPlaceholder ? (
          <div className="w-[45px] h-[45px] bg-gray-200 flex items-center justify-center rounded-full mb-[5px]">
            <span className="text-gray-500 text-xs">N/A</span>
          </div>
        ) : (
          <Flag code={flagCode} className="!w-[50px] h-[40px]" />
        )}
      </div>
      <h2 className="text-lg font-semibold  text-gray-700">
        {city || countryInfo.name.common}
      </h2>
    </div>
  );
};

export default CountryInfo;
