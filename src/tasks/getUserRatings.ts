import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

/**
 * @brief Gets a user's ratings
 * @param userId ID of the user to get ratings from
 * @returns Promise. Object of the user's ratings, undefined if they have no ratings, or error
 */
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

export const getUserRating = async (userId: string, ratingItemId: string) => {
  try {
    if (!auth.currentUser) {
      return Promise.reject("Only logged in users can view a user's ratings.");
    }

    const docRef = doc(db, "user-ratings", userId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if (data && Object.keys(data).indexOf(ratingItemId) >= 0) {
      return Promise.resolve(data[ratingItemId]);
    } else {
      return Promise.reject("Error: rating not found.");
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
