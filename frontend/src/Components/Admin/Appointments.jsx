import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { frontendUrl } from "../../apiUrl";

function Appointments({ user, appointmentsData }) {
  // const [filteredAppointments, setFilteredAppointments] = useState([]);

  let data = [];
  const formatDate = (utcDatetime) => {
    // const utcDate = new Date(utcDatetime);
    // const localDate = utcDate.toLocaleDateString();
    // const localTime = utcDate.toLocaleTimeString();
    // return {
    //   localDate, localTime
    // }
    const utcDate = new Date(utcDatetime);
    function formatDateToLocal(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    function formatTimeToLocal(date) {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    }
    const localDate = formatDateToLocal(utcDate);
    const localTime = formatTimeToLocal(utcDate);
    return {
      localDate,
      localTime,
    };
  };
  if (appointmentsData) {
    appointmentsData?.map((i, index) =>
      data.push({
        index,
        patient_name: i?.bookingId?.patient_name || "N/A",
        patient_email: i?.bookingId?.patient_email || "N/A",
        clinic_name: i?.bookingId?.clinic_name || "N/A",
        booking_date: i?.bookingId?.booking_date || "N/A",
        meeting_date: formatDate(i.scheduled_time).localDate,
        meeting_time: formatDate(i.scheduled_time).localTime,
        meeting_completed: i?.bookingId?.meeting_completed ? "Yes" : "No",
        description: i?.bookingId?.description || "N/A",
        // link: `${frontendUrl}/room?id=${i?.session_id}&email=${i?.user_id}` || 'N/A',
        link:
          `${frontendUrl}/room?id=${i?.session_id}&email=${
            user?.contact_details?.email || i?.user_id
          }` || "N/A",
      })
    );
  }

  const columns = [
    { title: "Patient Name", dataIndex: "patient_name", key: "patient_name" },
    {
      title: "Patient Email",
      dataIndex: "patient_email",
      key: "patient_email",
    },
    { title: "Clinic Name", dataIndex: "clinic_name", key: "clinic_name" },
    { title: "Service", dataIndex: "service", key: "service" },
    {
      title: "Booking Date",
      dataIndex: "booking_date",
      key: "booking_date",
      // render: (date) => new Date(date).toISOString().slice(0, 10),
    },
    {
      title: "Meeting Date",
      dataIndex: "meeting_date",
      key: "meeting_date",
      // render: (date) => new Date(date).toISOString().slice(0, 10),
    },
    {
      title: "Meeting Time",
      dataIndex: "meeting_time",
      key: "meeting_time",
    },
    {
      title: "Meeting Completed",
      dataIndex: "meeting_completed",
      key: "meeting_completed",
    },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Meeting Link",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {"Start Meeting"}
        </a>
      ),
      // width: 30,
    },
  ];

  return (
    <div className="flex flex-col p-[4vh] w-[95vw] overflow-x-auto">
      <Table columns={columns} dataSource={data} rowKey="index" />
    </div>
  );
}

export default Appointments;
