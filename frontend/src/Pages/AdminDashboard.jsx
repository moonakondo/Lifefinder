import React, { useState } from "react";
import { Tabs, TabContent } from "../Components/Admin/Tab";
import useAuth from "../hook/useAuth";
import SEO from "../Components/Seo";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex flex-col bg-[#f0f2f5]">
      <SEO
        title={"Admin Dashboard - Manage Your Healthcare Platform"}
        description={
          "Access and manage the critical aspects of your healthcare platform. Monitor user activity, manage content, and oversee healthcare operations efficiently."
        }
        keywords={
          "Admin Dashboard, Healthcare Management, User Activity, Content Management, Healthcare Operations, Healthcare Platform Administration"
        }
      />

      <div className="flex flex-col mt-[5vh]">
        <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
        <TabContent activeTab={activeTab} user={user} />
      </div>
    </div>
  );
}

export default AdminDashboard;
