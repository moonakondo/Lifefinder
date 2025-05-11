const IMeeting = require("../../model/meeting");
const IUser = require("../../model/auth");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Payment = require("../../model/payment");
const PaymentLink = require("../../model/paymentLink");
const IHospital = require("../../model/hospital/auth");
const { DateTime } = require("luxon");
const sendEmail = require("../../utils/sendInvitationMetting");


const getDate = (scheduledTime) => {
  // Function to get the day of the week as a string
  function getUTCDayString(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getUTCDay()];
  }
  
  // Function to get the month as a string
  function getUTCMonthString(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[date.getUTCMonth()];
  }

  let dayOfWeekUTC = getUTCDayString(scheduledTime); // Day of the week
  let monthUTC = getUTCMonthString(scheduledTime); // Month
  let dayOfMonthUTC = scheduledTime.getUTCDate(); // Day of the month
  let yearUTC = scheduledTime.getUTCFullYear(); // Year

  let hoursUTC = scheduledTime.getUTCHours(); // Hours
  let minutesUTC = scheduledTime.getUTCMinutes(); // Minutes
  let secondsUTC = scheduledTime.getUTCSeconds(); // Seconds

  const padWithZero = (num) => num.toString().padStart(2, '0');
  let period = hoursUTC >= 12 ? 'PM' : 'AM';
  let hours12 = hoursUTC % 12;
  hours12 = hours12 ? hours12 : 12; // the hour '0' should be '12'
  
  const time = `${padWithZero(hours12)}:${padWithZero(minutesUTC)} ${period}`;
  // const time = `${padWithZero(hoursUTC)}:${padWithZero(minutesUTC)}`;

  const date = `${monthUTC} ${dayOfMonthUTC}, ${yearUTC}`;
  return {
    time,
    date,
    day: dayOfWeekUTC
  }
}

exports.createMeeting = async (req, res) => {
  const { user_id, hospital_id, scheduled_time, payment_id, payment_link, offset, bookingId } =
    req.body;
  // console.log("🚀 ~ exports.createMeeting= ~ payment_id:", payment_id);
  // console.log("🚀 ~ exports.createMeeting= ~ payment_link:", payment_link);
  console.log('bookingId inside createMeeting: ', bookingId);
  try {
    // Check if hospital exists
    const hospital = await IHospital.findById(hospital_id);
    if (!hospital) {
      return res.status(400).json({ error: "Hospital not found" });
    }

    // Check if user exists
    const user = await IUser.findOne({ email: user_id });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const session_id = uuidv4();

    // Verify payment for meeting
    const payment = await Payment.findById(payment_id);
    console.log("🚀 ~ exports.createMeeting= ~ payment:", payment);
    if (!payment) {
      // If Payment is not available, then check PaymentLink which is alternate DB for payment
      const paymentLink = await PaymentLink.findById(payment_link);
      console.log("🚀 ~ exports.createMeeting= ~ paymentLink:", paymentLink);
      if (!paymentLink || !paymentLink?.paymentCompleted) {
        return res.status(401).json({ message: "Payment is not verified!" });
      }
    }

    const existingMeeting = await IMeeting.findOne({
      user_id,
      hospital_id,
      bookingId,
      paymentLinkId: payment_link,
    });

    if(existingMeeting) {
      // console.log('Meeting already exists!');
      return res.status(400).json({ message: "Meeting already exists!" });
    }

    // Create meeting
    const meeting = new IMeeting({
      user_id,
      hospital_id,
      session_id,
      scheduled_time,
      paymentId: payment_id,
      paymentLinkId: payment_link,
      bookingId: bookingId,
    });

    await meeting.save();

    // date edits
    console.log('schedule_time: ', scheduled_time, new Date(scheduled_time));
    // const scheduledTime = new Date();
    const scheduledTime = new Date(scheduled_time);
    
    let minutesToSubtract = offset;
    scheduledTime.setMinutes(scheduledTime.getMinutes() - minutesToSubtract);
    console.log("Changed Date: ", scheduledTime);

    const date = getDate(scheduledTime);

    const meetingDetails = {
      date: date.date, // e.g., July 15, 2024
      time: date.time, // e.g., 10:36 PM
      day: date.day, // e.g., Monday
      year: '', // e.g., 2024
      hospitalName: hospital.title,
      patientName: `${user.firstName} ${user.lastName}`,
      session_id: meeting.session_id,
    };

    let scheduledTime2 = new Date(scheduled_time);
    if(hospital.offsetTime) {
      scheduledTime2.setMinutes(scheduledTime2.getMinutes() - minutesToSubtract);
      console.log("Changed Date Hospital: ", scheduledTime2);
    }

    const date2 = getDate(scheduledTime2);

    const meetingDetailsHospital = {
      date: date2.date, // e.g., July 15, 2024
      time: date2.time, // e.g., 10:36 PM
      day: date2.day, // e.g., Monday
      year: '', // e.g., 2024
      hospitalName: hospital.title,
      patientName: `${user.firstName} ${user.lastName}`,
      session_id: meeting.session_id,
    };

    // Parse and format the scheduled_time using Luxon
    // console.log("Scheduled Time (raw):", meeting.scheduled_time);
    // const scheduledTime = DateTime.fromISO(
    //   meeting.scheduled_time.toISOString()
    // );
    // console.log("Scheduled Time (parsed):", scheduledTime.toString());

    // const meetingDetailsHospital = {
    //   date: scheduledTime.toLocaleString(DateTime.DATE_FULL), // e.g., July 15, 2024
    //   time: scheduledTime.toLocaleString(DateTime.TIME_SIMPLE), // e.g., 10:36 PM
    //   day: scheduledTime.toFormat("cccc"), // e.g., Monday
    //   year: scheduledTime.year, // e.g., 2024
    //   hospitalName: hospital.title,
    //   patientName: `${user.firstName} ${user.lastName}`,
    //   session_id: meeting.session_id,
    // };

    // Send email to patient
    await sendEmail(user.email, "Meeting Scheduled", "patient", meetingDetails);

    // Send email to hospital
    await sendEmail(
      hospital.email,
      "New Patient Meeting",
      "hospital",
      meetingDetailsHospital
    );

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await IMeeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMeetingById = async (req, res) => {
  const { id } = req.params;
  try {
    const meeting = await IMeeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.status(200).json(meeting);
  } catch (error) {
    console.error("Error fetching meeting by ID:", error);
    res.status(500).json({ error });
  }
};


exports.getMeetingByClinic = async (req, res) => {
  const { clinicId } = req.params;
  try {
    // const user = await IUser.findOne({ email: clinicId });

    // const meeting = await IMeeting.find({ hospitalId: user?.id }).populate('hospital_id').populate('bookingId');
    const meeting = await IMeeting.find({ hospital_id: clinicId }).populate('bookingId');
    console.log('meeting: ', meeting, clinicId);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.status(200).json(meeting);
  } catch (error) {
    console.error("Error fetching meeting for the given clinic: ", error);
    res.status(500).json({ error });
  }
};

exports.joinMeeting = async (req, res) => {
  const { email, session_id } = req.body;

  try {
    // Find the meeting by session_id
    const meeting = await IMeeting.findOne({ session_id });
    if (!meeting) {
      return res.status(400).json({ error: "Meeting not found" });
    }

    // Check if the current time is within 15 minutes before the scheduled time
    // const currentTime = moment();
    // console.log("🚀 ~ exports.joinMeeting= ~ currentTime:", currentTime);
    // const scheduledTime = moment(meeting.scheduled_time);
    // console.log("🚀 ~ exports.joinMeeting= ~ scheduledTime:", scheduledTime);
    // const timeDifference = scheduledTime.diff(currentTime, "minutes");
    const currentTime = new Date();
    console.log("🚀 ~ exports.joinMeeting= ~ currentTime:", currentTime);
    const scheduledTime = meeting.scheduled_time; // Replace with your scheduled time
    console.log("🚀 ~ exports.joinMeeting= ~ scheduledTime:", scheduledTime);

    const diffInMs = currentTime.getTime() - scheduledTime.getTime();

    // Convert the difference to minutes
    const diffInMinutes = diffInMs / 1000 / 60;
    console.log("🚀 ~ exports.joinMeeting= ~ diffInMinutes:", diffInMinutes);

    if (diffInMinutes < -15) {
      return res.status(400).json({
        error:
          "You can only join the meeting 15 minutes before the scheduled time",
      });
    }

    // comment
    if (diffInMinutes > 30) {
      return res.status(400).json({
        error:
          "The 30 minutes meeting time has been passed, you cannot join after the time!",
      });
    }

    // Check if email belongs to either the user or the hospital
    const hospital = await IHospital.findById(meeting.hospital_id);
    const user = await IUser.findOne({ email: meeting.user_id });

    if (!hospital || !user) {
      return res.status(400).json({ error: "Invalid meeting details" });
    }

    if (email !== hospital.email && email !== user.email) {
      return res
        .status(400)
        .json({ error: "Unauthorized access to the meeting" });
    }

    // If all checks are passed, allow the user to join the meeting
    res.status(200).json({
      success: true,
      message: "You have successfully joined the meeting",
    });

    // set meeting_completed to 'true'
    if(email == hospital.email) {
      meeting.meeting_completed = true;
      await meeting.save();
    }
  } catch (error) {
    console.error("Error joining meeting:", error);
    res.status(500).json({ error: "Server error" });
  }
};
