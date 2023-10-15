import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import {
  BsGoogle,
  BsGithub,
  BsEyeFill,
  BsEyeSlashFill,
  BsPersonFill,
  BsLockFill,
} from "react-icons/bs";

type BasicEmailFormInput = {
  email: string;
  password: string;
};
export const Auth = () => {
  const {
    register,
    handleSubmit,
    //watch,
    //formState: { errors },
  } = useForm<BasicEmailFormInput>();
  const onBasicLoginFormSubmit: SubmitHandler<BasicEmailFormInput> = async (
    data
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      console.error(err);
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

  const logoutUser = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Card className="w-25">
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <hr />
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

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
          <hr />
          <Stack gap={1}>
            <Button onClick={signInWithGoogle}>
              <BsGoogle /> Sign In With Google
            </Button>
            <Button onClick={signInWithGitHub}>
              <BsGithub /> Sign In With GitHub
            </Button>
          </Stack>
        </Card.Body>
      </Card>

      <div className="mt-5">
        <p>(for testing auth)</p>
        <Button onClick={logoutUser}>Sign Out</Button>
      </div>
    </>
  );
};
