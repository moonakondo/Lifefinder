import React from "react";
import ShowReviews from "../Clinic/ClinicDetail/showReviews";

function ReviewsTab({ user }) {
  return (
    <div className="flex  w-full justify-center items-center">
      <ShowReviews
        containerClass={"w-full md:max-w-6xl mx-[30px] lg:mx-[0px]"}
        id={user._id}
        onReviewCount={(count) => console.log(`Total reviews: ${count}`)}
        onAverageRating={(rating) => console.log(`Average rating: ${rating}`)}
        clinic={user}
      />
    </div>
  );
}

export default ReviewsTab;
