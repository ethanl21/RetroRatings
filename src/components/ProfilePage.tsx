import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { auth as fAuth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import DOMPurify from "dompurify";


export const ProfilePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, authLoading, authError] = useAuthState(fAuth);

  let avatarComponent = <></>;
  if (auth?.photoURL) {
    avatarComponent = <Image src={auth.photoURL} className="w-50" rounded />;
  } else if (auth) {
    avatarComponent = <Image src={`https://ui-avatars.com/api/?name=${auth.email?.split(" ").join("+")}`} className="w-50" rounded />;
  }

  return (
    <>
      <h1>Profile Page</h1>
      <Container>
        <Row>
          <Col xs={8}>
            <h2>col 0</h2>
          </Col>
          <Col>
            <h2>col 1</h2>
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-center">
                  {avatarComponent}
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Stack direction="horizontal" gap={2}>
                    {auth && auth?.displayName ? DOMPurify.sanitize(auth.displayName) : DOMPurify.sanitize(auth!.email!)}
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
                <Card.Text>xyz ratings</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
