import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { SITEVISITS_COLLECTION_NAME, SITEVISITS_DOC_ID } from "@/server/constants";

const incrementWebsiteVisits = async (amount: number = 1) => {
  try {
    const docRef = doc(db, SITEVISITS_COLLECTION_NAME, SITEVISITS_DOC_ID)
    
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
    console.error("Error incrementing site visits", error);
    return { success: false, error };
  }
}

const getSiteVisits = async () => {
  try {
    const docRef = doc(db, SITEVISITS_COLLECTION_NAME, SITEVISITS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { success: true, count: 0 };

    const data = docSnap.data();
    return { success: true, count: data.count || 0 };
  } catch (error) {
    console.error("Error getting site visits:", error);
    return { success: false, error };
  }
};



export { incrementWebsiteVisits, getSiteVisits }
