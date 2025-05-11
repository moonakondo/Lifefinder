const nodemailer = require("nodemailer");
const { Google_App_Password, sendEmailAuth } = require("../config");

const sendFeedbackEmail = async (to, feedbackDetails) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: sendEmailAuth,
      pass: Google_App_Password,
    },
  });

  const {
    name,
    email,
    countryValue,
    services,
    clinicName,
    clinicLocation,
    treatmentDate,
    overallRating,
    qualityRating,
    hygieneRating,
    costRating,
    waitingRating,
    postCareRating,
    experience,
    recommend,
    additionalComments,
  } = feedbackDetails;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f7f9fc;">
    <header style="background-color: #0044cc; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">New Feedback Received</h1>
    </header>
    
    <main style="padding: 20px;">
      <p style="font-size: 18px; color: #333;">Dear Anne Charlotte,</p>
      <p style="font-size: 16px; color: #555;">We have received new feedback from a Life-Finder user. Below are the details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: white; border-radius: 5px; overflow: hidden; border: 1px solid #ddd;">
        <tr>
          <th style="background-color: #0044cc; color: white; text-align: left; padding: 12px;">Field</th>
          <th style="background-color: #0044cc; color: white; text-align: left; padding: 12px;">Details</th>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Name</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${
            name || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Email</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${
            email || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Country</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${countryValue}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Services</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${
            services || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Clinic Name</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${clinicName}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Clinic Location</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${clinicLocation}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Date of Treatment</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${new Date(
            treatmentDate
          ).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Overall Rating</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${overallRating}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Quality Rating</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${qualityRating}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Hygiene Rating</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${hygieneRating}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Cost Rating</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${costRating}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Waiting Time Rating</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${waitingRating}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Post-Care Rating</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${postCareRating}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Experience</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${experience}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Would Recommend</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${
            recommend ? "Yes" : "No"
          }</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">Additional Comments</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${
            additionalComments || "N/A"
          }</td>
        </tr>
      </table>
    </main>
    
    <footer style="font-size: 14px; color: #666; text-align: center; padding: 10px; border-top: 1px solid #ddd; margin-top: 20px;">
      <p>&copy; ${new Date().getFullYear()} Life-Finder. All rights reserved.</p>
      <p style="margin: 5px 0;">This email was generated automatically, please do not reply to this message.</p>
    </footer>
  </div>
  `;

  let mailOptions = {
    from: sendEmailAuth,
    to: to,
    subject: "New Feedback Received",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Feedback email sent successfully");
  } catch (error) {
    console.error("Error sending feedback email:", error);
  }
};

module.exports = sendFeedbackEmail;
