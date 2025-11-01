import { db } from "@/server/firebase/config"
import { sendEmailService } from "@/server/services/nodemailer.service";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const sendEmail = async (email: string) => {
  try {

    const notifyRef = collection(db, 'emails');
    await addDoc(notifyRef, {
        email,
        createdAt: serverTimestamp()
      }
    )

    await sendEmailService(email);

    return { message: 'Email saved and notification sent successfully'};

  } catch (error: any) {
    console.error("Error in sendEmail controller:", error);
    throw new Error(error?.message || "Failed to process email notification");
  }
}

export { sendEmail }

