import React, { useState, useEffect } from "react";
import AdminBooking from "../AdminBooking";
import { useGetBookings, useDeleteBooking } from "../../apis/booking";
import { useAppointment } from "../../apis/appointment";

function BookingDetails({ booking, onApproveClick, appointmentsData }) {
  const result = appointmentsData?.find(
    (i) => i?.bookingId?._id === booking?._id
  )
    ? "Yes"
    : "No";

  return (
    <div className="flex flex-col gap-[1.5rem] p-[3vh] shadow-2xl rounded-[2vw] w-[100%] md:w-[36vw] h-auto 2lg:h-auto bg-slate-100">
      <div className="text-2xl font-bold text-center text-clr3">
        Booking Details
      </div>
      <div className="w-full h-[1px] bg-slate-400 mt-[-.5rem]"></div>
      {booking ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-gray-50 rounded-lg">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="font-bold bg-blue-500 text-white p-3 border-r border-gray-300 rounded-tl-lg">
                  Patient Name:
                </td>
                <td className="text-clr3 p-3 rounded-tr-lg">
                  {booking.patient_name}
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold bg-blue-500 text-white p-3 border-r border-gray-300">
                  Patient Email:
                </td>
                <td className="text-clr3 p-3 rounded-br-lg">
                  <a href={`mailto:${booking.patient_email}`}>
                    {booking.patient_email}
                  </a>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold bg-blue-500 text-white p-3 border-r border-gray-300">
                  Medical Issue:
                </td>
                <td className="text-clr3 p-3">{booking.service}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold bg-blue-500 text-white p-3 border-r border-gray-300">
                  Date:
                </td>
                <td className="text-clr3 p-3">
                  {new Date(booking.booking_date).toISOString().slice(0, 10)}
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold bg-blue-500 text-white p-2 border-r border-gray-300">
                  Payment Completed:
                </td>
                <td className="text-clr3 p-3 rounded-br-lg">{result}</td>
              </tr>
              <tr>
                <td className="font-bold bg-blue-500 text-white p-2 px-5 border-r border-gray-300 rounded-bl-lg">
                  Description:
                </td>
                <td className="text-clr3 p-3 rounded-br-lg">
                  {booking.description}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-row justify-center gap-[2vw] mt-[4vh]">
            <a
              href={`mailto:${booking.patient_email}`}
              className="bg-clr3 p-3 px-5 rounded-lg text-white"
            >
              Contact Patient
            </a>
            <button className="bg-gray-700 p-3 rounded-lg text-white">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[10rem]">
          <p className="text-gray-800">Click on a booking to see details</p>
        </div>
      )}
    </div>
  );
}

function BookingList({ bookings, onBookingClick, appointmentsData }) {
  return (
    <div className="flex flex-col overflow-y-auto p-[3vh] shadow-2xl rounded-[2vw] w-[100%] md:w-[56vw] md:ml-[2vw]">
      {bookings?.length > 0 ? (
        bookings.map((booking) => (
          <AdminBooking
            key={booking._id}
            booking={booking}
            onClick={() => onBookingClick(booking)}
            appointmentsData={appointmentsData}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-[9rem]">
          <p className="text-gray-800">No booking data to show.</p>
        </div>
      )}
    </div>
  );
}

function Bookings({ user, appointmentsData }) {
  const { data: bookingsData, isLoading, error } = useGetBookings(user._id);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { mutateAsync: deleteBooking } = useDeleteBooking();
  const { mutate: saveAppointment } = useAppointment();

  useEffect(() => {
    if (Array.isArray(bookingsData) && user._id) {
      const filtered = bookingsData.filter(
        (booking) => booking.clinic_id === user._id
      );
      setFilteredBookings(filtered);
    }
  }, [bookingsData, user._id]);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleApproveClick = () => {
    // if (selectedBooking) {
    //   const appointment = {
    //     patient_name: selectedBooking.patient_name,
    //     patient_email: selectedBooking.patient_email,
    //     service: selectedBooking.service,
    //     booking_date: selectedBooking.booking_date,
    //     clinic_name: selectedBooking.clinic_name,
    //     clinic_id: selectedBooking.clinic_id,
    //     description: selectedBooking.description,
    //   };
    //   saveAppointment(appointment, {
    //     onSuccess: () => {
    //       console.log("Appointment saved successfully");
    //       deleteBooking(selectedBooking._id, {
    //         onSuccess: () => {
    //           console.log("Booking deleted successfully");
    //         },
    //         onError: (error) => {
    //           console.error("Failed to delete booking", error);
    //         },
    //       });
    //     },
    //     onError: (error) => {
    //       console.error("Error saving appointment:", error);
    //     },
    //   });
    // }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  return (
    <div className="flex flex-col items-start md:flex-row px-[.7rem] sm:px-[1.5rem] md:px-[4vh] py-[4vh]">
      <BookingDetails
        booking={selectedBooking}
        onApproveClick={handleApproveClick}
        appointmentsData={appointmentsData}
      />
      <BookingList
        bookings={filteredBookings}
        onBookingClick={handleBookingClick}
        appointmentsData={appointmentsData}
      />
    </div>
  );
}

export default Bookings;
