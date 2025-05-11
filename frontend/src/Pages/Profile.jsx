import React from "react";
import Profile from "../Components/Auth/Profile";
import SEO from "../Components/Seo";

function ProfilePage() {
  return (
    <>
      <SEO
        title="Your Profile - Manage Your Account Details"
        description="View and update your profile information to keep your account details current and accurate. Manage your personal information securely."
        keywords="user profile, account management, update profile, personal details"
      />
      <Profile />
    </>
  );
}

export default ProfilePage;
