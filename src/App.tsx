import { useState } from "react";
import { signOut } from "firebase/auth";
import { AuthCard } from "./components/AuthCard";
import { auth } from "./config/firebase";
import { AddNewItemCard } from "./components/AddNewItemCard";
import { addRatingItem } from "./tasks/addItem";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";

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

  return (
    <Container className="py-2">
      <h1>Sign Up/Sign In Card</h1>
      <Stack direction="horizontal" className="justify-content-center">
        <Stack className="align-items-center">
          <AuthCard actionType={authActionType} />

          {/* debug stuff. this is not part of the Auth component */}
          <Stack gap={1} className="w-25 mx-auto mt-3">
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
                alert(
                  auth.currentUser?.email
                    ? auth.currentUser?.email
                    : "You're not logged in!"
                );
              }}
            >
              Who am I?
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <hr />
      <h1>Add New Item Card</h1>
      <Stack direction="horizontal" className="justify-content-center">
        <AddNewItemCard OnFormSubmit={addRatingItem} />
      </Stack>
    </Container>
  );
}

export default App;
