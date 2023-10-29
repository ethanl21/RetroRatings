import { auth, db, storage } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import DOMPurify from "dompurify";

/**
 * @brief Adds a new item that can be rated to the database
 * @param itemName name of the item
 * @param description a short description of the item
 */
export const addRatingItem = async (
  itemName: string,
  description: string,
  image: File,
) => {
  try {
    let result = null;
    if (auth.currentUser) {
      const imageName = DOMPurify.sanitize(
        `${nanoid()}.${image.name.split(".").pop()}`,
      );
      const imageRef = ref(storage, `/rating-items-images/${imageName}`);
      result = await uploadBytes(imageRef, image);
    }

    await addDoc(collection(db, "rating-items"), {
      name: DOMPurify.sanitize(itemName),
      description: DOMPurify.sanitize(description),
      averageRating: 0,
      ratingCount: 0,
      dateAdded: Timestamp.now(),
      addedBy: auth.currentUser ? auth.currentUser.uid : null,
      image: result ? result.ref.toString() : null,
    });

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
