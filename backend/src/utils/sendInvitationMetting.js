const nodemailer = require("nodemailer");
const { Google_App_Password, sendEmailAuth, FRONTEND_URL } = require("../config");

const sendEmail = async (to, subject, emailType, meetingDetails) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: sendEmailAuth,
      pass: Google_App_Password,
    },
  });

  const { date, time, day, year, hospitalName, patientName, session_id } =
    meetingDetails;

  let htmlContent;

  const patientAlertMessage = `
    <p style="font-size: 16px; color: #333;">Dear ${patientName},</p>
    <p style="font-size: 16px; color: #333;">Please ensure to be on time for your appointment with ${hospitalName}. You have a 30-minute slot allocated for this meeting.</p>
    <p style="font-size: 16px; color: #333;">If you do not join on time, the meeting will be considered canceled, and you may need to reschedule, which could lead to delays in your treatment.</p>
    <p style="font-size: 16px; color: #333;">We highly encourage you to be prompt to make the most of your consultation time.</p>
    <p style="font-size: 16px; color: #333;">Thank you for your understanding.</p>
  `;

  const doctorAlertMessage = `
    <p style="font-size: 16px; color: #333;">Dear ${hospitalName},</p>
    <p style="font-size: 16px; color: #333;">Please prepare for your upcoming meeting with ${patientName}. The patient has a 30-minute slot allocated for this consultation.</p>
    <p style="font-size: 16px; color: #333;">If the patient does not join on time, the meeting will be considered canceled. This could impact your schedule and reduce the time available for other patients.</p>
    <p style="font-size: 16px; color: #333;">We appreciate your understanding and cooperation in ensuring timely consultations.</p>
  `;

  const baseTemplate = (name, detailsMessage, alertMessage) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
      <h2 style="background-color: #000949; color: white; text-align: center; padding: 10px 0; margin: 0; border-radius: 5px 5px 0 0;">Life-Finder</h2>
      <div style="padding: 20px;">
        <p style="font-size: 20px; font-weight: bold; color: #1daefd;">Hello ${name},</p>
        ${detailsMessage}
        ${alertMessage}
        <a href="${FRONTEND_URL}/room?id=${session_id}&email=${to}" style="display: inline-block; background-color: #1daefd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Join Meeting</a>
        <p style="font-size: 16px; color: #333; margin-top: 20px;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 20px; color: #1daefd; margin-top: 20px;">Thank you!</p>
        <p style="font-size: 16px; color: #333;">The Life-Finder Team</p>
      </div>
    </div>
  `;

  if (emailType === "patient") {
    const detailsMessage = `
      <p style="font-size: 16px; color: #333;">You have a new meeting scheduled with ${hospitalName}. Here are the details:</p>
      <p style="font-size: 16px; color: #333;"><strong>Date:</strong> ${day}, ${date} ${year}</p>
      <p style="font-size: 16px; color: #333;"><strong>Time:</strong> ${time}</p>
      <p style="font-size: 16px; color: #333;"><strong>Meeting ID:</strong> ${session_id}</p>
    `;
    htmlContent = baseTemplate(
      patientName,
      detailsMessage,
      patientAlertMessage
    );
  } else if (emailType === "hospital") {
    const detailsMessage = `
      <p style="font-size: 16px; color: #333;">You have a new meeting scheduled with ${patientName}. Here are the details:</p>
      <p style="font-size: 16px; color: #333;"><strong>Date:</strong> ${day}, ${date} ${year}</p>
      <p style="font-size: 16px; color: #333;"><strong>Time:</strong> ${time}</p>
      <p style="font-size: 16px; color: #333;"><strong>Meeting ID:</strong> ${session_id}</p>
    `;
    htmlContent = baseTemplate(
      hospitalName,
      detailsMessage,
      doctorAlertMessage
    );
  } else {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <h2 style="background-color: #000949; color: white; text-align: center; padding: 10px 0; margin: 0; border-radius: 5px 5px 0 0;">Life-Finder</h2>
        <div style="padding: 20px;">
          <p style="font-size: 20px; font-weight: bold; color: #1daefd;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Please verify your account with the following details:</p>
          <p style="font-size: 16px; color: #333;"><strong>Date:</strong> ${day}, ${date} ${year}</p>
          <p style="font-size: 16px; color: #333;"><strong>Time:</strong> ${time}</p>
          <p style="font-size: 16px; color: #333;"><strong>Session ID:</strong> ${session_id}</p>
          <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
          <a href="${FRONTEND_URL}/room?id=${session_id}&email=${to}" style="display: inline-block; background-color: #1daefd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Start Meeting</a>
          <p style="font-size: 20px; color: #1daefd; margin-top: 20px;">Thank you!</p>
          <p style="font-size: 16px; color: #333;">The Life-Finder Team</p>
        </div>
      </div>
    `;
  }

  let mailOptions = {
    from: sendEmailAuth,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
