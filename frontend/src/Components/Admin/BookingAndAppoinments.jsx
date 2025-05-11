import React from "react";
import Bookings from "./Bookings.jsx";
import Appointments from "./Appointments";
import { useGetAppointments } from "../../apis/appointment";

function BookingsAndAppointments({ type, user }) {
  // console.log('user_id: ', user?._id, user);
    const { data: appointmentsData, isLoading, error } = useGetAppointments(user._id);
    if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading appointments</div>;

  if (type === "bookings") {
    return <Bookings user={user} appointmentsData={appointmentsData} />;
  }

  if (type === "appointments") {
    return <Appointments user={user} appointmentsData={appointmentsData} />;
  }

  return null;
}

export default BookingsAndAppointments;
