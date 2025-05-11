import React, { useEffect } from "react";
import Login from "../Components/Auth/login";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../apiUrl";
import axios from "axios";
import SEO from "../Components/Seo";

function LoginPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get("userId");
  const paymentLink = searchParams.get("paymentLink");
  const data = searchParams.get("data");
  const parsedData = data ? JSON.parse(decodeURIComponent(data)) : {};

  useEffect(() => {
    const offset = new Date().getTimezoneOffset();
    console.log("offset in /save-subscription: ", offset);
    if (userId && data) {
      axios
        .post(apiUrl + "/save-subscription", {
          paymentLink,
          userId,
          data: parsedData,
          offset,
        })
        .then((res) => {
          console.log("save-subscription api res: ", res?.data || res);
        })
        .catch((e) => {
          console.log(
            "save-subscription api error: ",
            e?.response?.data || e?.data || e
          );
        });
    }
  }, [userId]);

  return (
    <>
      <SEO
        title="Secure Login - Access Your Account"
        description="Log in to manage your account, subscription details, and access personalized settings. Secure and reliable access to all your account features."
        keywords="secure login, account access, user authentication, subscription management"
      />
      {userId ? <Login userId={userId} /> : <Login />}
    </>
  );
}

export default LoginPage;
