const express = require("express");
const scrapRoutes = express.Router();
const {
  getClinicById,
  getLatestClinics,
} = require("../controller/clinics/index");
const {
  getCountryDetails,
  getClinics,
  getCategoriesChild,
  getCategoriesApi,
  getCategoriesMainValue,
} = require("../controller/mergedData");

scrapRoutes.get("/latest/clinics", getLatestClinics);
scrapRoutes.get("/get/country", getCountryDetails);
scrapRoutes.get("/clinic/:id", getClinicById);
scrapRoutes.get("/clinics/subcategory", getClinics);
scrapRoutes.get("/clinic/category/main", getCategoriesChild);
scrapRoutes.get("/clinic/category/child", getCategoriesMainValue);
scrapRoutes.get("/clinic/categories/search", getCategoriesApi);

// scrapRoutes.get("/clinics/search");

module.exports = scrapRoutes;
