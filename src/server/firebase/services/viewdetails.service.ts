import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../config"
import { VIEWDETAILS_COLLECTION_NAME, VIEWDETAILS_DOC_ID } from "@/server/constants";

const incrementViewDetails = async (amount: number = 1) => {
  try {
    const docRef = doc(db, VIEWDETAILS_COLLECTION_NAME, VIEWDETAILS_DOC_ID);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        count: amount,
        updatedAt: new Date(),
      });
    } else {
      await updateDoc(docRef, {
        count: increment(amount),
        updatedAt: new Date(),
      });
    }
    return { success: true }
  } catch (error) {
    console.error("Error incrementing view details", error);
    return { success: false, error };
  }
}

const getViewDetailsCount = async () => {
  try {
    const docRef = doc(db, VIEWDETAILS_COLLECTION_NAME, VIEWDETAILS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { success: true, count: 0 };

    const data = docSnap.data();
    return { success: true, count: data.count || 0 };
  } catch (error) {
    console.error("Error getting view details:", error);
    return { success: false, error };
  }
};

export { incrementViewDetails, getViewDetailsCount }
