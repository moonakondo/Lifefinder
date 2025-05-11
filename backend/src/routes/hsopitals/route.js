const express = require("express");
const router = express.Router();
const hospitalController = require("../../controller/hospitals/auth");

// Register a new hospital
router.post("/register/hospital", hospitalController.registerHospital);

// Send Otp To Hospital
router.post("/send/otp/hospital", hospitalController.sendOTPHospital);

// Verify Otp
router.post("/verify/otp/hospital", hospitalController.verifyOTP);

// Login as a hospital
router.post("/login/hospital", hospitalController.loginHospital);

// FeedBack from Clinic
router.post("/clinic/feedback", hospitalController.feedBackHospital);

// Get Clinic Feedback
router.get("/getFeedbacks/:clinicName", hospitalController.getFeedbacks);

// Get all hospitals
router.get("/hospital", hospitalController.getAllHospitals);

// check for the clinic
router.get("/is-clinic/:email", hospitalController.isClinic);

// Get hospital by ID
router.get("/hospital/:id", hospitalController.getHospitalById);

// Update hospital by ID
router.put("/hospital/:id", hospitalController.updateHospitalById);

// Delete hospital by ID
router.delete("/hospital/:id", hospitalController.deleteHospitalById);

// Update Password
router.put("/updatePassword/hospital", hospitalController.updatePassword);

module.exports = router;
