import { validateEmail } from "@/server/utils/validators";
import nodemailer from "nodemailer";

const sendEmailService = async (email: string) => {
  try {
    validateEmail(email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"QVision" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for signing up!",
      text: "We'll notify you when QVision is ready.",
      html: "<p>We'll notify you when QVision is ready.</p>",
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.error("Error sending notification email:", error);
    throw new Error(error?.message || "Failed to send email");
  }
}

export { sendEmailService }


