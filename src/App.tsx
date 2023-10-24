import { useState } from "react";
import { signOut } from "firebase/auth";
import { AuthCard } from "./components/AuthCard";
import { auth } from "./config/firebase";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

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
    <>
      <AuthCard actionType={authActionType} />

      {/* debug stuff. this is not part of the Auth component */}
      <Stack gap={3} direction="horizontal" className="mt-5">
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
      </Stack>
    </>
  );
}

export default App;
