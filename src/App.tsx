import { useState } from "react";
import { signOut } from "firebase/auth";
import { AuthCard } from "./components/AuthCard";
import { auth } from "./config/firebase";

import Button from "react-bootstrap/Button";
// import Stack from "react-bootstrap/Stack"; // Not used

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Modal from "react-bootstrap/Modal";

function App() {
  const [authActionType, setAuthActionType] = useState<"signup" | "signin">(
    "signup"
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

  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          <>
            <Button variant="primary" onClick={openModal}>
              Sign In
            </Button>

            <Modal show={showModal} onHide={closeModal}>
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Login Modal</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <AuthCard actionType={authActionType} />
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
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>

                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
          </>
        </Tab>
        <Tab eventKey="leaderboard" title="Leaderboard"></Tab>
      </Tabs>
    </>
  );
}

export default App;
