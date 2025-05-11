import React from "react";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import SEO from "../Components/Seo";

function ForgotPasswordPage() {
  return (
    <>
      <SEO
        title="Forgot Password - Reset Your Account Password Easily"
        description="Reset your password securely. Use our simple password recovery tool to regain access to your account and continue enjoying our services without interruption."
        keywords="forgot password, password recovery, reset password, account access, secure password reset"
      />
      <ForgotPassword />
    </>
  );
}

export default ForgotPasswordPage;
