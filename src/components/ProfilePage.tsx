import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { auth as fAuth } from "../config/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import { BsArrowCounterclockwise, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import DOMPurify from "dompurify";
import { TierList } from "./TierList";
import { useEffect, useState } from "react";
import { UserRatings, getUserRatings } from "../tasks/getUserRatings";
import { getRatingItemImage } from "../tasks/getRatingItems";
import Button from "react-bootstrap/Button";

function getTierListItems(ids: Array<string>) {
  const promises: Array<Promise<{ id: string; url: string }>> = [];

  ids.forEach((id) => {
    promises.push(getRatingItemImage(id));
  });

  return Promise.all(promises);
}

interface ProfilePageProps {
  handleSignOut?: () => void;
}

export const ProfilePage = ({ ...props }: ProfilePageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, authLoading, authError] = useAuthState(fAuth);

  let avatarComponent = <></>;
  if (auth?.photoURL) {
    avatarComponent = <Image src={auth.photoURL} className="w-50" rounded />;
  } else if (auth) {
    avatarComponent = (
      <Image
        src={`https://ui-avatars.com/api/?name=${auth?.email
          ?.split(" ")
          .join("+")}`}
        className="w-50"
        rounded
      />
    );
  }

  const [displayName, setDisplayName] = useState("");
  const [ratings, setRatings] = useState<UserRatings | null>(null);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [tierListItems, setTierListItems] = useState<
    Array<{ url: string; rating: number }>
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signOut, signoutLoading, signoutError] = useSignOut(fAuth);

  const onSignOut = () => {
    if (props.handleSignOut) {
      signOut().then(() => {
        if (props.handleSignOut) {
          props.handleSignOut();
        }
      });
    }
  };

  // Used to manually update the tier list
  const updateUserRatings = () => {
    if (auth) {
      getUserRatings(auth.uid).then((val) => setRatings(val));
    }
  };

  useEffect(() => {
    if (auth) {
      getUserRatings(auth.uid).then((val) => setRatings(val));

      if (auth.displayName) {
        setDisplayName(auth.displayName);
      } else if (auth.email) {
        setDisplayName(auth.email);
      }
    }
  }, [auth]);

  useEffect(() => {
    if (ratings) {
      const newTierListItems: Array<{ url: string; rating: number }> = [];
      getTierListItems(Object.keys(ratings)).then((items) => {
        items.forEach((item) => {
          newTierListItems.push({ url: item.url, rating: ratings[item.id] });
        });

        setTierListItems(newTierListItems);
      });

      setRatingsCount(Object.keys(ratings).length);
    }
  }, [ratings]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={8}>
            {ratings && <TierList name={displayName} ratings={tierListItems} />}
          </Col>
          <Col>
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-center">
                  {avatarComponent}
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Stack direction="horizontal" gap={2}>
                    {DOMPurify.sanitize(displayName)}
                    {auth?.providerData[0].providerId === "github.com" && (
                      <BsGithub />
                    )}
                    {auth?.providerData[0].providerId === "google.com" && (
                      <Stack direction="horizontal" gap={1}>
                        ({auth?.email && DOMPurify.sanitize(auth.email)})
                        <FcGoogle />
                      </Stack>
                    )}
                  </Stack>
                </Card.Title>
                <Card.Text>
                  {ratingsCount} rating{ratingsCount !== 1 && "s"}
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="py-2 d-flex justify-content-center gap-2">
              <Button
                aria-label="refresh tier list"
                onClick={() => updateUserRatings()}
              >
                <BsArrowCounterclockwise />
              </Button>
              <Button variant="danger" onClick={() => onSignOut()}>
                Sign Out
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
