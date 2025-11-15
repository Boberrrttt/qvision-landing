import { db } from "@/server/firebase/config";
import { addDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { sendEmailService } from "../firebase/services/nodemailer.service";

const sendEmail = async (email: string) => {
  try {
    const notifyRef = collection(db, "emails");

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

export { sendEmail };

