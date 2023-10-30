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

  // for testing rating card
  const [ratingItem, setRatingItem] = useState<RatingItem | null>(null);
  const [demoRating, setDemoRating] = useState(0);

  // keep track of the index of the item in the list
  /* eslint-disable */
  var [itemIndex, setItemIndex] = useState(0);

  type Arr = {
    arr : String []
  }
  var [entryKeys, setEntryKeys] = useState<Array<string>>([]);

  const numOfItems = 100; // Using 100 because it is more than what is in the database

  getRatingItems(numOfItems).then(async (values) => {
    var keys = Object.keys(values);
    // console.log(keys);
    setEntryKeys(keys);
  });
  
  // var num = 4;
  // console.log('itemsarr' , itemsArr);
  // console.log(itemsArr[num]);







  // const entryKeys2: string[] = [
  //   "0D3eg9jXmfeYiRDcErGc",
  //   "1Tx6zUj30nEHw7ex9O1J",
  //   "3wSJ3DSuxgEZI0VZU7vl",
  //   "5mgMUl5VT2NGuyfdVxvk",
  //   "5w1AEY0ilAp9Ydj5VGhe",
  //   "6AHGRYv6hhvOtwVR9q04",
  //   "7WcA9BONg8vutdUqz60F",
  //   "7dTHc67CdRFvNo6oQYsQ",
  //   "9elmGOTZF8JnSPbwCftf",
  //   "CgV0e0m02JZrkQBiqUtg",
  //   "DhulNIfPWm5OMxybtuyM",
  //   "ElhOmtK65ysQg1CWHpVV",
  //   "FTca9V4x65aUykAc4nMN",
  //   "G6XBWNrdZVewOhshWpiI",
  //   "HH2f0nRl5OMixiQl0Au7",
  //   "IVvGBufKhbqy1Pv17lkC",
  //   "IwjeMzPkMpmUXh0CLtJ2",
  //   "JgIKUjxnOvwaNWoe00N3",
  //   "Jp0sh6bLeDOZcmq9TogY",
  //   "LQlyH4oRQkjsk7NC7o60",
  //   "LZdvILmU5eleg2bMpike",
  //   "O4mSJod2fReYYR74aRcz",
  //   "OTdCwLjYyxww7sb0IT4p",
  //   "QkmziSH5r7nxdXIXJwmn",
  //   "Qn5E9W9QGJf5yaQdRNJI",
  //   "RiJ3ns4aVBd9iOoFYAD4",
  //   "RqkgrvG8W19waBZVbhTn",
  //   "S3YZ7rwN3ojgvlDIC3cA",
  //   "TNCIUuM5FUcJulwaBy40",
  //   "TmrDzWYpbZAhhHy8TUSv",
  //   "U9YprtPSUxQJjaTeTEfY",
  //   "UfwqPYzabewIkn11UCbg",
  //   "WJFCPWHnQyZd64NLWy3L",
  //   "WnPJPO2BBIzwxrFT9VFO",
  //   "YvtGqqP4uPyWfFT8QOwc",
  //   "b496Gg1YDIiXvnpd7MVN",
  //   "c87Zmp3FlynpyovGC3rj",
  //   "dxSYC8CMFoOfOKAog05w",
  //   "e889oM1INGtObJ4dsnMX",
  //   "gMrgJ4eyix8njaGMfTRK",
  //   "kPBbBGRbAX01RA00kQFV",
  //   "lobHx59BmXNc6yWECe0n",
  //   "lp0swYJJ56MQwlIx7ECQ",
  //   "o6QhF2UwFjgU2GhqiiY5",
  //   "oFgwl6RHbzQmKTGQX7A1",
  //   "odHMm6QX7RZGtB15v3nf",
  //   "rFEKyzri6qTyd4x18JXI",
  //   "tTeeSNSwpqYt57eXJ6Zy",
  //   "uTUqeJ9x7ML83W1IRn7D",
  //   "y6ZweKiHRJcEDtvt3nOF",
  //   "yVctvRktoHqZE999PNM6",
  //   "zqvYef8ftmU7Pbyc6Lee",
  // ];
  // console.log('entry keys',entryKeys)

  // Use code below to generate array of item IDs
  //
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
