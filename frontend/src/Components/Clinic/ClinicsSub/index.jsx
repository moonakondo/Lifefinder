import { useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import {
  Card,
  Form,
  Input,
  Layout,
  Result,
  Select,
  Spin,
  Radio,
  Button,
} from "antd";
import { HeartFilled } from "@ant-design/icons";
import ClinicsSubCategoryCard from "../Card/subCard";
import { FaClinicMedical } from "react-icons/fa";
import popular from "../Card/data.json";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import the icons
import {
  cities,
  ratingData,
  sortingOptions,
  childCategory2,
  allCategeories,
  services,
} from "./data";
import {
  useGetAvailableCountries,
  useGetSearchOptions,
} from "../../../apis/hospitals/scrapClinics";
import { isMainCategory } from "../../../utils/helpers";
import SEO from "../../Seo";

const { Option } = Select;

function ClinicsSubCategory() {
  const params = useParams();
  const locations = useLocation();
  const initialCategory = params.searchString;
  const { state, pathname } = useLocation();
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCountry, setSearchCountry] = useState(
    state?.searchCountry || ""
  );
  const [searchCity, setSearchCity] = useState(state?.searchCity || "");
  const [searchRating, setSearchRating] = useState("");
  const [searchService, setSearchService] = useState(state?.service || "");
  const [searchMiniService, setSearchMiniService] = useState("");
  const [searchServicePriceRange, setSearchServicePriceRange] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory); // Single selected category
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [start, setStart] = useState(0);
  const [childCategory, setChildCategory] = useState([]);
  const [categoriesToShow, setCategoriesToShow] = useState(10);
  const [sortOption, setSortOption] = useState("Our Top Clinics");
  const [showAll, setShowAll] = useState(false);
  const [showRelevantCategories, setShowRelevantCategories] = useState(true); // New state
  const [allCategeoriesFilter, setAllCategeoriesFilter] = useState(
    state?.allCategeoriesFilter ? state?.allCategeoriesFilter : "treatments"
  );

  const { data: searchData, isLoading } = useGetSearchOptions();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const batchSize = 20;
  const { data: availableCountries, isLoading: countriesLoading } =
    useGetAvailableCountries({
      searchString: searchCity,
    });
  useEffect(() => {
    fetchFilteredClinics();
  }, [
    start,
    selectedCategory,
    searchRating,
    searchService,
    sortOption,
    searchMiniService,
  ]);

  useEffect(() => {
    if (selectedCategory) {
      getChildCategories(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchFilteredClinics = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/clinics/subcategory", {
        params: {
          category: selectedCategory,
          clinicName: searchName,
          city: searchCity,
          rating: searchRating,
          subCategory: searchMiniService,
          services: searchService,
          priceRange: searchServicePriceRange, // Ensure the price range is included in the request
          page: start / batchSize + 1,
          limit: batchSize,
          countryCode: searchCountry,
          sort: sortOption, // Add sort option here
          mainCategeoryFilter: allCategeoriesFilter,
        },
      });

      const { documents, page, limit, totalItems } = response.data;

      setTotalItems(totalItems);

      setFilteredClinics((prevClinics) => {
        const prevClinicIds = new Set(prevClinics.map((clinic) => clinic._id));

        const uniqueNewClinics = documents
          .filter((clinic) => !prevClinicIds.has(clinic._id))
          .map((clinic) => ({
            ...clinic,
            _id: clinic._id,
            title: clinic.title,
          }));

        return [...prevClinics, ...uniqueNewClinics];
      });

      if (documents.length < batchSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    setStart(0);
    setFilteredClinics([]);
    setHasMore(true);
    fetchFilteredClinics();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleRadioChange = (e) => {
    setSelectedCategory(e.target.value);
    setStart(0);
    setSearchMiniService("");
    setSearchService("");
    setFilteredClinics([]);
    setHasMore(true);
    setShowRelevantCategories(true);
  };
  const handleRadioReset = (e) => {
    setSelectedCategory(e);
    setStart(0);
    setSearchMiniService("");
    setSearchService("");
    setFilteredClinics([]);
    setHasMore(true);
    setShowRelevantCategories(true);
  };

  const handlesubCategeoryChange = (e) => {
    setSearchMiniService(e.target.value);
    setStart(0);
    setFilteredClinics([]);
    setHasMore(true);
    setShowRelevantCategories(false);
  };

  const handleserviceChange = (e) => {
    setSearchService(e.target.value);
    setStart(0);
    setFilteredClinics([]);
    setHasMore(true);
  };

  const getChildCategories = async (category) => {
    try {
      const response = await axios.get("/clinic/category/main", {
        params: {
          searchString: category,
        },
      });
      const data = response.data.categories;
      setChildCategory(data);
    } catch (err) {}
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setStart(0);
    setFilteredClinics([]);
    setHasMore(true);
  };

  const handleRatingChange = (e) => {
    setSearchRating(e.target.value);
    setStart(0);
    setFilteredClinics([]);
    setHasMore(true);
  };

  const loadMoreClinics = () => {
    setStart((prevStart) => prevStart + batchSize);
  };

  const filteredChildCategories = childCategory2.filter((category) =>
    popular.find(
      (mainCategory) =>
        mainCategory.searchString === selectedCategory &&
        category.relate === mainCategory.title
    )
  );

  const relevantServices = services.filter(
    (service) => service.relate === searchMiniService
  );

  const availableCountriesSorted = availableCountries?.sort((a, b) =>
    a.countryName.localeCompare(b.countryName)
  );

  const sortingOptionSorted = sortingOptions?.sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const sortedCitiesOptions = cities?.sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  // const data = isLoading && searchData?.data;
  const normalizeData = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => (typeof item === "string" ? item : item.label));
  };

  const data =
    !isLoading && Array.isArray(searchData?.data) ? searchData.data : [];

  const normalizedData = normalizeData(data);
  const normalizedCategories = normalizeData(allCategeories);

  const sortedCategories = Array.from(new Set(normalizedData)).sort((a, b) =>
    a.localeCompare(b)
  );

  const resetCategories = () => {
    setSelectedCategory("treatments");
    setStart(0);
    setFilteredClinics([]);
    setHasMore(true);
    setSearchMiniService("");
    setShowRelevantCategories(true);
    setSearchService("");
  };

  return (
    <section className="w-full bg-gray-50">
      <SEO
        title="Find Top Clinics Near You - Browse All Clinics"
        description="Explore a wide range of clinics offering specialized healthcare services. Easily find and book appointments at the best clinics near you through our platform."
        keywords="find clinics, healthcare services, book appointments, top clinics, medical services, clinic locations"
      />
      <Spin spinning={loading}>
        <div className="w-[90%] mx-auto py-2">
          <Form
            className="bg-white shadow-lg rounded-lg px-4 py-6 md:px-8 md:py-8 mb-5"
            onSubmit={handleFormSubmit}
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Form.Item className="w-full">
                <Input
                  placeholder="Enter Clinic Name"
                  prefix={<FaClinicMedical className="text-clr1" />}
                  size="large"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </Form.Item>
              <Form.Item className="w-full">
                <Select
                  placeholder="Select a City"
                  size="large"
                  value={searchCity}
                  onChange={(value) => setSearchCity(value)}
                  showSearch
                >
                  <Option value="">Any City</Option>
                  {sortedCitiesOptions?.map((city) => (
                    <Option key={city.value} value={city.value}>
                      {city.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className="w-full">
                <Select
                  placeholder="Select a Country"
                  size="large"
                  value={searchCountry}
                  onChange={(value) => setSearchCountry(value)}
                  loading={countriesLoading}
                  showSearch
                >
                  <Option value="">Any Country</Option>
                  {availableCountriesSorted?.map((country) => (
                    <Option
                      key={country.countryCode}
                      value={country.countryCode}
                    >
                      {country.countryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
              <Form.Item className="w-full">
                <Select
                  placeholder="Select a Treatment"
                  size="large"
                  value={allCategeoriesFilter}
                  onChange={(value) => setAllCategeoriesFilter(value)}
                  showSearch
                >
                  {/* <Option value="treatments">All Treatments</Option> */}
                  <Option
                    value="treatments"
                    style={
                      isMainCategory("All Treatments")
                        ? {
                            fontWeight: "bold",
                            color: "blue",
                            fontSize: "24px",
                          }
                        : {}
                    }
                  >
                    All Treatments
                  </Option>
                  {sortedCategories.map((category) => (
                    <Option
                      key={category}
                      value={category}
                      style={
                        isMainCategory(category)
                          ? {
                              fontWeight: "bold",
                              color: "#000949",
                              fontSize: "15px",
                            }
                          : {}
                      }
                    >
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className="w-full">
                <Select
                  placeholder="Select Price Range"
                  size="large"
                  value={searchServicePriceRange}
                  onChange={(value) => setSearchServicePriceRange(value)}
                >
                  <Option value="">Any Price Range</Option>
                  <Option value="less_than_1000">Less than $1000</Option>
                  <Option value="1000_to_5000">$1000 - $5000</Option>
                  <Option value="5000_to_10000">$5000 - $10,000</Option>
                  <Option value="more_than_10000">More than $10,000</Option>
                </Select>
              </Form.Item>
              <Form.Item className="w-full lg:mt-[-3px] mt-6 ">
                <button
                  onClick={handleFormSubmit}
                  type="submit"
                  className="text-lg font-semibold w-full bg-clr1 hover:bg-white text-white py-[6px] px-4 rounded-full border-2 border-clr1 hover:text-clr1 transition duration-300 ease-in-out"
                >
                  Search
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="mid:container px-[20px] mx-auto flex flex-col lg:flex-row gap-6 ">
          <div className="bg-white shadow-lg rounded-2xl w-full lg:w-[40%] h-full">
            <div className="border-[1px] border-gray-300 rounded-t-2xl">
              <h2 className="text-white font-semibold text-lg  p-[10px] bg-blue-500 rounded-t-2xl">
                Use All Filters
              </h2>
              {selectedCategory !== "treatments" ? (
                <div className="border-[1px] border-gray-300 p-[10px]">
                  <h3 className="text-clr1 font-semibold mb-2">Filter by</h3>
                  <span
                    value="treatments"
                    className="text-base hover:text-blue-500 font-medium hover:underline cursor-pointer"
                    // onChange={resetCategories}
                    onClick={resetCategories}
                  >
                    All Treatments
                  </span>
                  {"   >"}{" "}
                  {searchMiniService ? (
                    <span
                      className="cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={() => handleRadioReset(selectedCategory)}
                    >
                      {
                        popular.find(
                          (item) => item.searchString === selectedCategory
                        )?.title
                      }{" "}
                    </span>
                  ) : (
                    <span>
                      {
                        popular.find(
                          (item) => item.searchString === selectedCategory
                        )?.title
                      }{" "}
                    </span>
                  )}
                  {searchMiniService ? (
                    <span>
                      {" "}
                      <span className="ml-[10px] mr-[10px]">{">"}</span>
                      {searchMiniService}
                    </span>
                  ) : null}
                </div>
              ) : (
                <div className="border-[1px] border-gray-300 p-[10px]">
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={selectedCategory}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center mb-2">
                      <FaClinicMedical className="text-clr1 mr-2" />
                      <Radio value="treatments" className="text-sm">
                        All Treatments
                      </Radio>
                    </div>
                    {(showAll ? popular : popular.slice(0, 5))
                      .sort((a, b) => a.title.localeCompare(b.title))
                      .map((item) => (
                        <div
                          key={item.title}
                          className="flex items-center mb-2"
                        >
                          <FaClinicMedical className="text-clr1 mr-2" />
                          <Radio value={item.searchString} className="text-sm">
                            {item.title}
                          </Radio>
                        </div>
                      ))}
                  </Radio.Group>
                  <div
                    className="flex items-center cursor-pointer mt-2 text-clr1"
                    onClick={toggleShowAll}
                  >
                    {showAll ? (
                      <>
                        <FaChevronUp className="mr-2" />
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="mr-2" />
                        <span>Show All ({popular.length})</span>
                      </>
                    )}
                  </div>
                </div>
              )}
              {/* Relevant Categories and Services Container */}
              {(selectedCategory || searchMiniService) && (
                <>
                  {selectedCategory &&
                    filteredChildCategories.length > 0 &&
                    showRelevantCategories && (
                      <div className="border-[1px] border-gray-300 p-[10px]">
                        <h3 className="text-clr1 font-semibold mb-2">
                          Relevant Treatments
                        </h3>
                        <Radio.Group
                          onChange={handlesubCategeoryChange}
                          value={searchMiniService}
                          className="flex flex-col gap-2"
                        >
                          <div className="flex items-center mb-2">
                            <FaClinicMedical className="text-clr1 mr-2" />
                            <Radio value={""} className="text-sm">
                              All Treatments
                            </Radio>
                          </div>
                          {filteredChildCategories
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((item) => (
                              <div
                                key={item.value}
                                className="flex items-center mb-2"
                              >
                                <FaClinicMedical className="text-clr1 mr-2" />
                                <Radio value={item.value} className="text-sm">
                                  {item.label}
                                </Radio>
                              </div>
                            ))}
                        </Radio.Group>
                      </div>
                    )}

                  {searchMiniService && relevantServices.length > 0 && (
                    <div className="border-[1px] border-gray-300 p-[10px]">
                      <h3 className="text-clr1 font-semibold mb-2">
                        Relevant Service
                      </h3>
                      <Radio.Group
                        onChange={handleserviceChange}
                        value={searchService}
                        className="flex flex-col gap-2"
                      >
                        {relevantServices[0].service
                          .sort((a, b) => a.localeCompare(b))
                          .map((service) => (
                            <div
                              key={service}
                              className="flex items-center mb-2"
                            >
                              <FaClinicMedical className="text-clr1 mr-2" />
                              <Radio value={service} className="text-sm">
                                {service}
                              </Radio>
                            </div>
                          ))}
                      </Radio.Group>
                    </div>
                  )}
                </>
              )}
              <div className="border-[1px] border-gray-300 p-[10px] flex flex-col ">
                <h3 className="text-clr1 font-semibold mb-2">Clinic Ratings</h3>
                <span className="text-sm font-medium">
                  Find high-quality clinics
                </span>
                <Radio.Group
                  onChange={handleRatingChange}
                  value={searchRating}
                  className="flex flex-col gap-2 mt-2"
                >
                  {ratingData.map((item) => (
                    <div key={item.title} className="flex items-center mb-2">
                      <FaClinicMedical className="text-clr1 mr-2" />
                      <Radio value={item.rating} className="text-sm">
                        {item.title}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="flex-grow w-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {totalItems && totalItems} Clinics Found
              </h2>
              <Select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full mb-4"
                size="large"
                dropdownClassName="animated-dropdown"
              >
                {sortingOptionSorted.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
            {totalItems === 0 && (
              <div className="flex justify-center items-center w-full h-[70vh]">
                <Result
                  status="404"
                  title="No Clinics Found"
                  subTitle="Sorry, we couldn't find any clinics matching your search."
                />
              </div>
            )}
            {filteredClinics.length !== 0 &&
              filteredClinics.map((item) => (
                <ClinicsSubCategoryCard key={item._id} facility={item} />
              ))}
            {hasMore && (
              <div className="flex justify-center items-center w-full mb-6">
                <button
                  className="bg-clr1 text-white px-6 py-2 hover:bg-transparent border-2 border-clr1 hover:text-clr1 rounded-lg"
                  onClick={loadMoreClinics}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </Spin>
    </section>
  );
}

export default ClinicsSubCategory;
