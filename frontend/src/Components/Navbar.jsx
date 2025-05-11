import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
// import "../Styles/navbar.css";
import useAuth from "../hook/useAuth";

const languages = [
  { code: "en", name: "English", flag: "./Flags/english.png" },
  { code: "es", name: "Spanish", flag: "./Flags/spanish.png" },
  { code: "fr", name: "French", flag: "./Flags/french.png" },
  { code: "de", name: "German", flag: "./Flags/german.png" },
  { code: "zh-CN", name: "Chinese", flag: "./Flags/china.png" },
  { code: "pt", name: "Portuguese", flag: "./Flags/portuguese.png" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const navigate = useNavigate();
  const { isAuthenticated, user, logOut } = useAuth();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const handleTranslate = (language) => {
    setSelectedLanguage(language);
    const translateElement = document.querySelector(".goog-te-combo");
    if (translateElement) {
      translateElement.value = language.code;
      translateElement.dispatchEvent(new Event("change"));
    }
  };

  const unAuthenticatedUserDropdown = [
    {
      name: "Login",
      icon: <LoginOutlined />,
      onClick: () => navigate("/login"),
    },
    {
      name: "Signup",
      icon: <UserAddOutlined />,
      onClick: () => navigate("/signup"),
    },
  ];

  const authenticatedUserDropDown = [
    {
      name: "Clinics",
      icon: <DashboardOutlined />,
      onClick: () => navigate("/clinics"),
    },
    {
      name: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      name: "Setting",
      icon: <SettingOutlined />,
      onClick: () => navigate("/profile/edit"),
    },
    {
      name: "Log Out",
      icon: <LogoutOutlined />,
      onClick: () => logOut(),
    },
  ];

  const dropDownData = isAuthenticated
    ? authenticatedUserDropDown
    : unAuthenticatedUserDropdown;

  return (
    <nav>
      <div className="inline">
        <div id="i" className="inav md:mt-[8vh]" onClick={handleMenuClick}>
          <div className={`c1 ${isOpen ? "close-c1" : ""}`}></div>
          <div className={`c2 ${isOpen ? "close-c2" : ""}`}></div>
          <div className={`c3 ${isOpen ? "close-c3" : ""}`}></div>
        </div>
      </div>
      <div className="inline">
        <img
          src="/logoWhite.png"
          loading="lazy"
          alt="logo"
          id="logo"
          className="w-[20vw] md:w-[5vw] h-[11vh] md:h-[9vh]"
        />
      </div>
      <ul
        id="nav"
        className={`nav ${isOpen ? "open" : ""}`}
        onClick={handleNavClick}
      >
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/about">
          <span>About</span>
        </Link>
        <Link to="/encology">
          <span>Oncology</span>
        </Link>
        <Link to="/plasticsurgery">
          <span>Plastic Surgery</span>
        </Link>
        <Link to="/contact">
          <span>Contact</span>
        </Link>
        <div className="flex flex-row">
          <li className="dropdown">
            <span className="dropdown-toggle">
              <img
                src={selectedLanguage.flag}
                loading="lazy"
                alt={selectedLanguage.name}
                className="w-[4vw] h-[4.2vh]"
              />
            </span>
            <ul className="dropdown-menu">
              {languages.map((language) => (
                <li
                  key={language.code}
                  onClick={() => handleTranslate(language)}
                >
                  <span>
                    <img
                      src={language.flag}
                      loading="lazy"
                      className="flag"
                      alt={language.name}
                      style={{
                        width: "2vw",
                        height: "3vh",
                        marginRight: "0.5vw",
                      }}
                    />
                    {language.name}
                  </span>
                </li>
              ))}
            </ul>
          </li>
          <li className="dropdown">
            <span className="dropdown-toggle">
              <img
                src={
                  user?.imageUrl
                    ? user.imageUrl
                    : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                }
                loading="lazy"
                alt="User Avatar"
                className="w-[50px] h-[50px] mt-[-2vh]"
              />
            </span>
            <ul className="dropdown-menu">
              {dropDownData.map((item) => (
                <li
                  key={item.name}
                  className="dropdown-item flex flex-row gap-x-[10px]"
                  onClick={item.onClick}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </li>
        </div>
      </ul>
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </nav>
  );
};

export default Navbar;
