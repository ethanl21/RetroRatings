import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const getUserRatings = async (userId: string) => {
  try {
    if (!auth.currentUser) {
      return Promise.reject("Only logged in users can view a user's ratings.");
    }

    const docRef = doc(db, "user-ratings", userId);
    const docSnap = await getDoc(docRef);

    return Promise.resolve(docSnap.data());
  } catch (err) {
    return Promise.reject(err);
  }
};
