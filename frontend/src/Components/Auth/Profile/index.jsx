import React from "react";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AppointmentsHistory from "./AppoitmentHistory";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userData = user;

  return (
    <div className="flex container flex-col lg:flex-row justify-center items-start p-8 gap-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Profile Information</h2>
        <Card
          className="rounded-lg shadow-lg overflow-hidden transition-transform transform"
          hoverable
        >
          <div className="bg-clr3 rounded-xl p-6 flex justify-center">
            <img
              icon={!userData?.imageUrl && <UserOutlined />}
              src={userData?.imageUrl}
              loading="lazy"
              className="border-4 border-white w-[140px]  h-[140px]  rounded-full"
            />
          </div>
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold mb-2">
              {userData?.firstName + " " + userData?.lastName}
            </h2>
          </div>
          <div className="flex justify-between bg-gray-100 p-6 gap-x-[80px]">
            <div className="text-start">
              <p className="text-xl font-semibold text-gray-500">Country</p>
              <p className="text-lg font-bold text-blue-500">
                {userData?.country}
              </p>
            </div>
            <div className="text-start">
              <p className="text-xl font-semibold text-gray-500">City</p>
              <p className="text-lg font-bold text-blue-500">
                {userData?.city}
              </p>
            </div>
          </div>
          <div className="flex mt-8 p-6 flex-row gap-x-[30px]">
            <button
              onClick={() => navigate(`/profile/edit`)}
              type="primary"
              htmlType="submit"
              className="w-full bg-clr1 hover:bg-transparent py-2 text-white font-semibold text-xl rounded-xl hover:text-clr1 border-2 border-clr1 transition-all duration-300 ease-in-out"
            >
              Edit Profile
            </button>
          </div>
        </Card>
      </div>
      <div className="w-full">
        <AppointmentsHistory />
      </div>
    </div>
  );
};

export default Profile;
