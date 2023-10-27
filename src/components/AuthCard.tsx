import { PropsWithChildren, useState } from "react";
import { auth, googleProvider, githubProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //fetchSignInMethodsForEmail, // todo: validate email does not exist
  signInWithPopup,
} from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import {
  BsGithub,
  BsEyeFill,
  BsEyeSlashFill,
  BsPersonFill,
  BsLockFill,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FirebaseError } from "firebase/app";

type BasicEmailFormInput = {
  email: string;
  password: string;
};

interface AuthProps extends PropsWithChildren {
  actionType: "signup" | "signin";
  noBorder: boolean;
}
export const AuthCard = ({ ...props }: AuthProps) => {
  const {
    register,
    handleSubmit,
    reset,
    //watch,
    //formState: { errors },
  } = useForm<BasicEmailFormInput>();
  const onBasicLoginFormSubmit: SubmitHandler<BasicEmailFormInput> = async (
    data
  ) => {
    try {
      if (props.actionType === "signup") {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      } else if (props.actionType === "signin") {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }

      reset();
    } catch (err) {
      console.error(err);

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            alert("There is already an account with that email address.");
            break;
          case "auth/invalid-login-credentials":
            alert("Incorrect email or password.");
            break;
        }
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Card className={props.noBorder? "border-0" : ""}>
        <Card.Body>
          <span hidden={props.noBorder}>
            <Card.Title>
              Sign {props.actionType === "signup" ? "Up" : "In"}
            </Card.Title>
            <hr />
          </span>
          <Form
            onSubmit={handleSubmit(onBasicLoginFormSubmit)}
            className="mb-2"
          >
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsPersonFill />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsLockFill />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password")}
                />

                <ToggleButton
                  variant="secondary"
                  type="checkbox"
                  checked={showPassword}
                  id="showPasswordToggle"
                  value={1}
                  onChange={(e) => setShowPassword(e.currentTarget.checked)}
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </ToggleButton>
              </InputGroup>
            </Form.Group>
            <Stack
              direction="horizontal"
              gap={3}
              className="d-flex justify-content-end"
            >
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
          <div className="row">
            <div className="col">
              <hr />
            </div>
            <div className="col-auto">or</div>
            <div className="col">
              <hr />
            </div>
          </div>
          <Stack
            gap={3}
            direction="horizontal"
            className="d-flex justify-content-center my-3"
          >
            <Button
              className="flex-grow-1"
              variant="outline-secondary"
              onClick={signInWithGoogle}
              style={{ background: "white", color: "#757575" }}
            >
              <FcGoogle />
            </Button>
            <Button
              className="flex-grow-1"
              onClick={signInWithGitHub}
              style={{ background: "#333333" }}
            >
              <BsGithub />
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
};
