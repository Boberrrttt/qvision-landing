import { db } from "@/server/firebase/config";
import { addDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { getEmailsSent, sendEmailService } from "../firebase/services/nodemailer.service";
import { EMAILSENT_COLLECTION_NAME } from "../constants";

const sendEmail = async (email: string) => {
  try {
    const notifyRef = collection(db, EMAILSENT_COLLECTION_NAME);

    const q = query(notifyRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      await addDoc(notifyRef, {
        email,
        createdAt: serverTimestamp(),
      });
    }

    await sendEmailService(email);

    return { message: "Email saved and notification sent successfully." };
  } catch (error: any) {
    console.error("Error in sendEmail controller:", error);
    throw new Error(error?.message || "Failed to process email notification.");
  }
};

const getTotalEmails = async () => {
  try {
    const response = await getEmailsSent();
    return { success: true, data: response, message: "Fetched total emails" };
  } catch (error) {
    console.error('Failed to fetch total emails', error);
    return { success: false, data: null, message: "Failed to fetch total emails." };
  }
}

export { sendEmail, getTotalEmails };

