import React, { useState, useEffect } from "react";
import { Card, Avatar, Rate, Button } from "antd";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useFetchReviewsByClinicIdConditional } from "../../../apis/reviews";
import axios from "../../../services/axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ShowReviews({ id, onReviewCount, onAverageRating, containerClass }) {
  const { Meta } = Card;
  const { data: apiReviews, isLoading: apiLoading } =
    useFetchReviewsByClinicIdConditional({ clinic_id: id });

  const [fileReviews, setFileReviews] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(20);
  const [batchSize, setBatchSize] = useState(20);
  const [apiMergedReviews, setApiMergedReviews] = useState([]);

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const { data } = await axios.get(`/clinic/${id}`);
        setFileReviews(data.result?.reviews || []);
      } catch (error) {
        console.error("Error fetching clinic data:", error);
      }
    };

    fetchClinicData();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      let merged = [];

      if (Array.isArray(apiReviews)) {
        await Promise.all(
          apiReviews.map(async (review) => {
            try {
              const userDetails = review.user_id
                ? await getUserDetails(review.user_id)
                : null;
              merged.push({
                ...review,
                name: userDetails
                  ? `${userDetails.result.firstName} ${userDetails.result.lastName}`
                  : "Unknown",
                avatar: userDetails?.result.imageUrl || "",
              });
            } catch (error) {
              console.error(
                `Error fetching user details for review: ${review._id}`,
                error
              );
            }
          })
        );
      }

      const allReviews = [...merged, ...fileReviews];
      setApiMergedReviews(allReviews);

      onReviewCount(allReviews.length);

      const totalRating = allReviews.reduce(
        (sum, review) => sum + (review.stars || review.rating || 0),
        0
      );
      const avgRating =
        allReviews.length > 0 ? totalRating / allReviews.length : 0;
      onAverageRating(avgRating);
    };

    fetchReviews();
  }, [apiReviews, fileReviews, onReviewCount, onAverageRating]);

  const getUserDetails = async (userId) => {
    try {
      const { data } = await axios.get(`/user/${userId}`);
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  const toggleExpand = (reviewId) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + batchSize);
  };

  const renderDescription = (review) => {
    const content = review.text || review.comment;
    const isExpanded = expandedReviews.includes(review._id);

    if (!content) return null;

    const maxLength = 200;
    const truncatedContent =
      content.length > maxLength
        ? content.slice(0, maxLength) + "..."
        : content;

    return (
      <>
        {review.stars ? (
          <Rate
            disabled
            defaultValue={review.stars}
            allowHalf
            character={({ index }) => (
              <span>
                {index < review.stars ? (
                  <FaHeart className="text-red-500 text-[20px]" />
                ) : (
                  <FaRegHeart className="text-red-500 text-[20px]" />
                )}
              </span>
            )}
          />
        ) : (
          <Rate
            disabled
            defaultValue={review.rating}
            allowHalf
            character={({ index }) => (
              <span>
                {index < review.rating ? (
                  <FaHeart className="text-red-500 text-[20px]" />
                ) : (
                  <FaRegHeart className="text-red-500 text-[20px]" />
                )}
              </span>
            )}
          />
        )}

        <div className="mt-2 text-lg font-medium text-gray-700">
          {isExpanded ? content : truncatedContent}
        </div>
        {content.length > maxLength && (
          <button
            type="button"
            onClick={() => toggleExpand(review._id)}
            className="text-white bg-clr1 px-[10px] py-[3px] rounded-lg mt-[10px] font-semibold hover:bg-transparent hover:text-clr1 border-2 border-clr1 transition-all duration-300 ease-in-out"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </>
    );
  };

  const renderDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid date";
    }
  };

  return (
    <div
      className={`container  mt-8 px-[2vw] shadow-2xl bg-white  rounded-xl mb-[50px] w-full ${containerClass}`}
    >
      <h2 className="text-3xl font-extrabold mt-8 text-gray-800 p-2">
        Reviews
      </h2>
      <span className="text-xl font-semibold p-2 text-gray-600">
        {apiMergedReviews.length} results found
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6 pb-12">
        {apiMergedReviews.length > 0
          ? apiMergedReviews.slice(0, visibleReviews).map((review) => (
              <Card
                key={review?._id}
                className={`shadow-lg rounded-lg mb-4 ${
                  expandedReviews.includes(review._id)
                    ? "review-main"
                    : "overflow-hidden"
                }`}
              >
                <Meta
                  avatar={
                    <Avatar
                      src={review?.avatar || review.reviewerPhotoUrl}
                      size={40}
                    />
                  }
                  title={
                    <div className="flex flex-col 2lg:flex-row justify-between">
                      <span className="text-xl font-bold text-gray-800">
                        {review.name || review.userName}
                      </span>
                      <span className="text-base font-semibold text-gray-500">
                        {review.publishedAtDate
                          ? renderDate(review.publishedAtDate)
                          : renderDate(review.createdAt)}
                      </span>
                    </div>
                  }
                  description={renderDescription(review)}
                />
              </Card>
            ))
          : null}
      </div>
      {apiMergedReviews.length === 0 && (
        <div className="w-full text-center pb-[20px]">
          <h2 className="text-2xl font-semibold text-gray-700">
            No reviews yet
          </h2>
          <p className="text-lg text-gray-500">
            Be the first to leave a review for this clinic.
          </p>
        </div>
      )}
      {visibleReviews < apiMergedReviews.length && (
        <div className="flex justify-center">
          <Button
            type="primary"
            className="!w-[200px] md:w-auto !mb-[20px] !bg-clr1 hover:!bg-transparent border-2 border-clr1 hover:!text-clr1 font-semibold text-lg h-[50px]"
            onClick={loadMoreReviews}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShowReviews;
