import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

/**
 * @brief Adds a rating to the database
 * @param ratingItemId ID of the item to rate
 * @param ratingValue The user's selected rating
 * @returns Promise, undefined or error
 */
export const addRating = async (ratingItemId: string, ratingValue: number) => {
  try {
    if (!auth.currentUser) {
      return Promise.reject("Only logged in users can add ratings");
    }

    const userRatingsRef = doc(db, "user-ratings", auth.currentUser.uid);

    const ratingMap = new Map();
    ratingMap.set(ratingItemId, ratingValue);
    const newRatingData = Object.fromEntries(ratingMap);

    await setDoc(userRatingsRef, newRatingData, { merge: true });

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
