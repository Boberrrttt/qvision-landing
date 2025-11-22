import { validateEmail } from "@/server/utils/validators";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import nodemailer from "nodemailer";
import { EMAILSENT_COLLECTION_NAME } from "@/server/constants";
import { db } from "../config";
import path from 'path';
import { fileURLToPath } from 'url';

interface PaginatedEmailResponse {
  emails: any[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const sendEmailService = async (email: string) => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const projectRoot = path.resolve(__dirname, '../../../..');
 
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
        <div style="width: 100%; background-color: #d9d9d9; padding: 50px 0; font-family: Arial, Helvetica, sans-serif;">

          <!-- White content card -->
          <table role="presentation" align="center" width="600" style="background-color: #ffffff; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 20px;">
                
                <!-- Logos -->
                <div style="margin-bottom: 30px;">
                  <img src="cid:qvisionLogo" alt="QVISION" style="height: 22px; border-right: 1px solid #ccc; padding-right: 10px;">
                  <img src="cid:byteqLogo" alt="byteq" style="height: 25px; margin-left: 10px;">
                </div>

                <!-- Text content -->
                <p style="font-size: 16px; margin-bottom: 10px;">Hi!</p>
                <p style="font-size: 16px; margin-bottom: 10px;">Thank you for signing up to stay updated with <strong>QVision</strong>.</p>
                <p style="font-size: 16px; margin-bottom: 10px;">We're still bringing this into reality, but soon, you'll be among the first to see it clearly. Your support means a lot to us. <strong>We'll notify you the moment QVision is ready for launch.</strong></p>
                <p style="font-size: 16px; margin-bottom: 0;">Until then, thank you for trusting in our vision.</p>

              </td>
            </tr>

            <!-- Black footer inside white card with rounded bottom corners -->
            <tr>
              <td style="background-color: #000000; text-align: center; padding: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="font-size: 24px; font-weight: bold; margin: 0;">
                  <span style="color: #ffffff;">byte</span><span style="color: #5CE1E6;">q</span>
                </p>

                <table role="presentation" width="100%" style="margin-top: 10px;">
                  <tr>
                    <td align="center">
                      <a href="https://facebook.com/yourpage" style="margin-right: 15px;">
                        <img src="cid:facebookLogo" alt="Facebook" style="height: 20px; width: 20px;">
                      </a>
                      <a href="https://instagram.com/yourpage">
                        <img src="cid:instagramLogo" alt="Instagram" style="height: 20px; width: 20px;">
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="color: #888; font-size: 12px; font-style: italic; margin: 10px 0 0 0;">Choose, Engineered.</p>
              </td>
            </tr>

          </table>

        </div>

        `,
      attachments: [
        {
          filename: 'Logo.png',
          path: path.join(projectRoot, 'public', 'assets', 'Logo.png'),
          cid: 'qvisionLogo'
        },
        {
          filename: 'byteq-logo.png',
          path: path.join(projectRoot, 'public', 'assets', 'byteq-logo.png'),
          cid: 'byteqLogo'
        },
        {
          filename: 'facebook-logo.png',
          path: path.join(projectRoot, 'public', 'assets', 'facebook-white.png'),
          cid: 'facebookLogo'
        },
        {
          filename: 'instagram-logo.png',
          path: path.join(projectRoot, 'public', 'assets', 'instagram-white.png'),
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


