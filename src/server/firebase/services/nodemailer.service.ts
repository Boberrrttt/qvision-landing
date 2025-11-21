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
      subject: "Thanks for signing up for QVision updates!",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="margin-bottom: 20px;">
            <img src="cid:qvisionLogo" alt="QVISION" style="height: 22px; display: inline-block; vertical-align: middle; border-right: 1px solid #ccc; padding-right: 10px;">
            <img src="cid:byteqLogo" alt="byteq" style="height: 25px; display: inline-block; vertical-align: middle; margin-left: 10px;">
          </div>
          
          <p style="font-family: Arial, Helvetica, sans-serif;">Hi!</p>
          
          <p style="font-family: Arial, Helvetica, sans-serif;">Thank you for signing up to stay updated with <strong style="font-family: Arial, Helvetica, sans-serif;">QVision</strong>.</p>
          
          <p style="font-family: Arial, Helvetica, sans-serif;">We're still bringing this into reality, but soon, you'll be among the first to see it clearly. Your support means a lot to us. <strong style="font-family: Arial, Helvetica, sans-serif;">We'll notify you the moment QVision is ready for launch.</strong></p>
          
          <p style="font-family: Arial, Helvetica, sans-serif;">Until then, thank you for trusting in our vision.</p>
          
          <div style="background-color: #000000; padding: 20px; margin-top: 20px; text-align: center;">
            <div style="margin-bottom: 10px;">
              <p style="font-size: 24px; font-weight: bold; margin: 0; font-family: Arial, Helvetica, sans-serif;">
                <span style="color: #ffffff;">byte</span><span style="color: #5CE1E6;">q</span>
              </p>
            </div>
            
            <div style="display: flex; justify-content: center; text-align: center; gap: 15px; width: 100%; margin-bottom: 15px;">
              <a href="https://facebook.com/yourpage">
                <img src="cid:facebookLogo" alt="Facebook" style="height: 20px; width: 20px;">
              </a>
              <a href="https://instagram.com/yourpage">
                <img src="cid:instagramLogo" alt="Instagram" style="height: 20px; width: 20px;">
              </a>
            </div>
            
            <p style="color: #888; font-size: 12px; font-style: italic; margin: 0; font-family: Arial, Helvetica, sans-serif;">Choose, Engineered.</p>
          </div>
        </div>
        `,
      attachments: [
        {
          filename: 'Logo.png',
          path: './public/assets/Logo.png',
          cid: 'qvisionLogo'
        },
        {
          filename: 'byteq-logo.png', 
          path: './public/assets/byteq-logo.png',
          cid: 'byteqLogo'
        },
        {
          filename: 'facebook-logo.png',
          path: './public/assets/facebook-white.png',
          cid: 'facebookLogo'
        },
        {
          filename: 'instagram-logo.png',
          path: './public/assets/instagram-white.png',
          cid: 'instagramLogo'
        }
      ]
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


