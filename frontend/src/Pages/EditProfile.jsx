import React from "react";
import EditProfile from "../Components/Auth/Profile/EditProfile";
import SEO from "../Components/Seo";

function EditProfilePage() {
  return (
    <>
      <SEO
        title="Edit Profile - YourAccount"
        description="Manage and update your profile details on YourAccount. Keep your information up to date to make the most of our services."
        keywords="Edit Profile, User Settings, Account Management, User Profile Update"
      />
      <EditProfile />
    </>
  );
}

export default EditProfilePage;
