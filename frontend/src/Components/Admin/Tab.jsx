import React from "react";
import ProfileTab from "./Profile";
import ReviewsTab from "./Review";
import BookingsAndAppointments from "./BookingAndAppoinments";

function Tabs({ activeTab, onTabClick }) {
  const tabs = ["profile", "reviews", "bookings", "Appointments"];
  return (
    <div className="flex flex-col md:flex-row  md:gap-y-0 gap-y-[10px]  px-[30px] gap-x-[20px]   justify-center text-left md:ml-0  md:justify-center md:items-center mt-[2vh]">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`cursor-pointer rounded-[2vw]   px-[30px] text-center text-clr2 font-bold p-2 transition-colors duration-300 ${
            activeTab === tab
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => onTabClick(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </div>
      ))}
    </div>
  );
}

function TabContent({ activeTab, user, bookingsData, appointmentsData }) {
  const content = {
    profile: <ProfileTab user={user} />,
    reviews: <ReviewsTab user={user} />,
    bookings: (
      <BookingsAndAppointments
        type="bookings"
        data={bookingsData}
        user={user}
      />
    ),
    Appointments: (
      <BookingsAndAppointments
        type="appointments"
        data={appointmentsData}
        user={user}
      />
    ),
  };

  return <div className="mt-4">{content[activeTab]}</div>;
}

export { Tabs, TabContent };
