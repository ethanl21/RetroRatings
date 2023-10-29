import { useState } from "react";
import { auth as fAuth } from "./config/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signOut, signoutLoading, signoutError] = useSignOut(fAuth);

  const logoutUser = async () => {
    try {
      if (auth) {
        await signOut();
        if (signoutError) {
          alert(signoutError);
        } else {
          alert("You've been signed out.");
        }
      } else {
        alert("you're not signed in!");
      }
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
    if (auth) {
      setRatingItem(await getRatingItem(debugId));

      try {
        const dbgRating = await getUserRating(auth?.uid, debugId);
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
                  onClick={() => {
                    console.log();
                    if (auth?.providerData[0].providerId === "password") {
                      alert(auth.email);
                    } else {
                      alert(auth?.displayName);
                    }
                  }}
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

        <Tab eventKey="profile" title="Profile" disabled={!auth}>
          <ProfilePage />
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
