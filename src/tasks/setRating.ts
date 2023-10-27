import { auth, db } from "../config/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

/**
 * @brief Sets a rating in the database. Rating will be overwritten if it already exists.
 * @param ratingItemId ID of the item to rate
 * @param ratingValue The user's selected rating, or -1 if deleting a rating.
 * @returns Promise, undefined or error
 */
export const setRating = async (ratingItemId: string, ratingValue: number) => {
  try {
    if (!auth.currentUser) {
      return Promise.reject("Only logged in users can add ratings");
    }

    // remove from the average
    const ratingItemDoc = doc(db, "rating-items", ratingItemId);
    const ratingItemSnapshot = await getDoc(ratingItemDoc);
    if (!ratingItemSnapshot.data()) {
      return Promise.reject("Cannot rate an item that does not exist.");
    }

    const ratingItemSnapData = ratingItemSnapshot.data()!;
    const userRatingsRef = doc(db, "user-ratings", auth.currentUser.uid);

    // Set the rating
    if (ratingValue === -1) {
      const docSnap = await getDoc(userRatingsRef);
      const data = docSnap.data();
      if (data && Object.keys(data).indexOf(ratingItemId) < 0) {
        return Promise.reject("Cannot delete a rating that does not exist.");
      }

      const ratingValueToRemove: number = docSnap.data()![ratingItemId];

      await updateDoc(userRatingsRef, {
        [ratingItemId]: deleteField(),
      });

      // Update the average rating
      if (ratingItemSnapData.ratingCount <= 0) {
        // don't update the average if there are no ratings
        // this is actually an error but idk how to fix it here
        return Promise.resolve();
      } else if (ratingItemSnapData.ratingCount === 1) {
        // If this is the last rating, prevent divide by zero
        ratingItemSnapData.averageRating = 0;
        ratingItemSnapData.ratingCount = 0;
      } else {
        let temp =
          ratingItemSnapData.averageRating * ratingItemSnapData.ratingCount;
        temp -= ratingValueToRemove;

        ratingItemSnapData.ratingCount -= 1;
        ratingItemSnapData.averageRating =
          temp / ratingItemSnapData.ratingCount;
      }

      // update the average rating
      await updateDoc(ratingItemDoc, ratingItemSnapData);
    } else {
      await setDoc(
        userRatingsRef,
        { [ratingItemId]: ratingValue },
        { merge: true }
      );

      // calculate the new average rating
      let temp =
        ratingItemSnapData.averageRating * ratingItemSnapData.ratingCount;
      ratingItemSnapData.ratingCount += 1;
      temp += ratingValue;
      ratingItemSnapData.averageRating = temp / ratingItemSnapData.ratingCount;

      // update the average rating
      await updateDoc(ratingItemDoc, ratingItemSnapData);
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
