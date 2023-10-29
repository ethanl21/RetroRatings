import { useState } from "react";
import { auth as fAuth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";

import { RatingItem, getRatingItem } from "./tasks/getRatingItems";
import { getUserRating } from "./tasks/getUserRatings";
import { setRating } from "./tasks/setRating";

import { AuthCard } from "./components/AuthCard";
import { RatingPickerCard } from "./components/RatingPickerCard";
import { ProfilePage } from "./components/ProfilePage";

function App() {
  const [authActionType, setAuthActionType] = useState<"signup" | "signin">(
    "signin"
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, authLoading, authError] = useAuthState(fAuth);

  const [showModal, setShowModal] = useState(false);

  const [activeTabKey, setActiveTabKey] = useState("home");
  const handleSignOut = () => {
    setActiveTabKey("home");
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // for testing rating card
  const [ratingItem, setRatingItem] = useState<RatingItem | null>(null);
  const [demoRating, setDemoRating] = useState(0);

  // keep track of the index of the item in the list
  const [itemIndex, setItemIndex] = useState(0);

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

  // Use code below to generate array of item IDs
  //
  // setEntryKeys(foo);
  // getRatingItems(100).then(async (value) => {
  //   let keys = Object.keys(value);
  //   // console.log(keys)
  // });

  // const debugId = "TmrDzWYpbZAhhHy8TUSv";

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

  return (
    <>
      <Tabs
        activeKey={activeTabKey}
        onSelect={(k) => setActiveTabKey(k ? k : "home")}
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          <div>
            <Button
              variant="primary"
              onClick={() => {
                if (auth) {
                  alert(
                    'You\'re already logged in!\n(Sign out in the "Profile" tab)'
                  );
                } else {
                  openModal();
                }
              }}
            >
              Sign In
            </Button>

            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {authActionType === "signup" ? "Sign Up" : "Sign In"}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <AuthCard
                  actionType={authActionType}
                  noBorder={true}
                  setActionType={(newAct) => setAuthActionType(newAct)}
                  onAuthenticated={closeModal}
                />
              </Modal.Body>
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
                    // alert("rating set!"); // Commented out to speed up user experience
                    setItemIndex(itemIndex + 1); // increase index first
                    // console.log(itemIndex); // used to debug
                    getDebugRatingItem(); // call function to refresh item
                  })
                  .catch((err) => alert(err))
              }
            />
          )}

          <Button onClick={getDebugRatingItem}>Next</Button>
        </Tab>

        <Tab eventKey="profile" title="Profile" disabled={!auth}>
          <ProfilePage handleSignOut={handleSignOut} />
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
