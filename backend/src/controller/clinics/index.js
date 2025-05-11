const ScrapClinics = require("../../model/clinic");

const getLatestClinics = async (req, res) => {
  const page = 1;
  const limit = 12;
  try {
    const clinics = await ScrapClinics.find()
      .skip((page - 1) * limit) // Calculate number of documents to skip
      .limit(limit); // Limit the number of documents returned

    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hospital by ID
const getClinicById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await ScrapClinics.findById(id);
    if (!hospital) {
      return res.status(200).json({ messages: "Hospital not found" });
    }
    res.status(200).json({ result: hospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClinicById,
  getLatestClinics,
};
