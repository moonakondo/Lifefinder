import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../apiUrl";
import SEO from "../Components/Seo";

const PaymentDone = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentLink = queryParams.get("paymentLink");
  const data = JSON.parse(queryParams.get("data"));
  useEffect(() => {
    const offset = new Date().getTimezoneOffset();
    console.log("offset inside save-payment api: ", offset);
    console.log("calling save-payment api...");
    axios
      .post(apiUrl + "/save-payment", {
        paymentLink,
        data,
        offset,
      })
      .then((res) => {
        console.log("save-payment api result: ", res.data);
      })
      .catch((e) => {
        console.log(
          "save-payment api error: ",
          e.response?.data?.message || e.response?.data
        );
      });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="payment-done">
      <SEO
        title="Payment Successful - Your Consultation is Scheduled"
        description="Your payment has been successfully processed and your medical consultation is scheduled. Check your email for details about the appointment."
        keywords="payment successful, medical consultation, healthcare payment, scheduled appointment"
      />
      <div className="container">
        <div className="image">
          <img src="/tick.png" alt="" loading="lazy" height={80} width={80} />
        </div>
        <div className="title">
          Your meeting has been scheduled successfully!
        </div>
        <div className="description">
          The payment was successfull and the meetings has been scheduled!
        </div>
        <div className="box">
          <div className="name">Hospital name: {data?.hospital_name}</div>
          <div className="service-name">
            Hospital service name: {data?.service_name}
          </div>
          <div className="selected-date">
            Selected date: {data?.selected_date}
          </div>
          <div className="selected-slot">
            Selected slot: {data?.selected_time}
          </div>
        </div>
        <div className="button" onClick={() => navigate("/")}>
          Go to Homepage
        </div>
      </div>
    </div>
  );
};

export default PaymentDone;
