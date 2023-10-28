import {
  collection,
  getDoc,
  getDocs,
  query,
  limit,
  doc,
  Timestamp,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { auth, db, storage } from "../config/firebase";
import { getDownloadURL } from "firebase/storage";

export type RatingItem = {
  addedBy: string;
  averageRating: number;
  dateAdded: Timestamp;
  description: string;
  image: string;
  name: string;
  ratingCount: number;
};

/**
 * @brief Gets items that can be rated from the database
 * @param count max amount of rating items to return
 * @returns Promise. Object of items that can be rated, or error
 */
export const getRatingItems = async (count: number) => {
  try {
    if (!auth.currentUser) {
      return Promise.reject("Only logged in users can view rating items.");
    }

    const q = query(collection(db, "rating-items"), limit(count));

    const querySnapshot = await getDocs(q);

    const returnedRatingItems = new Map();
    querySnapshot.forEach((doc) => {
      returnedRatingItems.set(doc.id, doc.data());
    });

    return Promise.resolve(Object.fromEntries(returnedRatingItems));
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @brief Gets a single rating item, if it exists
 * @param id id of the rating to get
 */
export const getRatingItem = async (id: string) => {
  const docRef = doc(db, "rating-items", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.data()) {
    return Promise.reject("Error: Item not found.");
  }

  const docData = docSnap.data() as RatingItem;
  docData.image = await getDownloadURL(ref(storage, docData.image));

  return Promise.resolve(docData);
};
