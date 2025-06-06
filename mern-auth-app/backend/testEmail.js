require("dotenv").config();
const sendMail = require("./utils/sendMail"); // ✅ updated path

const run = async () => {
  const to = "janysoth@gmail.com";
  const subject = "Test Email from Nodemailer";
  const html = `<h1>Hello!</h1><p>This is a test email from your Node.js app using Gmail.</p>`;

  try {
    await sendMail(to, subject, html);
    console.log("✅ Test email sent successfully!");
  } catch (err) {
    console.error("❌ Failed to send test email:", err.message);
  }
};

run();