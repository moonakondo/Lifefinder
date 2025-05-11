const Review = require("../../model/review");

const addReview = async (req, res) => {
  const {
    user_id,
    clinic_id,
    userName,
    comment,
    stars,
    treatmentType,
    treatmentDate,
  } = req.body;

  try {
    const newReview = new Review({
      user_id,
      clinic_id,
      userName,
      comment,
      treatmentType,
      treatmentDate,
      stars,
      createdAt: new Date(),
    });
    newReview.save();
    res.status(200).json({ message: "Review Added Successfully" });
  } catch (error) {
    res.status(401).json({ message: "failed to add review" });
    console.log("Error in Adding Review: ", error);
  }
};

const getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(401).json({ message: "failed to get reviews" });
    console.log("Error in Fetching Reviews");
  }
};


const getReviewbyId = async (req, res) => {
  const { clinic_id } = req.query; // Assuming clinic_id is passed as a query parameter

  try {
    // Find reviews by clinic_id
    const reviews = await Review.find({ clinic_id });

    if (!reviews) {
      return res.status(404).json({ message: "No reviews found for this clinic" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to get reviews" });
    console.error("Error in Fetching Reviews: ", error);
  }
};


module.exports = { addReview, getReview, getReviewbyId };
