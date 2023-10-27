import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export const addRating = async (ratingItemId: string, ratingValue: number) => {
  try {
    if (!auth.currentUser) {
      return Promise.reject("Only logged in users can add ratings");
    }

    const userRatingsRef = doc(db, "user-ratings", auth.currentUser.uid);

    const ratingMap = new Map();
    ratingMap.set(ratingItemId, ratingValue);
    const newRatingData =  Object.fromEntries(ratingMap);

    await setDoc(userRatingsRef, newRatingData, {merge: true});

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
