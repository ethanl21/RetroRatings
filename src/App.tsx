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
import { RatingItem, getRatingItem } from "./tasks/getRatingItems";
import { getUserRating } from "./tasks/getUserRatings";
import { setRating } from "./tasks/setRating";

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

  const debugId = "TmrDzWYpbZAhhHy8TUSv";
  const getDebugRatingItem = async () => {
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
  };

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
              Sign In
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
                <Button onClick={logoutUser}>Sign Out</Button>
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
        </Tab>
        <Tab eventKey="leaderboard" title="Leaderboard">
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
                  .then(() => alert("rating set!"))
                  .catch((err) => alert(err))
              }
            />
          )}
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
