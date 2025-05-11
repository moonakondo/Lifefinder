const IHospitals = require("../../model/hospital/auth");
const IUser = require("../../model/auth");
const { hospitalSchema } = require("../../utils/validationSchema");
const bcrypt = require("bcrypt");
const { generateToken, generateOTP } = require("../../utils/jwt");
const uploadImageCloudinary = require("../../utils/cloudinary");
const sendEmail = require("../../utils/sendOtp");
const Feedback = require("../../model/hospital/feedback");
const sendFeedbackEmail = require("../../utils/sendFeedback");
const ScrapClinics = require("../../model/clinic");

// Register a new hospital
const registerHospital = async (req, res) => {
  const {
    title,
    email,
    password,
    services,
    countryCode,
    city,
    address,
    description,
    image,
    phone,
    offset,
  } = req.body;

  const reqBody = { ...req.body, offsetTime: offset };
  delete reqBody.offset;

  // const { error } = hospitalSchema.validate(req.body);
  const { error } = hospitalSchema.validate(reqBody);
  if (error) {
    return res
      .status(400)
      .json({ message: `Validation error: ${error.details[0].message}` });
  }

  let hospitalExists = await IHospitals.findOne({ email });
  if (hospitalExists) {
    return res.status(400).json({
      message:
        "This email is already registered with our hospital services. Please use a different email.",
    });
  }

  // Check if email exists in user model
  let userExists = await IUser.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message:
        "This email is already registered as a user. Please use a different email for hospital or log in.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const contact_details = {
    phone: phone,
    email: email,
  };
  const ratingCount = 0;
  const otp = generateOTP();
  try {
    const newHospital = new IHospitals({
      title,
      email,
      password: hashedPassword,
      services,
      countryCode,
      city,
      address,
      description,
      image,
      contact_details,
      ratingCount,
      otp,
      offsetTime: offset,
    });

    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to register hospital: ${error.message}` });
    console.log("register api error: ", error.message);
  }
};

const loginHospital = async (req, res) => {
  const { email, password } = req.body;
  console.log(email + "   " + password);
  try {
    const hospital = await IHospitals.findOne({ email: email });
    console.log(hospital);

    // Check if hospital exists
    if (!hospital) {
      return res.status(401).json({
        message:
          "The email you entered is incorrect. Please check and try again.",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, hospital.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "The email or password you entered is incorrect. Please check and try again.",
      });
    }

    // Generate token for authentication
    const token = await generateToken(hospital.password);

    // Return success response with token and hospital data
    return res
      .status(200)
      .json({ message: "Login successful", token, hospital });
  } catch (error) {
    console.log("🚀 ~ loginHospital ~ error:", error);
    // Handle server errors
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await IHospitals.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// send Otp To hospital Email
const sendOTPHospital = async (req, res) => {
  const { email } = req.body;
  console.log("🚀 ~ sendOTP ~ email:", email);
  try {
    const user = await IHospitals.findOne({ email });
    console.log("🚀 ~ sendOTP ~ user:", user);

    if (!user) {
      return res.status(401).send({ message: "Hospital Not Found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp}`);
    const token = await generateToken(user.password);

    return res.status(200).send({ message: "OTP Sent", token });
  } catch (error) {
    console.log("🚀 ~ sendOTP ~ error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Verify Otp To hospital
const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  try {
    const user = await IHospitals.findOne({ otp });

    if (!user) {
      return res.status(401).send({ message: "Please Enter the Correct Otp" });
    }

    if (user.otp !== otp) {
      return res.status(401).send({ message: "Invalid OTP" });
    }

    const newOtp = generateOTP();
    user.otp = newOtp;
    user.otpVerified = true;
    await user.save();

    return res.status(200).send({ message: "OTP Verified", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Get hospital by ID
const getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await IHospitals.findById(id).select("-password");
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ result: hospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update hospital by ID
const updateHospitalById = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const updatedHospital = await IHospitals.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete hospital by ID
const deleteHospitalById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHospital = await IHospitals.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await IHospitals.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "User Not Found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({ message: "Password Updated", user: user });
  } catch (error) {
    return res.status(500).send({ message: "Server Error" });
  }
};

const feedBackHospital = async (req, res) => {
  const {
    clinic_email,
    name,
    email,
    countryValue,
    services,
    clinicName,
    clinicLocation,
    treatmentDate,
    overallRating,
    qualityRating,
    hygieneRating,
    costRating,
    waitingRating,
    postCareRating,
    experience,
    recommend,
    additionalComments,
  } = req.body;

  try {
    console.log("email", clinic_email);
    // Find the clinic by email
    // const [clinic2, clinic] = await Promise.all([
    //   ScrapClinics.findOne({ emails: clinic_email }),
    //   IHospitals.findOne({ email: clinic_email }),
    // ]);

    // console.log("ScrapClinics:", clinic2);
    // console.log("IHospitals:", clinic);

    // if (!clinic || !clinic2) {
    //   return res.status(400).send({ message: "Clinic not found!" });
    // }

    // Create a new feedback instance
    const feedback = new Feedback({
      name,
      email,
      countryValue,
      services,
      clinicName,
      clinicLocation,
      treatmentDate: new Date(treatmentDate),
      overallRating,
      qualityRating,
      hygieneRating,
      costRating,
      waitingRating,
      postCareRating,
      experience,
      recommend,
      additionalComments,
    });

    // Save the feedback to the database
    await feedback.save();

    await sendFeedbackEmail(clinic_email, {
      name,
      email,
      countryValue,
      services,
      clinicName,
      clinicLocation,
      treatmentDate,
      overallRating,
      qualityRating,
      hygieneRating,
      costRating,
      waitingRating,
      postCareRating,
      experience,
      recommend,
      additionalComments,
    });

    // Send success response
    res.status(201).send({ message: "Feedback submitted successfully!" });
  } catch (err) {
    console.error("Error processing feedback:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getFeedbacks = async (req, res) => {
  const clinicName = req.params.clinicName;
  console.log("Test Clinic Name Recieveing: ", clinicName);
  if (!clinicName) {
    return res.status(400).send({ message: "Clinic name is required" });
  }

  try {
    const feedbacks = await Feedback.find({ clinicName });

    if (feedbacks.length === 0) {
      return res
        .status(404)
        .send({ message: "No feedback found for the specified clinic name" });
    }
    res.status(200).send(feedbacks);
  } catch (err) {
    console.error("Error retrieving feedback:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const isClinic = async (req, res) => {
  try {
    const { email } = req.params;
    const clinic = await IHospitals.findOne({ email });

    if (clinic) {
      return res.json({ isClinic: true });
    }

    return res.json({ isClinic: false });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerHospital,
  loginHospital,
  getAllHospitals,
  getHospitalById,
  updateHospitalById,
  deleteHospitalById,
  updatePassword,
  verifyOTP,
  sendOTPHospital,
  feedBackHospital,
  getFeedbacks,
  isClinic,
};
