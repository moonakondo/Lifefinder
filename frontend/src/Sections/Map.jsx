import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Form, Select, Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { secondCategories } from "../utils/helpers";

import {
  useGetAvailableCountries,
  useGetSearchOptions,
} from "../apis/hospitals/scrapClinics";
import { categories } from "./data";
import { isMainCategory, normalizeData } from "../utils/helpers";
import axios from "../services/axios";

const { Option } = Select;

const SetMapCenter = ({ center, zoomLevel }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoomLevel);
    }
  }, [center, zoomLevel, map]);
  return null;
};

function MapHome() {
  const [searchLocation, setSearchLocation] = useState("");
  const [zoomLevel, setZoomLevel] = useState(2);
  const [countriesData, setCountriesData] = useState([]);
  const [current, setCurrent] = useState("treatments");
  const [visible, setVisible] = useState(false);
  const { data: searchData, isLoading } = useGetSearchOptions();
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState([]);
  const navigate = useNavigate();

  const { data: availableCountries, isLoading: countriesLoading } =
    useGetAvailableCountries({
      searchString: null,
    });

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        let fetchedData = [];
        for (let category of sortedCategories) {
          const response = await axios.get(
            `/clinic/category/child?searchString=${category.value}`
          );
          fetchedData.push({
            category: category.label,
            subCategories: response.data.categories,
          });
        }
        setCategoriesWithSubcategories(fetchedData);
      } catch (error) {
        console.log("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      if (availableCountries && availableCountries.length > 0) {
        try {
          const countriesWithCoordinates = await Promise.all(
            availableCountries.map(async (country) => {
              const countryCode = country.countryCode.trim(); // Remove any extra whitespace
              const response = await fetch(
                `https://restcountries.com/v3.1/alpha/${countryCode}`
              );
              const countryData = await response.json();
              return {
                ...country,
                coordinates: countryData[0]?.latlng || [20.5937, 78.9629], // Default coordinates
              };
            })
          );
          setCountriesData(countriesWithCoordinates);
        } catch (error) {
          console.error("Failed to fetch countries:", error);
        }
      }
    };

    fetchCountries();
  }, [availableCountries]);

  const customIcon = new L.Icon({
    iconUrl: "/assests/map.webp",
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

  const handleMarkerClick = (countryCode) => {
    const searchCityObj = {
      searchCountry: countryCode,
      allCategeoriesFilter: current,
    };
    navigate(`/clinics/sub/treatments`, { state: searchCityObj });
  };

  const onSearch = () => {
    const searchCityObj = {
      searchCountry: searchLocation,
      allCategeoriesFilter: current,
    };
    console.log("searchCity", searchLocation);
    navigate(`/clinics/sub/treatments`, { state: searchCityObj });
  };

  const availableCountriesSorted = availableCountries?.sort((a, b) =>
    a.countryName.localeCompare(b.countryName)
  );

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    setVisible(false);
    console.log(`You selected ${e.key}`);
  };

  const sortedCategories = Array.from(new Set(secondCategories)).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const menu = (
    <Menu
      onClick={handleMenuClick}
      selectedKeys={[current]}
      className="w-full bg-white border border-gray-300 rounded-md shadow-sm overflow-y-auto h-[220px] scroll-category"
    >
      <Menu.Item key="treatments" className="hover:bg-gray-100">
        All Treatments
      </Menu.Item>
      {categoriesWithSubcategories.map((item) => (
        <Menu.SubMenu
          popupClassName="mobile-submenu-popup"
          key={item.category}
          title={<span className="px-3 py-2">{item.category}</span>}
        >
          {item.subCategories.length ? (
            <>
              <Menu.Item key={`${item.category}`} className="hover:bg-gray-100">
                All {item.category} {/* Dynamically showing current category */}
              </Menu.Item>
              {item.subCategories.slice(0, 10).map((subCategory) => (
                <Menu.Item key={subCategory} className="hover:bg-gray-100">
                  {subCategory}
                </Menu.Item>
              ))}
            </>
          ) : (
            <Menu.Item disabled className="!l-[30px]">
              <span>Data is not available</span>
            </Menu.Item>
          )}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  return (
    <section className="flex flex-col items-center py-4">
      <div className="px-[1rem] text-center sm:px-0 mb-[30px] mt-[40px]">
        <h1 className="text-4xl font-bold">Search the Best Clinic Near You</h1>
      </div>
      <MapContainer
        center={[20.5937, 78.9629]} // Default center
        zoom={zoomLevel}
        style={{ width: "80%", height: "500px", borderRadius: "30px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetMapCenter
          center={
            countriesData.find(
              (country) => country.countryCode === searchLocation
            )?.coordinates || [20.5937, 78.9629]
          }
          zoomLevel={zoomLevel}
        />
        {countriesData.map((country) => (
          <Marker
            key={country.countryCode}
            position={country.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () =>
                handleMarkerClick(country.countryCode, country.coordinates),
            }}
          >
            <Tooltip>{country.countryName}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <div className="w-[80%] flex justify-center mt-3 bg-white">
        <Form
          className="flex flex-col lg:flex-row items-center justify-center px-4 gap-4 w-full shadow-2xl rounded-xl p-5"
          onFinish={onSearch}
        >
          <Form.Item className="flex-grow w-full lg:w-1/3">
            <Dropdown
              overlay={menu}
              onVisibleChange={(flag) => setVisible(flag)}
              visible={visible}
              trigger={["click"]}
              className="relative"
            >
              <Button
                className="w-full  text-left bg-white rounded-md border border-gray-300 shadow-sm  py-2 flex justify-between"
                size="large"
              >
                {current === "treatments" ? "All Treatments" : current}{" "}
                <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item className="flex-grow w-full lg:w-1/3">
            <Select
              placeholder="Select a Country"
              size="large"
              value={searchLocation}
              onChange={(value) => {
                setSearchLocation(value);
                setZoomLevel(7);
              }}
              loading={countriesLoading}
              className="w-full"
            >
              <Option value="">Any Country</Option>
              {availableCountriesSorted?.map((country) => (
                <Option key={country.countryCode} value={country.countryCode}>
                  {country.countryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className="w-full lg:w-1/3">
            <button
              type="submit"
              className="text-lg font-semibold w-full bg-clr3 hover:bg-white text-white py-2 px-4 rounded-xl border-2 border-clr3 hover:text-clr3 transition duration-300 ease-in-out"
            >
              Search
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default MapHome;
