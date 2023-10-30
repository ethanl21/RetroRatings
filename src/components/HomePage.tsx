import Button from "react-bootstrap/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth as fAuth } from "../config/firebase";
import { useState } from "react";
import { setRating } from "../tasks/setRating";
import { RatingPickerCard } from "./RatingPickerCard";
import {
  RatingItem,
  getRatingItem,
  getRatingItems,
} from "../tasks/getRatingItems";
import { getUserRating } from "../tasks/getUserRatings";

export const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, authLoading, authError] = useAuthState(fAuth);

  // for testing rating card
  const [ratingItem, setRatingItem] = useState<RatingItem | null>(null);
  const [demoRating, setDemoRating] = useState(0);
  const [isRating, setIsRating] = useState(false);

  // keep track of the index of the item in the list
  /* eslint-disable */
  var [itemIndex, setItemIndex] = useState(0);

  type Arr = {
    arr: String[];
  };
  var [entryKeys, setEntryKeys] = useState<Array<string>>([]);

  const numOfItems = 100; // Using 100 because it is more than what is in the database

  getRatingItems(numOfItems).then(async (values) => {
    var keys = Object.keys(values);
    // console.log(keys);
    setEntryKeys(keys);
  });

  const debugId = entryKeys[itemIndex];
  // console.log(debugId);
  async function getDebugRatingItem() {
    if (auth) {
      // console.log("rendering new item");
      // console.log(debugId);
      setRatingItem(await getRatingItem(entryKeys[itemIndex]));
      try {
        const dbgRating = await getUserRating(auth.uid, debugId);
        setDemoRating(dbgRating);
      } catch (err) {
        setDemoRating(0);
      }
    } else {
      alert("only logged in users can rate items!");
    }
  }

  function next() {
    setItemIndex((itemIndex += 1));
    getDebugRatingItem();
  }

  function prev() {
    setItemIndex((itemIndex -= 1));
    getDebugRatingItem();
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <Button
            hidden={isRating}
            onClick={() => {
              getDebugRatingItem();
              setIsRating(true);
            }}
          >
            Start Rating Items
          </Button>
          {ratingItem && (
            <RatingPickerCard
              id={debugId}
              name={ratingItem.name}
              description={ratingItem.description}
              img_src={ratingItem.image}
              rating={demoRating}
              OnRatingChanged={(id, rating) =>
                setRating(id, rating)
                  .then(() => {
                    // alert("rating set!"); // Commented out to speed up user experience
                    setItemIndex((itemIndex += 1)); // increase index first
                    // console.log(itemIndex); // used to debug
                    getDebugRatingItem(); // call function to refresh item
                  })
                  .catch((err) => alert(err))
              }
            />
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ padding: 20 }}>
        <div style={{ padding: 30 }}>
          <Button onClick={prev} size="lg">
            Prev
          </Button>
        </div>
        <div style={{ padding: 30 }}>
          <Button onClick={next} size="lg">
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
