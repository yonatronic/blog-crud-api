import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.SENDGRID_EMAIL || !process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SendGrid config in environment variables");
}

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // this must be literal
    pass: process.env.SENDGRID_API_KEY,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    console.log("✅ SendGrid From:", process.env.SENDGRID_EMAIL);
    console.log("✅ SendGrid Key Exists:", !!process.env.SENDGRID_API_KEY);

    console.log("📤 Preparing email:");
    console.log({ to, subject, from: process.env.SENDGRID_EMAIL });

    await transporter.sendMail({
      from: process.env.SENDGRID_EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send failed: ", error.response?.body || error);
    throw new Error("Email send failed");
  }
};
