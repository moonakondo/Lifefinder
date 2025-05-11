const express = require('express');
const { addReview, getReview, getReviewbyId } = require('../controller/review');

const reviewRouter = express.Router();

reviewRouter.post("/addReview", addReview);
reviewRouter.get("/getReviews", getReview);
reviewRouter.get("/get/review", getReviewbyId);

module.exports = reviewRouter;