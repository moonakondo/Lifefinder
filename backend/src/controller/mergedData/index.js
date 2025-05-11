const IHospitals = require("../../model/hospital/auth");
const ScrapClinics = require("../../model/clinic");
const { countries } = require("countries-list");

const getCountryDetails = async (req, res) => {
  try {
    const { searchString } = req.query;

    const scrapCountryPipeline = [
      { $match: { countryCode: { $ne: null } } },
      { $group: { _id: "$countryCode" } },
      { $project: { _id: 0, countryCode: "$_id" } },
    ];

    const iHospitalPipeline = [
      { $match: { countryCode: { $ne: null } } },
      { $group: { _id: "$countryCode" } },
      { $project: { _id: 0, countryCode: "$_id" } },
    ];

    if (searchString) {
      const searchStringRegex = new RegExp(searchString, "i");

      // Modify the pipeline to include an OR condition
      scrapCountryPipeline.unshift({
        $match: {
          $or: [{ city: searchStringRegex }, { title: searchStringRegex }],
        },
      });

      iHospitalPipeline.unshift({
        $match: {
          $or: [{ city: searchStringRegex }, { title: searchStringRegex }],
        },
      });
    }

    const scrapCountryDetails = await ScrapClinics.aggregate(
      scrapCountryPipeline
    );
    const iHospitalDetails = await IHospitals.aggregate(iHospitalPipeline);

    const countryCodesSet = new Set([
      ...scrapCountryDetails.map((item) => item.countryCode),
      ...iHospitalDetails.map((item) => item.countryCode),
    ]);

    const countryCodesArray = Array.from(countryCodesSet).sort();

    const countryDetails = countryCodesArray.map((code) => ({
      countryCode: code,
      countryName: countries[code]?.name || "Unknown",
    }));

    res.status(200).send(countryDetails);
  } catch (err) {
    console.error("Error fetching country details:", err);
    res.status(500).send({ message: "Server Error", error: err });
  }
};

const getClinics = async (req, res) => {
  try {
    const {
      category,
      clinicName,
      countryCode,
      city,
      rating,
      priceRange,
      subCategory,
      services,
      mainCategeoryFilter,
      page = 1,
      limit = 20,
      sort = "average_rating", // Default sort by average rating
    } = req.query;

    if (!category) {
      return res.status(400).send({ message: "Category is required" });
    }

    // Initialize match stages for both collections
    const matchScrapClinics = { $match: {} };
    const matchIHospitals = { $match: {} };

    // Handling category and mainCategeoryFilter
    if (category !== "treatments") {
      const regexFilter = { $regex: category, $options: "i" };
      matchScrapClinics.$match.$or = [
        { searchString: category },
        { mainCategory: { $regex: category, $options: "i" } },
      ];
      matchIHospitals.$match.$or = [
        { title: regexFilter },
        { "services.serviceName": regexFilter },
      ];
    }

    if (mainCategeoryFilter && mainCategeoryFilter !== "treatments") {
      const regexFilter = { $regex: mainCategeoryFilter, $options: "i" };
      matchScrapClinics.$match.$or = [
        { searchString: regexFilter },
        { categories: regexFilter },
        { subCategory: regexFilter },
        { service: regexFilter },
        { mainCategory: regexFilter },
      ];
      matchIHospitals.$match.$or = [
        { title: regexFilter },
        { "services.serviceName": regexFilter },
      ];
    }

    // Apply other filters
    if (clinicName) {
      const nameFilter = { $regex: clinicName, $options: "i" };
      matchScrapClinics.$match.title = nameFilter;
      matchIHospitals.$match.title = nameFilter;
    }
    if (city) {
      const cityFilter = { $regex: city, $options: "i" };
      matchScrapClinics.$match.$or = [
        { city: cityFilter },
        { title: cityFilter },
        { state: cityFilter },
      ];
      matchIHospitals.$match.city = city;
    }
    if (countryCode) {
      matchScrapClinics.$match.countryCode = countryCode;
      matchIHospitals.$match.countryCode = countryCode;
    }
    if (rating && rating !== "reset") {
      matchScrapClinics.$match.totalScore = Number(rating);
      matchIHospitals.$match.totalScore = Number(rating);
    }

    if (services) {
      const servicesFilter = { $regex: services, $options: "i" };
      matchScrapClinics.$match.$or = [
        { categories: servicesFilter },
        { service: servicesFilter },
      ];
    }
    if (subCategory) {
      const regexFilter2 = { $regex: subCategory, $options: "i" };
      matchScrapClinics.$match.subCategory = regexFilter2;
      matchIHospitals.$match.$or = [{ "services.serviceName": regexFilter2 }];
    }

    if (priceRange) {
      const priceConditions = [];
      switch (priceRange) {
        case "less_than_1000":
          priceConditions.push({ price: { $lt: 1000 } });
          break;
        case "1000_to_5000":
          priceConditions.push({ price: { $gte: 1000, $lte: 5000 } });
          break;
        case "5000_to_10000":
          priceConditions.push({ price: { $gte: 5000, $lte: 10000 } });
          break;
        case "more_than_10000":
          priceConditions.push({ price: { $gt: 10000 } });
          break;
        default:
          break;
      }
      if (priceConditions.length) {
        matchScrapClinics.$match.$and = priceConditions;
      }
    }

    // Define the sort logic
    const sortOptions = {
      average_rating: { averageRating: -1 }, // Sort by average rating in descending order
      price_asc: { price: 1, "services.servicePrice": 1 },
      best_review_low_price: {
        averageRating: -1,
        price: 1,
        "services.servicePrice": 1,
      },
      rating_desc: { averageRating: -1 },
      rating_asc: { averageRating: 1 },
    };

    const sortQuery = sortOptions[sort] || { averageRating: -1 };

    // Fetch data from ScrapClinics collection
    const scrapClinicsQuery = ScrapClinics.aggregate([
      matchScrapClinics,
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: ["$reviewsCount", 0] },
              then: {
                $divide: [
                  {
                    $add: [
                      { $multiply: ["$reviewsDistribution.oneStar", 1] },
                      { $multiply: ["$reviewsDistribution.twoStar", 2] },
                      { $multiply: ["$reviewsDistribution.threeStar", 3] },
                      { $multiply: ["$reviewsDistribution.fourStar", 4] },
                      { $multiply: ["$reviewsDistribution.fiveStar", 5] },
                    ],
                  },
                  "$reviewsCount",
                ],
              },
              else: 0,
            },
          },
        },
      },
      { $sort: sortQuery },
    ]);

    const skip = (page - 1) * limit;
    const scrapClinics = await scrapClinicsQuery
      .skip(skip)
      .limit(Number(limit))
      .exec();

    // Fetch data from IHospitals collection
    const ihospitalsQuery = IHospitals.aggregate([
      matchIHospitals,
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "clinic_id",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$reviews" }, 0] },
              then: { $avg: "$reviews.stars" },
              else: 0,
            },
          },
        },
      },
      { $sort: sortQuery },
    ]);

    const ihospitals = await ihospitalsQuery
      .skip(skip)
      .limit(Number(limit))
      .exec();
    const totalScrapClinics = await ScrapClinics.countDocuments(
      matchScrapClinics.$match
    );
    const totalIHospitals = await IHospitals.countDocuments(
      matchIHospitals.$match
    );
    // Combine results
    const combinedResults = [...scrapClinics, ...ihospitals];

    console.log(`Found ${combinedResults.length} combined clinic documents`);

    return res.status(200).json({
      documents: combinedResults,
      page: Number(page),
      limit: Number(limit),
      totalItems: totalScrapClinics + totalIHospitals,
    });
  } catch (err) {
    console.error("Error fetching documents:", err);
    return res
      .status(500)
      .send({ message: "Server Error", error: err.message });
  }
};

const getCategoriesChild = async (req, res) => {
  try {
    const { searchString } = req.query;
    if (!searchString) {
      return res.status(400).send({ message: "Search string is required" });
    }

    console.log(`Received search string: ${searchString}`);

    let query = {};

    // Modify the query based on searchString
    if (searchString === "treatments") {
      // Fetch all documents if searchString is "treatments"
      console.log(`Fetching all categories as search string is 'treatments'`);
    } else {
      // Filter documents based on searchString
      query.searchString = searchString;
    }

    // Fetch documents based on the query
    const documents = await ScrapClinics.find(query, "categories").exec();

    // Check if any documents are found
    // if (documents.length === 0) {
    //   return res
    //     .status(404)
    //     .send({ message: "No documents found for the provided search string" });
    // }

    // Use a Set to store unique categories
    const uniqueCategories = new Set();

    // Iterate through documents and add categories to the Set
    documents.forEach((doc) => {
      if (doc.categories) {
        doc.categories.forEach((category) => uniqueCategories.add(category));
      }
    });

    // Convert Set to Array
    const categoriesArray = Array.from(uniqueCategories);

    // Check if categories are found
    // if (categoriesArray.length === 0) {
    //   return res.status(404).send({
    //     message: "No categories found for the provided search string",
    //   });
    // }

    console.log(`Total unique categories returned: ${categoriesArray.length}`);

    return res.status(200).json({ categories: categoriesArray });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res
      .status(500)
      .send({ message: "Server Error", error: err.message });
  }
};

const getCategoriesApi = async (req, res) => {
  try {
    // Get main categories, subcategories, and services from ScrapHospital collection
    const scrapHospitalData = await ScrapClinics.aggregate([
      {
        $project: {
          mainCategory: "$mainCategory",
          subCategory: "$subCategory",
          services: "$categories",
        },
      },
      {
        $group: {
          _id: null,
          mainCategories: { $addToSet: "$mainCategory" },
          subCategories: { $addToSet: "$subCategory" },
          services: { $addToSet: "$services" },
        },
      },
      {
        $project: {
          _id: 0,
          mainCategories: 1,
          subCategories: 1,
          services: {
            $reduce: {
              input: "$services",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);

    // Get services from Ihospital collection
    const ihospitalData = await IHospitals.aggregate([
      { $unwind: "$services" },
      {
        $group: {
          _id: null,
          services: { $addToSet: "$services.serviceName" },
        },
      },
      { $project: { _id: 0, services: 1 } },
    ]);

    // Combine results
    const allCategoriesSet = new Set([
      ...(scrapHospitalData.length ? scrapHospitalData[0].mainCategories : []),
      ...(scrapHospitalData.length ? scrapHospitalData[0].subCategories : []),
      ...(scrapHospitalData.length ? scrapHospitalData[0].services : []),
      ...(ihospitalData.length ? ihospitalData[0].services : []),
    ]);

    const allCategories = Array.from(allCategoriesSet);

    res.status(200).send({
      messsage: "Categories Retrieved Successfully",
      data: allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
};

const getCategoriesMainValue = async (req, res) => {
  try {
    const { searchString } = req.query;
    if (!searchString) {
      return res.status(400).send({ message: "Search string is required" });
    }

    console.log(`Received search string: ${searchString}`);

    let query = {};

    if (searchString === "treatments") {
      console.log(`Fetching all categories as search string is 'treatments'`);
    } else {
      query.searchString = { $regex: searchString, $options: "i" };
    }

    const documents = await ScrapClinics.find(query, "categories").exec();

    const categoryCounts = new Map();
    const check = ["doctor", "clinic", "hospital", "service", "surgeon"];

    documents.forEach((doc) => {
      // Process categories
      if (doc.categories) {
        doc.categories.forEach((category) => {
          if (!check.includes(category.toLowerCase())) {
            categoryCounts.set(
              category,
              (categoryCounts.get(category) || 0) + 1
            );
          } else {
            categoryCounts.set(category, 1);
          }
        });
      }
      // Process subCategories
      if (doc.subCategory) {
        doc.subCategory.forEach((subCategory) => {
          if (!check.includes(subCategory.toLowerCase())) {
            categoryCounts.set(
              subCategory,
              (categoryCounts.get(subCategory) || 0) + 1
            );
          } else {
            categoryCounts.set(subCategory, 1);
          }
        });
      }
    });

    const categoriesArray = Array.from(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .map((item) => item[0]);

    console.log(
      `Total unique categories and subcategories returned: ${categoriesArray.length}`
    );

    return res.status(200).json({ categories: categoriesArray });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res
      .status(500)
      .send({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  getCountryDetails,
  getClinics,
  getCategoriesApi,
  getCategoriesChild,
  getCategoriesMainValue,
};
