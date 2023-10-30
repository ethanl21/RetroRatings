import Button from "react-bootstrap/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth as fAuth } from "../config/firebase";
import { useState } from "react";
import { setRating } from "../tasks/setRating";
import { RatingPickerCard } from "./RatingPickerCard";
import { RatingItem, getRatingItem } from "../tasks/getRatingItems";
import { getUserRating } from "../tasks/getUserRatings";

export const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, authLoading, authError] = useAuthState(fAuth);

  // for testing rating card
  const [ratingItem, setRatingItem] = useState<RatingItem | null>(null);
  const [demoRating, setDemoRating] = useState(0);
  const [startedRating, setStartedRating] = useState(false);

  // keep track of the index of the item in the list
  // eslint-disable-next-line no-var
  var [itemIndex, setItemIndex] = useState(0);

  const entryKeys: string[] = [
    "0D3eg9jXmfeYiRDcErGc",
    "1Tx6zUj30nEHw7ex9O1J",
    "3wSJ3DSuxgEZI0VZU7vl",
    "5mgMUl5VT2NGuyfdVxvk",
    "5w1AEY0ilAp9Ydj5VGhe",
    "6AHGRYv6hhvOtwVR9q04",
    "7WcA9BONg8vutdUqz60F",
    "7dTHc67CdRFvNo6oQYsQ",
    "9elmGOTZF8JnSPbwCftf",
    "CgV0e0m02JZrkQBiqUtg",
    "DhulNIfPWm5OMxybtuyM",
    "ElhOmtK65ysQg1CWHpVV",
    "FTca9V4x65aUykAc4nMN",
    "G6XBWNrdZVewOhshWpiI",
    "HH2f0nRl5OMixiQl0Au7",
    "IVvGBufKhbqy1Pv17lkC",
    "IwjeMzPkMpmUXh0CLtJ2",
    "JgIKUjxnOvwaNWoe00N3",
    "Jp0sh6bLeDOZcmq9TogY",
    "LQlyH4oRQkjsk7NC7o60",
    "LZdvILmU5eleg2bMpike",
    "O4mSJod2fReYYR74aRcz",
    "OTdCwLjYyxww7sb0IT4p",
    "QkmziSH5r7nxdXIXJwmn",
    "Qn5E9W9QGJf5yaQdRNJI",
    "RiJ3ns4aVBd9iOoFYAD4",
    "RqkgrvG8W19waBZVbhTn",
    "S3YZ7rwN3ojgvlDIC3cA",
    "TNCIUuM5FUcJulwaBy40",
    "TmrDzWYpbZAhhHy8TUSv",
    "U9YprtPSUxQJjaTeTEfY",
    "UfwqPYzabewIkn11UCbg",
    "WJFCPWHnQyZd64NLWy3L",
    "WnPJPO2BBIzwxrFT9VFO",
    "YvtGqqP4uPyWfFT8QOwc",
    "b496Gg1YDIiXvnpd7MVN",
    "c87Zmp3FlynpyovGC3rj",
    "dxSYC8CMFoOfOKAog05w",
    "e889oM1INGtObJ4dsnMX",
    "gMrgJ4eyix8njaGMfTRK",
    "kPBbBGRbAX01RA00kQFV",
    "lobHx59BmXNc6yWECe0n",
    "lp0swYJJ56MQwlIx7ECQ",
    "o6QhF2UwFjgU2GhqiiY5",
    "oFgwl6RHbzQmKTGQX7A1",
    "odHMm6QX7RZGtB15v3nf",
    "rFEKyzri6qTyd4x18JXI",
    "tTeeSNSwpqYt57eXJ6Zy",
    "uTUqeJ9x7ML83W1IRn7D",
    "y6ZweKiHRJcEDtvt3nOF",
    "yVctvRktoHqZE999PNM6",
    "zqvYef8ftmU7Pbyc6Lee",
  ];

  const debugId = String(entryKeys[itemIndex]);
  // console.log(debugId);
  async function getDebugRatingItem() {
    if (auth) {
      // console.log("rendering new item");
      // console.log(debugId);
      setRatingItem(await getRatingItem(String(entryKeys[itemIndex])));
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
            onClick={() => {
              getDebugRatingItem();
              setStartedRating(true);
            }}
            hidden={startedRating}
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
