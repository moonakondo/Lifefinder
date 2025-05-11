const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    countryValue: { type: String, required: true },
    services: { type: [String], required: true },
    clinicName: { type: String, required: true },
    clinicLocation: { type: String, required: true },
    treatmentDate: { type: Date, required: true },
    overallRating: { type: Number, min: 0, max: 5, required: true },
    qualityRating: { type: Number, min: 0, max: 5, required: true },
    hygieneRating: { type: Number, min: 0, max: 5, required: true },
    costRating: { type: Number, min: 0, max: 5, required: true },
    waitingRating: { type: Number, min: 0, max: 5, required: true },
    postCareRating: { type: Number, min: 0, max: 5, required: true },
    experience: { type: String, trim: true },
    recommend: { type: Boolean, required: true },
    additionalComments: { type: String, trim: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the model from the schema
const Feedback = mongoose.model("feedback", feedbackSchema);

module.exports = Feedback;
