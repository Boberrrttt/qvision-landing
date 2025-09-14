import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config";

const PREORDER_DOC_ID = "counter"; 
const COLLECTION_NAME = "preOrders";

const incrementPreOrders = async (amount: number = 1) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, PREORDER_DOC_ID);

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

    return { success: true };
  } catch (error) {
    console.error("Error incrementing preOrders:", error);
    return { success: false, error };
  }
};

const getPreOrders = async () => {
  try {
    const docRef = doc(db, COLLECTION_NAME, PREORDER_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { success: true, count: 0 };

    const data = docSnap.data();
    return { success: true, count: data.count || 0 };
  } catch (error) {
    console.error("Error getting preOrders:", error);
    return { success: false, error };
  }
};

export { incrementPreOrders, getPreOrders };

