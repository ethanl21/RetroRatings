import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// TODO: figure out how to upload files to the database for the item's image

/**
 * @brief Adds a new item that can be rated to the database
 * @param itemName name of the item
 * @param description a short description of the item
 */
export const addRatingItem = async (itemName: string, description: string) => {
  try {
    await addDoc(collection(db, "rating-items"), {
      itemName: itemName,
      description: description,
      averageRating: undefined,
      dateAdded: Timestamp.now(),
    });
  } catch (err) {
    alert(err);
  }
};
