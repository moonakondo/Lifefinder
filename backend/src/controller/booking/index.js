const Booking = require('../../model/bookings');

const addBooking = async (req, res) => {
  const { patient_email, clinic_id, booking_date, booking_time, service, patient_name, clinic_name, description, patient_image } = req.body;
  
  try {
      
      const existingBooking = await Booking.findOne({
          clinic_id,
          booking_date,
          booking_time
      });

      if (existingBooking) {
          return res.status(500).json({ message: "Time slot not available" });
      }
      const newBooking = new Booking({
          patient_email,
          clinic_id,
          booking_date,
          booking_time,
          clinic_name,
          service,
          patient_name,
          description,
          patient_image,
          createdAt: new Date()
      });
      await newBooking.save();
      // res.status(200).json({ message: "Booking saved successfully" });
      res.status(200).json(newBooking);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to save booking" });
  }
};

const getAllBookings = async (req, res) => {
  const clinicId = req.params.clinicId;
    try {
      if(!clinicId) {
        return res.status(400).json({ message: 'Clinic Id is missing!'});
      }
      const bookings = await Booking.find({ clinic_id: clinicId });
      res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to Retrieve Bookings" });
    }
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(401).send({ message: "Id does not Provided" });
      }
      const response = await Booking.deleteOne({ _id: "668449dd41364b372542aa70" });
      res.send({ message: " message delete successfully", data: response });
    } catch (err) {
      console.log("🚀 ~ deleteMessageById ~ err:", err);
      res.status(500).json({ message: "Server Error" });
    }
  };

module.exports = { addBooking, getAllBookings, deleteBooking };
