import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  DashboardOutlined,
  GlobalOutlined,
  MenuOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Dropdown,
  Button,
  Drawer,
  Layout,
  Modal,
  Input,
  Select,
} from "antd";
import useAuth from "../hook/useAuth";
// import { categories } from "../Sections/data";
import { useGetSearchOptions } from "../apis/hospitals/scrapClinics";
import { isMainCategory, secondCategories } from "../utils/helpers";
import { citiesOptions } from "../Sections/data";
import { DownOutlined } from "@ant-design/icons";
import axios from "../services/axios";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("treatments");
  const [visible, setVisible] = useState(false);
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState([]);
  const [sectionIdToScroll, setSectionIdToScroll] = useState(null);
  const { isAuthenticated, logOut, user } = useAuth();
  const { Header } = Layout;
  const { Option } = Select;
  const { data: searchData, isLoading } = useGetSearchOptions();

  const sortedCitiesOptions = citiesOptions.sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const handleMenuClick = (e) => {
    setCurrent(e.key);
    setVisible(false);
    console.log(`You selected ${e.key}`);
  };

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

  useEffect(() => {
    if (sectionIdToScroll) {
      const checkExist = setInterval(() => {
        const section = document.getElementById(sectionIdToScroll);
        if (section) {
          const { top } = section.getBoundingClientRect();
          window.scrollTo({
            top: top + window.pageYOffset,
            behavior: "smooth",
          });
          clearInterval(checkExist);
          setSectionIdToScroll(null);
        }
      }, 100);
    }
  }, [location, sectionIdToScroll]);
  const sortedCategories = Array.from(new Set(secondCategories)).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
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

  console.log("categoriesWithSubcategories", categoriesWithSubcategories);

  const handleClick = (e) => {
    setCurrent(e.key);
    console.log(`You selected ${e.key}`);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      setSectionIdToScroll(sectionId);
      navigate("/");
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const { top } = section.getBoundingClientRect();
        window.scrollTo({ top: top + window.pageYOffset, behavior: "smooth" });
      }
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup to ensure scrolling is re-enabled
    };
  }, [isModalOpen]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerToggle2 = () => {
    setIsDrawerOpen(true);
  };

  const unAuthenticatedUserDropdown = (
    <Menu>
      <Menu.Item
        key="login"
        icon={<LoginOutlined className="!text-base !font-semibold" />}
        onClick={() => {
          navigate("/login");
          handleDrawerToggle();
        }}
      >
        <span className="text-base font-semibold">Login</span>
      </Menu.Item>
      <Menu.Item
        key="signup"
        icon={<UserAddOutlined className="!font-semibold !text-base" />}
        onClick={() => {
          navigate("/signup");
          handleDrawerToggle();
        }}
      >
        <span className="text-base font-semibold">SignUp</span>
      </Menu.Item>
      <Menu.Item
        key="signup/hospital"
        icon={<PlusOutlined className="!font-semibold !text-base" />}
        onClick={() => {
          navigate("/signup/hospital");
          handleDrawerToggle();
        }}
      >
        <span className="!text-base !font-semibold   whitespace-nowrap">
          SignUp Hospital
        </span>
      </Menu.Item>
    </Menu>
  );

  const authenticatedUserDropDown = (
    <Menu>
      <Menu.Item
        key="profile"
        icon={<UserOutlined className="!font-semibold !text-base" />}
        onClick={() => {
          navigate("/profile");
          handleDrawerToggle();
        }}
      >
        <span className="text-base font-semibold">Profile</span>
      </Menu.Item>
      {/* <Menu.Item
        key="chat"
        icon={
          <IoChatbubbleEllipsesOutline className="!font-semibold !text-base" />
        }
        onClick={() => {
          navigate("/chat");
          handleDrawerToggle();
        }}
      >
        <span className="text-base font-semibold">Contact Admin</span>
      </Menu.Item> */}
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined className="!font-semibold !text-base" />}
        onClick={() => {
          logOut();
          handleDrawerToggle();
        }}
      >
        <span className="text-base font-semibold">Log Out</span>
      </Menu.Item>
    </Menu>
  );

  const adminAuthenticatedDropDown = (
    <Menu>
      <Menu.Item
        key="clinics"
        icon={<DashboardOutlined className="!font-semibold !text-base" />}
        onClick={() => {
          navigate("/adminDashboard");
          handleDrawerToggle();
        }}
      >
        <span className="text-base font-semibold">Dashboard</span>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined className="!font-semibold !text-base" />}
        onClick={() => {
          logOut();
          handleDrawerToggle();
        }}
      >
        <span className="text-base font-semibold">Log Out</span>
      </Menu.Item>
    </Menu>
  );
  const authenticatedDropDown =
    user?.role === "adminmain"
      ? adminAuthenticatedDropDown
      : authenticatedUserDropDown;

  const dropDownData = isAuthenticated
    ? authenticatedDropDown
    : unAuthenticatedUserDropdown;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onSearch = () => {
    const searchCityObj = {
      searchCity: searchCity,
      allCategeoriesFilter: current,
    };
    navigate(`/clinics/sub/treatments`, { state: searchCityObj });
    setIsModalOpen(false);
  };

  const translateFunction = (e) => {
    e.stopPropagation();
    const customSelect = document.getElementById("custom_language_select");
    if (
      customSelect.style.display === "none" ||
      customSelect.style.display === ""
    ) {
      customSelect.style.display = "block";
    } else {
      customSelect.style.display = "none";
    }
  };

  return (
    <header className="bg-clr3 shadow-xl px-[15px] 2lg:px-0 flex items-center flex-row   w-full z-50 relative">
      <div className="flex  2lg:container  items-center w-full">
        <div
          className="flex items-center py-[6px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/main-log2.png"
            loading="lazy"
            alt="Logo"
            className="cursor-pointer"
          />
          <span className="text-white font-bold italic text-lg ml-[8px]">
            LIFEFINDER
          </span>
        </div>
        <div className="hidden 2lg:flex w-full justify-center gap-x-[3vw] text-white">
          {/* <div className="hidden 2lg:flex w-full justify-center gap-x-[3vw]"> */}
          <Link to="/">
            <span className=" text-white text-base font-semibold hover:underline">
              Home
            </span>
          </Link>
          <Link to="/about">
            <span className="text-white text-base font-semibold hover:underline">
              About
            </span>
          </Link>
          <Link to="/encology">
            <span className="text-white text-base font-semibold hover:underline">
              Oncology
            </span>
          </Link>
          <Link to="/plasticsurgery">
            <span className=" text-white text-base font-semibold hover:underline ">
              Plastic Surgery
            </span>
          </Link>
          <Link to="/clinics">
            <span className=" text-white text-base font-semibold hover:underline  ">
              Clinics
            </span>
          </Link>
          <Link to="/pricing">
            <span className="text-white text-base font-semibold hover:underline ">
              Pricing
            </span>
          </Link>
          {/* <Link to="/contact-us">
          <span
            // onClick={() => scrollToSection("contactus")}
            className="text-white text-base font-semibold hover:underline"
          >
            Contact
          </span>
        </Link> */}
        </div>
        {/* <span className="flex gap-x-[20px]  ml-[20px]">
          <IoIosSearch className="text-white font-semibold text-xl" />
        </span> */}
        <div className="flex items-center flex-row gap-x-[15px] w-full 2lg:w-auto">
          {/* This is the translate icon */}
          <div className="flex 2lg:justify-start justify-end w-full 2lg:mr-[2px] mr-[20px] 2lg:w-auto">
            <div className="translate-icon" onClick={translateFunction}></div>
          </div>
          {/* This is the translate icon */}
          <div className="rounded-xl 2lg:flex hidden  ">
            <Button
              icon={<IoIosSearch className="text-xl" />}
              className="cursor-pointer"
              onClick={handleOpenModal}
            />
          </div>
          <div className="hidden 2lg:flex items-center">
            <Dropdown
              overlay={dropDownData}
              trigger={["click"]}
              arrow
              placement="topCenter"
            >
              <Button icon={<UserOutlined />} className="cursor-pointer " />
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="2lg:hidden flex items-center">
        <Button
          icon={<MenuOutlined className="text-clr1" />}
          className="border-none text-clr3"
          onClick={handleDrawerToggle2}
        />
      </div>
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={handleDrawerToggle}
        visible={isDrawerOpen}
        closeIcon={<CloseOutlined />}
        className="!bg-gray-100"
      >
        <div className="flex flex-col gap-y-[15px]">
          <Link to="/" onClick={handleDrawerToggle}>
            <span className="text-lg font-semibold">Home</span>
          </Link>
          <Link to="/about" onClick={handleDrawerToggle}>
            <span className="text-lg font-semibold">About</span>
          </Link>

          <Link to="/encology" onClick={handleDrawerToggle}>
            <span className="text-lg font-semibold">Oncology</span>
          </Link>
          <Link to="/plasticsurgery" onClick={handleDrawerToggle}>
            <span className="text-lg font-semibold">Plastic Surgery</span>
          </Link>
          <Link to="/clinics" onClick={handleDrawerToggle}>
            <span className="text-lg font-semibold">Clinics</span>
          </Link>
          <Link to="/pricing" onClick={handleDrawerToggle}>
            <span className="text-lg font-semibold">Pricing</span>
          </Link>
          {/* <Link to="/contact-us" onClick={handleDrawerToggle}>
            <span className="text-lg font-semibold">Contact</span>
          </Link> */}
          <div className="rounded-xl 2lg:hidden flex w-full ">
            <Button
              icon={<IoIosSearch className="text-2xl" />}
              className="cursor-pointer w-full"
              onClick={() => {
                handleDrawerToggle();
                handleOpenModal();
              }}
            />
          </div>
          <Dropdown overlay={dropDownData} trigger={["click"]}>
            <Button icon={<UserOutlined />} className="cursor-pointer mt-4">
              Account
            </Button>
          </Dropdown>
        </div>
      </Drawer>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center z-[90]">
          <div
            className="fixed inset-0 bg-gray-800 opacity-90"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-white rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:max-w-xl mt-16 mx-4 md:mx-auto z-10 p-6 animation-fadeUp">
            <div className="flex items-center justify-end">
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 text-center flex justify-center mt-5">
              Search for the best treatment and find the best clinic for you.
            </h2>
            <div className="mt-1 flex justify-center items-center">
              <div className="flex w-full md:flex-col  flex-col items-center gap-5 mt-5">
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
                <Select
                  placeholder="Select a City"
                  size="large"
                  value={searchCity}
                  onChange={(value) => setSearchCity(value)}
                  showSearch
                  className="w-full"
                  dropdownClassName="max-w-full"
                >
                  <Option value="">Any City</Option>
                  {sortedCitiesOptions?.map((city) => (
                    <Option key={city.value} value={city.value}>
                      {city.label}
                    </Option>
                  ))}
                </Select>
                <button
                  onClick={onSearch}
                  className="flex bg-clr1 w-full md:w-full  justify-center mb-[10px] rounded-xl h-10 items-center text-center text-white cursor-pointer border-2 font-medium text-base border-clr1 hover:border-2 hover:bg-transparent hover:text-clr1"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
