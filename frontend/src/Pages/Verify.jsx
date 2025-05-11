import React from "react";
import Verification from "../Components/Auth/VerifyEmail";
import SEO from "../Components/Seo";

function VerifyPage() {
  return (
    <>
      <SEO
        title="Verify Your Email - Secure Account Recovery"
        description="Verify your email with the OTP to securely recover your account. Complete the verification process to reset your password and regain access to your account."
        keywords="email verification, OTP verification, password recovery, secure account recovery, reset password"
      />
      <Verification />
    </>
  );
}

export default VerifyPage;
