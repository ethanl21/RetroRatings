/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, useEffect, useState } from "react";
import { auth as fAuth } from "../config/firebase";
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
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

type BasicEmailFormInput = {
  email: string;
  password: string;
};

interface AuthProps extends PropsWithChildren {
  actionType: "signup" | "signin";
  setActionType?: (newActionType: "signup" | "signin") => void;
  onAuthenticated?: () => void;
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
    data,
  ) => {
    if (props.actionType === "signup") {
      await createUserWithEmailAndPassword(data.email, data.password);

      if (createEmailError) {
        switch (createEmailError.code) {
          case "auth/email-already-in-use":
            alert("There is already an account with that email address.");
            break;
          default:
            alert(createEmailError);
            break;
        }
      }
    } else if (props.actionType === "signin") {
      await signInWithEmailAndPassword(data.email, data.password);

      if (signInEmailError) {
        switch (signInEmailError.code) {
          case "auth/invalid-login-credentials":
            alert("Incorrect email or password.");
            break;
          default:
            alert(JSON.stringify(createEmailError));
            break;
        }
      }
    }

    if (!createEmailError && !signInEmailError) {
      reset();
    }
  };

  const [
    createUserWithEmailAndPassword,
    createEmailUser,
    createEmailLoading,
    createEmailError,
  ] = useCreateUserWithEmailAndPassword(fAuth);
  const [
    signInWithEmailAndPassword,
    signInEmailUser,
    signInEmailLoading,
    signInEmailError,
  ] = useSignInWithEmailAndPassword(fAuth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(fAuth);
  const [signInWithGitHub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(fAuth);

  const [authState, authStateLoading, authStateError] = useAuthState(fAuth);

  const [showPassword, setShowPassword] = useState(false);

  const handleSetActionType = (newActionType: "signup" | "signin") => {
    if (props.setActionType) {
      props.setActionType(newActionType);
    }
  };

  const cb = props.onAuthenticated;
  useEffect(() => {
    if (authState && cb) {
      cb();
    }
  }, [authState, cb]);

  return (
    <>
      <Card className={props.noBorder ? "border-0" : ""}>
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
                  required
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
                  required
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
              onClick={() => signInWithGoogle().then().catch()}
              style={{ background: "white", color: "#757575" }}
            >
              <FcGoogle />
            </Button>
            <Button
              className="flex-grow-1"
              onClick={() => signInWithGitHub().then().catch()}
              style={{ background: "#333333" }}
            >
              <BsGithub />
            </Button>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-center align-items-baseline">
            {props.actionType === "signup" ? (
              <>
                <p>Already have an account?&nbsp;</p>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => {
                    handleSetActionType("signin");
                  }}
                >
                  Sign in here
                </Button>
              </>
            ) : (
              <>
                <p>Don't have an account?&nbsp;</p>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => {
                    handleSetActionType("signup");
                  }}
                >
                  Sign up now
                </Button>
              </>
            )}
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};
