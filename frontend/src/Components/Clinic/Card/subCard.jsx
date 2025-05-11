import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import {
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { message, Rate, Skeleton } from "antd";
import CountryInfo from "../CountryInfo";
import { useNavigate } from "react-router-dom";

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

const ClinicsSubCategoryCard = ({ facility }) => {
  const [loading, setLoading] = useState(true);
  const [secondReviewCount, setSecondReviewCount] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAverageRating = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get("/get/review", {
          params: {
            clinic_id: id,
          },
        });
        const reviews = response.data;
        setSecondReviewCount(reviews);
        if (reviews && reviews.length > 0) {
          const totalRating = reviews.reduce(
            (total, review) => total + review.stars,
            0
          );
          const averageRating = totalRating / reviews.length;
          setAverageRating(averageRating);
        } else {
          setAverageRating(0);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setAverageRating(0);
      } finally {
        setLoading(false);
      }
    };

    if (facility.role === "adminmain") {
      fetchAverageRating(facility._id);
    } else {
      const localReviews = facility?.reviews || [];
      const totalRating = localReviews.reduce(
        (sum, review) => sum + (review.stars || review.rating || 0),
        0
      );
      const averageRating =
        localReviews.length > 0 ? totalRating / localReviews.length : 0;
      setAverageRating(averageRating);
      setLoading(false);
    }
  }, [facility]);

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 flex flex-row items-start w-full gap-4 p-4">
        <Skeleton.Image className="w-[380px] h-[320px] rounded-lg" />
        <div className="px-4 flex-1">
          <Skeleton active />
        </div>
      </div>
    );
  }

  const handleReviewClick = () => {
    navigate(`/clinics/${facility._id}#reviews`);
    setTimeout(() => {
      const reviewsSection = document.getElementById("reviews");
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 flex flex-col w-full gap-x-[3px] p-4">
      <div className="flex sm:flex-row flex-col items-start gap-x-[3px]">
        {facility.image ? (
          <img
            src={facility.image}
            loading="lazy"
            alt={facility.title}
            className="w-full h-[220px] sm:h-[240px] xs:w-[140px] xs:h-[240px] md:w-[240px] md:h-[240px] object-cover rounded-lg"
          />
        ) : facility.imageUrls && facility.imageUrls.length > 0 ? (
          <img
            src={facility.imageUrls[0]}
            loading="lazy"
            alt={facility.title}
            className="w-full h-[220px] sm:w-[140px] sm:h-[240px] xs:h-[240px]  md:w-[240px] md:h-[240px] object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-[220px] sm:w-[140px] sm:h-[240px] xs:h-[240px] md:w-[240px] md:h-[240px] rounded-lg flex items-center justify-center border border-gray-300 bg-gray-300">
            <span className="text-white text-xl font-semibold text-center">
              Image Not Available
            </span>
          </div>
        )}
        <div className="px-0 xxss:px-4 flex-1 flex flex-col h-full">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-between  sm:mt-0 mt-[10px]  flex-row xxss:flex-col md:flex-row  items-start gap-x-[20px]">
              <h2 className="text-[16px] md:text-[20px] font-semibold text-gray-800 line-clamp-2">
                {facility.title}
              </h2>
              <div className="flex items-center justify-start whitespace-nowrap xxss:whitespace-pre md:whitespace-nowrap">
                <Rate
                  disabled
                  value={averageRating}
                  allowHalf
                  character={({ index }) => {
                    const ratingValue = averageRating;
                    const fullHeartCount = Math.floor(ratingValue);
                    const isHalfHeart = ratingValue - fullHeartCount > 0;

                    if (index + 1 <= fullHeartCount) {
                      return (
                        <FaHeart className="text-red-500 text-[14px] md:text-[20px]" />
                      );
                    } else if (isHalfHeart && index === fullHeartCount) {
                      const filledPercentage =
                        (ratingValue - fullHeartCount) * 100;
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
                <span className="ml-2 text-lg text-gray-700">
                  (
                  {averageRating % 1 === 0
                    ? averageRating.toFixed(0)
                    : averageRating.toFixed(1)}
                  )
                </span>
              </div>
            </div>
            <div className="flex flex-row xxss:flex-col md:flex-row justify-between mb-[8px]">
              <h2 className="text-[16px] md:text-[18px] font-bold text-gray-500 line-clamp-2 flex flex-row gap-x-[7px] pt-[3px]">
                Price:
                <span className="text-[16px] md:text-[18px] font-medium text-blue-500 line-clamp-2">
                  {facility?.price
                    ? typeof facility.price === "number"
                      ? `$${facility.price}`
                      : facility.price.includes("$")
                      ? facility.price
                      : `$${facility.price}`
                    : facility?.services?.[0]?.servicePrice
                    ? typeof facility.services[0].servicePrice === "number"
                      ? `$${facility.services[0].servicePrice}`
                      : facility.services[0].servicePrice.includes("$")
                      ? facility.services[0].servicePrice
                      : `$${facility.services[0].servicePrice}`
                    : "U/A"}{" "}
                </span>
              </h2>
              <div
                className="flex items-end hover:text-blue-500 hover:underline cursor-pointer"
                onClick={handleReviewClick}
              >
                <span>
                  All Reviews (
                  {facility?.reviews?.length
                    ? facility?.reviews?.length
                    : secondReviewCount.length
                    ? secondReviewCount.length
                    : 0}
                  )
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => navigate(`/clinics/${facility._id}#review`)}
                className="w-full xxss:mt-0 mt-[10px] xxss:w-auto xxss:px-3 md:px-5 py-[4.5px] rounded-md md:rounded-lg bg-sky-400 hover:bg-transparent hover:text-clr1 text-[14px] md:text-base text-white font-medium md:font-semibold border-2 border-transparent hover:border-clr1 transition-all duration-300 ease-in-out"
              >
                Leave a review
              </button>
            </div>
            <CountryInfo
              countryCode={facility.countryCode}
              city={facility?.city || facility?.state}
              Class={"justify-between"}
              detail={true}
            />
            <p className="text-base text-gray-600 font-medium line-clamp-2">
              {facility.description}
            </p>
          </div>
          <div className="flex w-full h-full justify-end items-end gap-[1.5rem] mt-[.7rem]">
          <button
              onClick={() => navigate(`/clinics/${facility._id}`, { state: { bookState: 'book' } })}
              className={`w-full xxss:mt-0 mt-[10px] xxss:w-auto xxss:px-3 md:px-6 py-[5px] rounded-md md:rounded-lg bg-[#1abc9c] hover:bg-transparent hover:text-clr1 hover:border-clr1 text-[14px] md:text-base text-white font-medium md:font-semibold border-2 border-[#1abc9c] transition-all duration-300 ease-in-out ${!facility?.subscribed && 'opacity-50'}`}
              disabled={!facility?.subscribed}
            >
              Book Consultation
            </button>

            <button
              onClick={() => navigate(`/clinics/${facility._id}`)}
              className="w-full xxss:mt-0 mt-[10px] xxss:w-auto xxss:px-3 md:px-6 py-[5px] rounded-md md:rounded-lg bg-clr1 hover:bg-transparent hover:text-clr1 text-[14px] md:text-base text-white font-medium md:font-semibold border-2 border-clr1 transition-all duration-300 ease-in-out"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicsSubCategoryCard;
