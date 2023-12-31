import {
  collection,
  getDoc,
  getDocs,
  query,
  limit,
  doc,
  Timestamp,
  orderBy,
  where,
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

export const getHighestRatedItems = async (count: number) => {
  if (!auth.currentUser) {
    return Promise.reject("Only logged in users can view rating items.");
  }

  try {
    const q = query(
      collection(db, "rating-items"),
      orderBy("ratingCount"),
      where("ratingCount", ">", 0),
      orderBy("averageRating", "desc"),
      limit(count),
    );
    const querySnapshot = await getDocs(q);

    const returnedRatingItems: Array<RatingItem> = [];
    querySnapshot.docs.forEach((doc) => {
      returnedRatingItems.push(doc.data() as RatingItem);
    });

    return Promise.resolve(returnedRatingItems);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getLowestRatedItems = async (count: number) => {
  if (!auth.currentUser) {
    return Promise.reject("Only logged in users can view rating items.");
  }

  try {
    const q = query(
      collection(db, "rating-items"),
      orderBy("ratingCount"),
      where("ratingCount", ">", 0),
      orderBy("averageRating", "asc"),
      limit(count),
    );
    const querySnapshot = await getDocs(q);

    const returnedRatingItems: Array<RatingItem> = [];
    querySnapshot.docs.forEach((doc) => {
      returnedRatingItems.push(doc.data() as RatingItem);
    });

    return Promise.resolve(returnedRatingItems);
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

/**
 * @brief convenience function wrapper for getRatingItem. Only returns the image URL.
 * @param id id of the rating item
 * @returns a URL of the selected item's image, if the item exists
 */
export const getRatingItemImage = async (id: string) => {
  const item = await getRatingItem(id);
  if (item) {
    return Promise.resolve({ id: id, url: item.image });
  }

  return Promise.reject();
};
