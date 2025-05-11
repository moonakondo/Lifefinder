import React from "react";
import { Table } from "antd";
import useAuth from "../../../hook/useAuth";
import { useGetBookings } from "../../../apis/booking";
import "./index.css";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    className: "whitespace-normal text-base font-semibold md:whitespace-nowrap",
  },
  {
    title: "Clinic Name",
    dataIndex: "clinicName",
    key: "clinicName",
    className: "whitespace-normal text-base font-semibold md:whitespace-nowrap",
  },
  {
    title: "Service Type",
    dataIndex: "clinicType",
    key: "clinicType",
    className: "whitespace-normal text-base font-semibold md:whitespace-nowrap",
  },
];

function formatBookingDate(bookingDate) {
  const date = new Date(bookingDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function AppointmentsHistory() {
  const { user } = useAuth();
  const { data: bookingsData, isLoading, isError } = useGetBookings();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching bookings.</div>;
  }

  const mappedData = bookingsData.map((booking) => ({
    key: booking._id,
    date: formatBookingDate(booking.booking_date), // Format the date here
    clinicName: booking.clinic_name,
    clinicType: booking.service,
  }));

  return (
    <div className="p-6">
      <div className="flex pb-[10px] table-main">
        <h2 className="lg:text-[1.5vw] text-[5vw] font-bold whitespace-nowrap">
          Appointments History
        </h2>
      </div>
      <Table
        columns={columns}
        dataSource={mappedData}
        pagination={true}
        className="shadow-xl border md:w-full w-[100%] overflow-y-auto"
      />
    </div>
  );
}

export default AppointmentsHistory;
