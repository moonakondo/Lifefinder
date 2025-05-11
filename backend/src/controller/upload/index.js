// const express = require("express");
// const uploadImageCloudinary = require("../../utils/cloudinary");
const { SERVER_URL } = require("../../config");

const uploadImage = async (req, res) => {
  console.log("🚀 ~ uploadImage ~ req:", req.file)
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // const filePath = req.file.path;
    // const url = await uploadImageCloudinary(filePath);
    // res.json({ filePath: url });
    res.json({ filePath: `${SERVER_URL}/static/uploads/${req.file.filename}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { uploadImage };