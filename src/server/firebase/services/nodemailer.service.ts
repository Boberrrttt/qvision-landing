import { validateEmail } from "@/server/utils/validators";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import nodemailer from "nodemailer";
import { EMAILSENT_COLLECTION_NAME } from "@/server/constants";
import { db } from "../config";

interface PaginatedEmailResponse {
  emails: any[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

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

    if (snapshot.empty) {
      return { success: true, count: 0, emails: [] };
    }

    const totalCount = snapshot.size;

    return { success: true, count: totalCount };
  } catch (error) {
    console.error("Error getting emails:", error);
    return { success: false, error };
  }
};

const getPaginatedEmails = async (
  limitQuery: number = 10,
  page: number = 1
): Promise<{ success: boolean; data?: PaginatedEmailResponse; error?: any }> => {
  try {
    const colRef = collection(db, EMAILSENT_COLLECTION_NAME);

    const allSnapshot = await getDocs(colRef);
    const totalCount = allSnapshot.size;
    const totalPages = Math.ceil(totalCount / limitQuery);

    if (page < 1 || page > totalPages) {
      return { success: false, error: "Invalid page number" };
    }

    const startIndex = (page - 1) * limitQuery;

    const q = query(colRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    const slicedDocs = snapshot.docs.slice(startIndex, startIndex + limitQuery);

    const emails = slicedDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: {
        emails,
        totalCount,
        totalPages,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error during pagination:", error);
    return { success: false, error };
  }
};

export { sendEmailService, getEmailsSent, getPaginatedEmails }


