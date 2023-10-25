import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const addRatingItem = async (item: string, description: string) => {
  try {
    await addDoc(collection(db, "rating-items"), {
      item: item,
      description: description,
      averageRating: undefined,
      dateAdded: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
};
