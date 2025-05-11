import React, { useState, useEffect } from "react";
import { message, Alert } from "antd";
import { useForm } from "antd/es/form/Form";
import useAuth from "../../hook/useAuth";
import { useBooking } from "../../apis/booking";
import { useNavigate } from "react-router-dom";

function Appointment({ onClose, clinic_data }) {
  const [date, setDate] = useState(""); //one
  const [description, setDescription] = useState(""); //two
  const [selectedServices, setSelectedServices] = useState(""); //three
  const [selectedTimings, setSelectedTimings] = useState(""); //four
  const [availableTimings, setAvailableTimings] = useState([]);
  const [error, setError] = useState("");
  const [finalTime, setFinalTime] = useState('');

  const { mutateAsync: SaveBooking } = useBooking();
  const [form] = useForm();
  const today = new Date().toISOString().split("T")[0];
  const { user } = useAuth();

  useEffect(() => {
    if (selectedServices) {
      const selectedDate = new Date(date);
      const selectedDay = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const availability = selectedServices.availability[selectedDay];

      if (availability && availability.length === 2) {
        const startTime = availability[0];
        const endTime = availability[1];

        const timings = [];
        let current = startTime;
        while (current <= endTime) {
          timings.push(current);
          current = addToTime(current, 30);
        }
        setAvailableTimings(timings);

        // Set the first available time as the default selected time
        if (timings.length > 0) {
          setSelectedTimings(timings[0]);
          checkTimings(timings[0]);
        }
      } else {
        setAvailableTimings([]);
      }
      setSelectedTimings(null);
    }
  }, [selectedServices, date]);

  const addToTime = (time, minutesToAdd) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
      2,
      "0"
    )}`;
  };

  const checkTimings = (selectedTimings) => {
    console.log('checkTimings() called...');

    let dateTimeString = `${date}T${selectedTimings}:00.000Z`; // Add seconds as '00' if not provided

    console.log("🚀 ~ checkTimings ~ selectedTimings:", selectedTimings);
    console.log("🚀 ~ checkTimings ~ date:", date);
    // Create a new Date object
    let dateTime = new Date(dateTimeString);
    console.log("dateTime checking", dateTime, dateTime.toLocaleDateString(), dateTime.toLocaleTimeString());
    console.log("dateTime iso: ", dateTime.toString());
    setFinalTime(dateTime.toString());

    // const offset = new Date().getTimezoneOffset();
    // console.log(offset);

    // let minutesToSubtract = offset;
    // dateTime.setMinutes(dateTime.getMinutes() - minutesToSubtract);
    // console.log("Changed Date: ", dateTime);
  };
  
  const handleDate = (e) => {
    const selectedDate = new Date(e.target.value);
    setDate(e.target.value);
    setError("");

    if (selectedServices) {
      const selectedDay = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const availability = selectedServices.availability[selectedDay];

      if (!availability || availability.length !== 2) {
        setError("The selected service is not available on the chosen date.");
        setDate(null);
      } else {
        setError("");
      }
    }
  };

  const handleDescription = (e) => setDescription(e.target.value);

  const handleServiceChange = (e) => {
    const selectedService = clinic_data.services.find(
      (service) => service.serviceName === e.target.value
    );
    setSelectedServices(selectedService);
    setAvailableTimings([]);
    setError("");
  };

  const handleTimingChange = (e) => {
    setSelectedTimings(e.target.value);
    checkTimings(e.target.value);
  };

  const AddBooking = async () => {
    const selectedDay = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (
      selectedServices &&
      selectedServices.availability[selectedDay].length !== 2
    ) {
      setError("Selected date is not available for the selected service.");
      return;
    }
    let response;
    try {
      let data = {
        patient_email: user.email,
        patient_name: `${user.firstName} ${user.lastName}`,
        clinic_name: clinic_data.title,
        service: selectedServices.serviceName,
        description: description,
        clinic_id: clinic_data._id,
        patient_image: user.imageUrl,
        booking_date: date,
        booking_time: selectedTimings,
      };
      response = await SaveBooking(data);
      console.log("Booking response:", response, response?._id);

      if (response) {
        message.success("Booked successfully!");
        form.resetFields();
        onClose();
      }
      data = {
        ...clinic_data,
        services: {
          date,
          description,
          selectedServices,
          selectedTimings,
        },
        bookingId: response?._id
      };  
      // if(response?.id) {
      //   data.bookingId = response?.id;
      // } 
      console.log('data: ', data);
      navigate("/price-details", { state: data });

    } catch (error) {
      console.log("Error while booking:", error);
      message.error("Failed to book the appointment. Please try again.");
    }

  };

  const navigate = useNavigate();
  const offset = -(new Date().getTimezoneOffset() / 60);

  return (
    <div className="absolute flex flex-col w-[80vw] md:w-[40vw] bg-white rounded-[1vw] md:rounded-[0.5vw] shadow-lg p-[2vh] z-50 overflow-y-scroll max-h-[95vh]">
      <div className="flex justify-stretch">
        <p className="text-clr2 text-[6vw] md:text-[2vw] font-bold">
          Book an Appointment
        </p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 absolute right-[1.5rem] top-[1.5rem]"
        >
          Close
        </button>
      </div>
      <select
        value={selectedServices ? selectedServices.serviceName : ""}
        onChange={handleServiceChange}
        className="border-[0.12vw] border-[#afafaf] p-[1vh] rounded-[1vw] mt-[2vh] focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
      >
        <option value="" disabled>
          Select Service
        </option>
        {clinic_data.services.map((service) => (
          <option key={service._id} value={service.serviceName}>
            {service.serviceName}
          </option>
        ))}
      </select>
      {offset > 0 ? (
        <div className="mt-[20px] ">
          <Alert
            className="mb-2"
            message={`This time is in standard format which is GMT/UTC, you time is +${offset} Hours ahead of this time. Kindly select accordingly.`}
            type="info"
            showIcon
          />
        </div>
      ) : (
        <Alert
          className="mb-5"
          message={`This time is in standard format which is GMT/UTC, you time is ${offset} Hours behind of this time. Kindly select accordingly.`}
          type="info"
          showIcon
        />
      )}
      {selectedServices && availableTimings.length > 0 && (
        <select
          value={selectedTimings}
          onChange={handleTimingChange}
          className="border-[0.12vw] border-[#afafaf] p-[1vh] rounded-[1vw] mt-[2vh] focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
        >
          <option value="" disabled>
            Select Timing
          </option>
          {availableTimings.map((timing, index) => (
            <option key={index} value={timing}>
              {timing}
            </option>
          ))}
        </select>
      )}
      <input
        type="date"
        // min={today}
        placeholder="Select Appointment Date"
        value={date}
        onChange={handleDate}
        className="border-[0.12vw] border-[#afafaf] p-[1vh] rounded-[1vw] mt-[5vh] focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
      />
      {error && <div className="text-red-500 mt-[2vh]">{error}</div>}
      {finalTime && <Alert
            className="mb-2 mt-4"
            message={`The final meeting timing in your region will be: ${finalTime}`}
            type="info"
            showIcon
      />}
      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={handleDescription}
        className="border-[0.12vw] border-[#afafaf] p-[1vh] rounded-[1vw] mt-[2vh] h-[10vh] resize-none focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
      />
      <button
        onClick={AddBooking}
        className="text-white text-[4vw] md:text-[1.4vw] mt-[5vh] font-bold bg-clr2 p-[1vh] px-[2vw] rounded-[0.8vw]"
      >
        Book Appointment
      </button>
    </div>
  );
}

export default Appointment;
