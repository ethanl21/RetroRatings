import { useState } from "react";
import { auth as fAuth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { ProfilePage } from "./components/ProfilePage";
import { Leaderboard } from "./components/Leaderboard";
import { HomePage } from "./components/HomePage";
import { AuthCard } from "./components/AuthCard";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, authLoading, authError] = useAuthState(fAuth);
  const [authActionType, setAuthActionType] = useState<"signup" | "signin">(
    "signup"
  );

  const [activeTabKey, setActiveTabKey] = useState("home");
  const handleSignOut = () => {
    setActiveTabKey("home");
  };

  return (
    <>
      <Tabs
        activeKey={activeTabKey}
        onSelect={(k) => setActiveTabKey(k ? k : "home")}
        className="pt-3 bg-secondary-subtle"
      >
        <Tab eventKey="home" title="Home" className="p-5">
          {auth ? (
            <HomePage />
          ) : (
            <Container className="w-50 py-5" hidden={authLoading}>
              <Row>
                <Col>
                  <h1>Welcome to RetroRatings!</h1>
                  <p>Sign up or Log in to continue.</p>
                </Col>
                <Col>
                  <AuthCard
                    noBorder={false}
                    actionType={authActionType}
                    setActionType={setAuthActionType}
                  />
                </Col>
              </Row>
            </Container>
          )}
        </Tab>

        <Tab eventKey="profile" title="Profile" disabled={!auth} className="p-5">
          <ProfilePage handleSignOut={handleSignOut} />
        </Tab>

        <Tab eventKey="leaderboard" title="Leaderboard" disabled={!auth} className="p-5">
          <Leaderboard />
        </Tab>

        {/* Tab used to upload new images
        <Tab eventKey="uploadItem" title="Upload">
          <AddNewItemCard OnFormSubmit={addRatingItem} />
        </Tab> */}
      </Tabs>
    </>
  );
}

export default App;
