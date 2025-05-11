import React, { useState, useEffect } from "react";
import { Card, Rate, Table, Divider, Spin, Button, Alert, message } from "antd";
import {
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import ReviewsForm from "./ReviesForm";
import { FaPhoneAlt, FaWhatsappSquare } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import useAuth from "../../../hook/useAuth";
import ShowReviews from "./showReviews";
import Appointment from "../appointment";
import axios from "../../../services/axios";
import { useLocation, useNavigate } from "react-router-dom";
import ShowServices from "./showService";
import { useGetHospital } from "../../../apis/hospitals/auth";
import CountryInfo from "../CountryInfo";

function ClinicDetail({ id }) {
  const [clinic, setClinic] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isAppointment, setIsAppointment] = useState(false);
  const [clinicDetails, setClinicDetails] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: clinicData2, isLoading } = useGetHospital();
  const { pathname, hash, state } = useLocation();
  const bookState = state?.bookState;

  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const openBookings = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    } else if (user.role === "adminmain") {
      message.info(
        "As a clinic admin, you cannot book consultations. Please log in as a regular user to book a consultation."
      );
      return;
    } else {
      setClinicDetails(clinic);
      setIsAppointment(true);
    }
  };

  // open booking if in location.state
  useEffect(() => {
    if(bookState && clinic?.subscribed) {
      console.log('open booking called....', clinic);
      openBookings();
    }
  }, [bookState, clinic?._id])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const scrollToSection = () => {
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    scrollToSection();

    window.addEventListener("hashchange", scrollToSection);
    return () => {
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, [hash]);

  const closeBookings = () => setIsAppointment(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let foundClinic = clinicData2?.find((item) => item._id == id);
        if (foundClinic) {
          setClinic(foundClinic);
        } else {
          const response = await axios.get(`/clinic/${id}`);
          const foundClinic = response.data.result;
          setClinic(foundClinic);
        }
      } catch (error) {
        console.error("Error fetching clinic data:", error);
      }
    };

    fetchData();
  }, [id, clinicData2]);

  if (!clinic || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const description = clinic.description || "";
  const truncatedDescription = description.substring(0, 230);
  const showAlert = clinic.role === "adminmain" && !clinic.subscribed;

  const email =
    clinic.contact_details?.email || (clinic.emails && clinic.emails[0]);
  const phone = clinic.contact_details?.phone
    ? clinic.contact_details?.phone
    : clinic?.phone;
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const redirectUrl = (clinic) => {
    if (!clinic?.url && !clinic?.address) {
      return message.info("Clinic location is not available on Google Maps.");
    }
    if (clinic?.url) {
      window.open(clinic?.url, "_blank");
    } else {
      window.open(
        `https://www.google.com/maps/place/${clinic?.address}`,
        "_blank"
      );
    }
  };

  const sendFeedback = (clinic) => {
    navigate(`/feedback`, { state: clinic });
  };
  const redirectPhone = clinic.contact_details?.phone
    ? clinic.contact_details?.phone
    : clinic?.phoneUnformatted;

  const phone2 = redirectPhone?.replace(/\s+/g, "")?.replace("+", "");

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
        Clinic Details
      </h2>
      {showAlert && (
        <div className="mb-6">
          <Alert
            message={
              <span className="text-base font-semibold">
                This clinic is currently unverified because their subscription
                is inactive.
              </span>
            }
            type="info"
            showIcon
            closable
          />
        </div>
      )}

      <Card className="shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between xs:p-6">
          <div className="w-full md:w-1/2 h-auto mb-6 md:mb-0 relative">
            {clinic.image ? (
              <img
                src={clinic.image}
                loading="lazy"
                alt={clinic.title}
                className="w-full h-full object-cover max-h-[500px] rounded-xl"
              />
            ) : clinic.imageUrls && clinic.imageUrls.length > 0 ? (
              <img
                src={clinic.imageUrls[0]}
                loading="lazy"
                alt={clinic.title}
                className="w-full h-full object-cover max-h-[500px] rounded-xl"
              />
            ) : (
              <div className="md:min-w-[380px] h-[400px] flex items-center justify-center border border-gray-300 bg-gray-300">
                <span className="text-white text-xl font-semibold">
                  Image Not Available
                </span>
              </div>
            )}
          </div>
          <div className="md:ml-6 flex-1">
            <div className="flex flex-col mb-4">
              <h1 className="2lg:text-4xl text-2xl font-bold text-clr1 mb-4">
                {clinic.title ? clinic.title : clinic.name}
              </h1>
              <div className="flex items-start mb-4">
                <EnvironmentOutlined className="text-xl mr-2 text-blue-600 pt-[0.3vw]" />
                <span
                  className="text-lg font-medium  text-lightblue hover:underline cursor-pointer hover:text-blue-500"
                  onClick={() => redirectUrl(clinic)}
                >
                  {clinic.address}
                </span>
              </div>
              <CountryInfo countryCode={clinic.countryCode} detail={false} />
              <div className="mb-4">
                <span className="text-clr1 font-semibold text-lg">
                  Contact Details
                </span>
              </div>
              <div className="flex mb-4 flex-col md:flex-row justify-between">
                <div className="flex mb-4 flex-col md:flex-row justify-between">
                  <div className="flex items-center mr-4">
                    <img
                      src="/whatsapp.png"
                      className="text-3xl mr-2 text-clr1 cursor-pointer w-[40px] h-[40px]"
                    />
                    {phone ? (
                      <span>
                        <a
                          className="text-lg font-medium text-gray-700 hover:underline md:hidden block"
                          href={`https://wa.me/${phone}`}
                        >
                          {phone}
                        </a>
                        <a
                          className="text-lg font-medium text-gray-700 hover:underline md:block hidden"
                          href={`https://api.whatsapp.com/send?phone=${phone2}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {phone}
                        </a>
                      </span>
                    ) : (
                      <span className="text-base font-medium text-gray-700">
                        Unavailable Contact
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center mr-4">
                  <IoMail className="text-2xl mr-2 text-clr1" />
                  {email ? (
                    <a
                      className="text-lg font-medium text-gray-700 hover:underline"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  ) : (
                    <span className="text-lg font-medium text-gray-700">
                      No email available
                    </span>
                  )}
                </div>
              </div>
              <p className="text-lg mb-4 font-semibold text-gray-700">
                {isExpanded ? description : truncatedDescription}
                {description.length > 230 && (
                  <span>
                    {isExpanded ? " " : "... "}
                    <button
                      onClick={toggleExpanded}
                      className="text-blue-500 underline focus:outline-none"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </span>
                )}
              </p>
              <div className="flex items-center mb-4 whitespace-nowrap">
                <Rate
                  disabled
                  defaultValue={averageRating}
                  allowHalf
                  character={({ index }) => {
                    return (
                      <span>
                        {index < averageRating ? (
                          <HeartFilled className="text-red-500 text-[14px] md:text-[20px]" />
                        ) : (
                          <HeartOutlined className="text-red-500  text-[14px] md:text-[20px]" />
                        )}
                      </span>
                    );
                  }}
                />
                <span className="ml-2  text-base md:text-lg text-gray-700">
                  ({reviewCount} Reviews)
                </span>
              </div>
              <div className="flex flex-col  md:flex-row gap-x-[30px]">
                {clinic.role === "adminmain" && clinic.subscribed ? (
                  <Button
                    type="primary"
                    className="w-1/2 md:w-auto !bg-clr1 hover:!bg-transparent border-2 border-clr1 hover:!text-clr1 font-semibold text-lg h-[50px]"
                    block
                    onClick={openBookings}
                  >
                    Book a Consultation
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    disabled={true}
                    className="w-1/2 md:w-auto  font-semibold text-lg h-[50px]"
                    block
                    style={{
                      cursor: clinic.role ? "pointer" : "not-allowed",
                    }}
                  >
                    Book a Consultation
                  </Button>
                )}
                <Button
                  type="primary"
                  className=" md:mt-0 mt-5 w-1/2 md:w-auto !bg-clr1 hover:!bg-transparent border-2 border-clr1 hover:!text-clr1 font-semibold text-lg h-[50px]"
                  block
                  // onClick={openBookings}
                  onClick={() => sendFeedback(clinic)}
                >
                  Send Feedback
                </Button>
              </div>
              {isAppointment && clinicDetails && (
                <div className="fixed inset-0 z-50 bg-opacity-50 bg-gray-500 backdrop-blur-md flex justify-center items-center">
                  <Appointment
                    onClose={closeBookings}
                    clinic_data={clinicDetails}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <Divider />
        <ShowServices clinic={clinic} />
      </Card>
      <section id="review">
        <ReviewsForm clinic={clinic} />
      </section>
      <Divider />
      <section id="reviews">
        <ShowReviews
          clinic={clinic}
          id={id}
          onReviewCount={setReviewCount}
          onAverageRating={setAverageRating}
        />
      </section>
    </div>
  );
}

export default ClinicDetail;
