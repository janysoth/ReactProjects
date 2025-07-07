const nodeMailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: Number(process.env.MAIL_PORT) === 465,
      secure: true, // true for port 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      }
    });

    // Optional: Verify connection config
    await transporter.verify();
    console.log('Email server is ready to send messages.');

    // In case email clients can't render HTML, add a plain text version
    const mailOptions = {
      from: `"Support" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text: html.replace(/<[^>]*>?/gm, ''), // crude HTML to text fallback
      html,
    };


    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;