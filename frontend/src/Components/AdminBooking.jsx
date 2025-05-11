import React from "react";

// function AdminBooking({ booking, onClick }) {
//   return (
//     <div
//       className="flex flex-row items-center p-[2vh] md:h-[5vh] 2lg:h-[10vh] shadow-lg gap-[1.6vw] bg-white hover:bg-[#f5f5f5] rounded-[1vw] mt-[1vw] w-[95%] cursor-pointer transition-all duration-300"
//       onClick={onClick}
//     >
//       <img
//         loading="lazy"
//         src={booking.patient_image}
//         alt="pic"
//         className="w-[8vw] md:w-[4vw] h-[8vw] md:h-[4vw] rounded-full hover:scale-110 transition-transform duration-300"
//       />
//       <div className="flex flex-col justify-center ml-[1vw]">
//         <span className="text-[6vw] md:text-[1.6vw] font-semibold text-clr2">
//           {booking.patient_name}
//         </span>
//         <p className="text-gray-500 text-[4vw] md:text-[1.2vw]">
//           {booking.booking_date}
//         </p>
//       </div>
//     </div>
//   );
// }

function AdminBooking({ booking, onClick, appointmentsData }) {
  const result = appointmentsData?.find(
    (i) => i?.bookingId?._id === booking?._id
  )
    ? true
    : false;
  return (
    <div
      className="flex flex-row items-center p-4 py-2 shadow-lg gap-4 bg-white hover:bg-gray-100 rounded-lg mt-4 w-full cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <img
        loading="lazy"
        src={booking.patient_image}
        alt="Patient"
        className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="flex flex-col justify-center ml-4">
        <span className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
          {booking.patient_name}
        </span>
        {result === false && (
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">
            {/* {`(${result})`} */}
            {"(Pending)"}
          </p>
        )}
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">
          {booking.booking_date}
        </p>
      </div>
    </div>
  );
}

export default AdminBooking;
