import React, { useMemo, useState } from "react";
import { Rate } from "antd";
import countryList from "react-select-country-list";
import "./Profile.css";
import { useFetchReviewsByClinicIdConditional } from "../../apis/reviews";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ShowServices from "../Clinic/ClinicDetail/showService";

function ProfileTab({ user }) {
  const [expanded, setExpanded] = useState(false); // State to manage expanded description
  const countries = useMemo(() => countryList().getData(), []);
  const countryData = countries.find((item) => item.value === user.countryCode);
  const id = user._id;
  const { data: apiReviews, isLoading: apiLoading } =
    useFetchReviewsByClinicIdConditional({ clinic_id: id });

  const averageRating = useMemo(() => {
    if (!apiReviews || apiReviews.length === 0) return 0;
    const sum = apiReviews.reduce((acc, review) => acc + review.stars, 0);
    return sum / apiReviews.length;
  }, [apiReviews]);

  function CustomHeart({ filledPercentage }) {
    return (
      <div className="relative">
        <FaRegHeart className="text-red-500 text-[14px] md:text-[20px]" />
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${filledPercentage}%` }}
        >
          <FaHeart className="text-red-500 text-[14px] md:text-[20px]" />
        </div>
      </div>
    );
  }

  // Function to toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Function to determine if the description exceeds the character limit
  const isLongDescription = (text) => text.length > 100; // Approx 180 chars for 2-3 lines

  return (
    <div className="flex justify-center items-center w-full">
      <div className="profile-container md:max-w-6xl w-[100%] flex-col 2lg:w-[100%]">
        <div className="profile-card">
          <div className="header">
            <h2 className="profile-title py-[10px]">Personal Information</h2>
          </div>
          <div className="profile-content">
            <div className="profile-image">
              <img
                src={user.image}
                alt="Profile Image"
              />
            </div>
            <div className="profile-details">
              {[
                { label: "Name", value: user?.title },
                { label: "Email", value: user.contact_details.email },
                { label: "Location", value: user.address },
                { label: "Country", value: countryData.label },
                {
                  label: "Description",
                  value: (
                    <>
                      {expanded || !isLongDescription(user.description)
                        ? user.description
                        : `${user.description.substring(0, 100)}...`}
                      {isLongDescription(user.description) && (
                        <button
                          onClick={toggleExpanded}
                          className="text-blue-500 underline"
                        >
                          {expanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </>
                  ),
                },
                {
                  label: "Rating",
                  value: (
                    <Rate
                      disabled
                      value={averageRating}
                      allowHalf
                      character={({ index }) => {
                        const fullHeartCount = Math.floor(averageRating);
                        const isHalfHeart = averageRating - fullHeartCount > 0;

                        if (index + 1 <= fullHeartCount) {
                          return (
                            <FaHeart className="text-red-500 text-[14px] md:text-[20px]" />
                          );
                        } else if (isHalfHeart && index === fullHeartCount) {
                          const filledPercentage =
                            (averageRating - fullHeartCount) * 100;
                          return (
                            <CustomHeart filledPercentage={filledPercentage} />
                          );
                        } else {
                          return (
                            <FaRegHeart className="text-red-500 text-[14px] md:text-[20px]" />
                          );
                        }
                      }}
                    />
                  ),
                },
                {
                  label: "All Reviews",
                  value: `(${apiLoading ? "Loading.." : apiReviews?.length})`,
                },
              ].map((detail) => (
                <ProfileDetail
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-[20px] mt-[30px] bg-white px-[20px] py-[20px] rounded-xl">
          <h2 className="text-2xl font-semibold mb-[10px]">
            Availability of Services
          </h2>
          <ShowServices clinic={user} />
        </div>
      </div>
    </div>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <div className="flex  flex-col md:flex-row items-start md:gap-y-0 gap-y-[10px] md:items-center mb-[15px] border-b-[1px] border-[#eee]">
      <p className="detail-label w-[20%] text-start">{label}:</p>
      <div className="detail-value w-[80%] ">{value}</div>
    </div>
  );
}

export default ProfileTab;
