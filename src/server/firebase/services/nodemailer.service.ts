import { validateEmail } from "@/server/utils/validators";
import { collection, getDocs } from "firebase/firestore";
import nodemailer from "nodemailer";
import { EMAILSENT_COLLECTION_NAME } from "@/server/constants";
import { db } from "../config";

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

const getEmailsSent = async () => {
  try {
    const colRef = collection(db, EMAILSENT_COLLECTION_NAME);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) return { success: true, count: 0 };

    let totalCount = snapshot.size;

    return { success: true, count: totalCount };
  } catch (error) {
    console.error("Error getting preOrders:", error);
    return { success: false, error };
  }
};
export { sendEmailService, getEmailsSent }


