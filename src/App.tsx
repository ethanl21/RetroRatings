import { useState } from "react";
import { signOut } from "firebase/auth";
import { AuthCard } from "./components/AuthCard";
import { auth } from "./config/firebase";
// import { AddNewItemCard } from "./components/AddNewItemCard";
// import { addRatingItem } from "./tasks/addItem";

import Button from "react-bootstrap/Button";
// import Stack from "react-bootstrap/Stack"; // Not used

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Modal from "react-bootstrap/Modal";
import { RatingPickerCard } from "./components/RatingPickerCard";
import {
  RatingItem,
  getRatingItem,
  // getRatingItems, // used to get all item IDs
} from "./tasks/getRatingItems";
import { getUserRating } from "./tasks/getUserRatings";
import { setRating } from "./tasks/setRating";

// used to add new items
// import { AddNewItemCard } from "./components/AddNewItemCard";
// import { addRatingItem } from "./tasks/addItem";

function App() {
  const [authActionType, setAuthActionType] = useState<"signup" | "signin">(
    "signin"
  );

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // for testing rating card
  const [ratingItem, setRatingItem] = useState<RatingItem | null>(null);
  const [demoRating, setDemoRating] = useState(0);

  // keep track of the index of the item in the list
  const [itemIndex, setItemIndex] = useState(0); 

  let entryKeys: string[] = [
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

  // Use code below to generate array of item IDs
  // 
  // setEntryKeys(foo);
  // getRatingItems(100).then(async (value) => {
  //   let keys = Object.keys(value);
  //   // console.log(keys)
  // });

  // const debugId = "TmrDzWYpbZAhhHy8TUSv";
  const debugId = String(entryKeys[itemIndex]);
  console.log(debugId);
  async function getDebugRatingItem() {
    if (auth.currentUser) {
      setRatingItem(await getRatingItem(debugId));
      try {
        const dbgRating = await getUserRating(auth.currentUser.uid, debugId);
        setDemoRating(dbgRating);
      } catch (err) {
        setDemoRating(0);
      }
    } else {
      alert("only logged in users can rate items!");
    }
  }

  return (
    <>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          <div>
            <Button variant="primary" onClick={openModal}>
              {auth.currentUser ? "Sign Out" : "Sign In"}
            </Button>

            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {authActionType === "signup" ? "Sign Up" : "Sign In"}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <AuthCard actionType={authActionType} noBorder={true} />
              </Modal.Body>

              <Modal.Footer>
                <Button
                  onClick={() => {
                    authActionType === "signup"
                      ? setAuthActionType("signin")
                      : setAuthActionType("signup");
                  }}
                >
                  Toggle Form Type
                </Button>
                <Button
                  onClick={logoutUser}
                  disabled={auth.currentUser ? false : true}
                >
                  Sign Out
                </Button>
                <Button
                  onClick={() =>
                    alert(
                      auth.currentUser?.email
                        ? auth.currentUser?.email
                        : "You're not logged in!"
                    )
                  }
                >
                  Who am I?
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Button onClick={getDebugRatingItem}>Get Debug Rating Item</Button>
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
                    setItemIndex(itemIndex + 1); // increase index first
                    getDebugRatingItem(); // call function to refresh item 
                    // alert("rating set!"); Commented out to speed up user experience
                    // console.log(itemIndex); used to debug
                  })
                  .catch((err) => alert(err))
              }
            />
          )}

          {/* <Button onClick={getDebugRatingItem}>Next</Button> */}
        </Tab>
        <Tab eventKey="leaderboard" title="Leaderboard"></Tab>

        {/* Tab used to upload new images
        <Tab eventKey="uploadItem" title="Upload">
          <AddNewItemCard OnFormSubmit={addRatingItem} />
        </Tab> */}
      </Tabs>
    </>
  );
}

export default App;
