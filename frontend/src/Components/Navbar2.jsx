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

const Navbar2 = () => {
  return <></>;
};

export default Navbar2; // Ensure this is the default export
