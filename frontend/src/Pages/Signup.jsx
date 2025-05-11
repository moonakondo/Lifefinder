import React from "react";
import SignUp from "../Components/Auth/register";
import SEO from "../Components/Seo";

function SignupPage() {
  return (
    <>
      <SEO
        title="Sign Up for LIFEFINDER Join Our Community"
        description="Register to gain access to exclusive features and personalized services on [YourPlatformName]. Start your journey with us today and enhance your experience."
        keywords="sign up, registration, [YourPlatformName] account, join [YourPlatformName], user registration"
      />
      <SignUp />
    </>
  );
}

export default SignupPage;
