import { FaDollarSign } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { IoLocation } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../apiUrl";
import { Alert, message } from "antd";
import SEO from "../Components/Seo";

const Price = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();
  const state = location.state;
  const auth = useAuth();
  console.log("state: ", state, auth?.user?.email);

  const data = state?.services?.selectedServices
    ? {
        Name: state.services.selectedServices.serviceName,
        "Meeting Date": state.services.date,
        "Meeting Time": `${state.services.selectedTimings}-${addMinutes(
          state.services.selectedTimings,
          30
        )}`,
        "Service Charges": `${state.services.selectedServices.servicePrice}$`,
        Commision: "35$",
        Total: `${
          parseInt(state.services.selectedServices.servicePrice) + 35
        }$`,
      }
    : {
        Name: "This is my service",
        "Meeting Date": "29-2-2024",
        "Meeting Time": "2:00-3:00",
        "Service Charges": "20$",
        Commision: "30$",
        Total: "50$",
      };
  // useEffect(() => {
  //     if(!state) {
  //         navigate('/');
  //     }
  // }, [])

  function addMinutes(time, minutesToAdd) {
    let [hours, minutes] = time.split(":").map(Number);

    // Create a new Date object
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    // Add the minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // Get the new hours and minutes
    let newHours = date.getHours();
    let newMinutes = date.getMinutes();

    // Format the new hours and minutes as a string
    let formattedTime = `${newHours}:${
      newMinutes < 10 ? "0" + newMinutes : newMinutes
    }`;

    return formattedTime;
  }

  const handleSubmit = () => {
    setIsDisabled(true);
    const amount = state?.services?.selectedServices?.servicePrice;
    axios
      .post(apiUrl + "/create-payment", {
        hospital_id: state?._id,
        hospital_name: state?.title,
        service_id: state?.services?.selectedServices._id,
        service_name: state?.services?.selectedServices.serviceName,
        selected_date: state?.services?.date,
        selected_time: state?.services?.selectedTimings,
        selected_description: state?.services?.description,
        user_email: auth?.user?.email,
        booking_id: state?.bookingId,
        amount: amount,
      })
      .then((res) => {
        console.log("make-payment api result: ", res.data);
        if (res?.data?.url) {
          // window.location.href = res?.data?.url;
          window.open(res?.data?.url, "_self");
        }
      })
      .catch((e) => {
        console.log(
          "make-payment api error: ",
          e.response?.data?.message || e.response?.data || e
        );
        setIsDisabled(false);
        message.error(`There is something wrong: ${e.response?.data?.message}`);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="price-details-page">
      <SEO
        title="Confirm Your Medical Consultation - Secure Payment"
        description="Finalize your booking and confirm your payment details securely. Ensure all information is correct and proceed with payment to schedule your medical consultation."
        keywords="medical consultation, secure payment, healthcare services, booking confirmation, transaction details"
      />
      <div className="price-details">
        <div className="service">
          <div className="image">
            <img src={state?.image || "/hero.jpg"} loading="lazy" alt="" />
          </div>
          <div className="box">
            <div className="title">{state?.title || "Hospital ABC"}</div>
            <div className="location">
              <span className="icon">
                <IoLocation />
              </span>{" "}
              {state?.address || "Mehmoodabad, Karachi."}
            </div>
            <div className="description">
              <span className="icon">
                <FcViewDetails />
              </span>{" "}
              {state?.description ||
                "This is small description. I love this description!"}
            </div>
            <div className="contact">Contact details</div>
            <div className="contact-details">
              <div className="email">
                {state?.contact_details.email || "umarcreator2@gmail.com"}
              </div>
              <div className="phone">
                {state?.contact_details.phone || "03263613933"}
              </div>
            </div>
            <div className="price">
              <FaDollarSign />{" "}
              {state?.services.selectedServices.servicePrice || "N/A"}
            </div>
          </div>
        </div>
        <div className="total">
          <div className="heading">Service Details</div>
          <div className="table">
            <table>
              {Object.keys(data)?.map((key) => {
                return (
                  <tr>
                    <td>{key}</td>
                    <td>{data[key]}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div className="description">
            You will be redirected to the payment page, and on payment
            completion your meeting will be scheduled on the specified time and
            you will be informed via email.
          </div>
          <div className="payment-image">
            <img src="/payments.png" loading="lazy" alt="" />
          </div>
          <div className="button-container">
            <button
              className="button"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              <GiConfirmed /> Confirm Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
