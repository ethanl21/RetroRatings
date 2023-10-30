import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { useForm, SubmitHandler } from "react-hook-form";
import DOMPurify from "dompurify";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

/**
 * Type of the object that is created when the form is submitted
 */
type AddNewItemFormInput = {
  itemName: string;
  description: string;
  image: FileList;
};

/**
 * Type of the callback function that will be called with the form's data on submit
 */
type OnFormSubmitHandlerType = (
  item: string,
  description: string,
  image: File,
) => Promise<void | FirebaseError>;

/**
 * Prop type for the AddNewItemCard component
 */
interface AddNewItemCardProps {
  OnFormSubmit?: OnFormSubmitHandlerType;
}

/**
 * @brief Component used to add new items to rate to the database
 * @param props submit handler used to add items to the database
 */
export const AddNewItemCard = (props: AddNewItemCardProps) => {
  // Hook used to handle form submit
  const {
    register,
    handleSubmit,
    //reset,
    //watch,
    //formState: { errors },
  } = useForm<AddNewItemFormInput>();

  // Function called when the form is submitted
  const onAddNewItemFormSubmit: SubmitHandler<AddNewItemFormInput> = async (
    data,
  ) => {
    // call the callback handler from props if it exists
    if (props.OnFormSubmit) {
      props
        .OnFormSubmit(
          DOMPurify.sanitize(data.itemName),
          DOMPurify.sanitize(data.description),
          data.image[0],
        )
        .then(() => {
          setModalHeader("Success");
          setModalText("Item added successfully!");
          setShowModal(true);
        })
        .catch((err) => {
          setModalHeader("Error");
          switch (err.code) {
            case "permission-denied":
              setModalText("Error: Only logged in users can add items!");
              break;
            default:
              setModalText(JSON.stringify(err));
              break;
          }

          setShowModal(true);
        });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Card>
        <Card.Body>
          <Card.Title>Add New Item</Card.Title>
          <hr />
          <Form
            onSubmit={handleSubmit(onAddNewItemFormSubmit)}
            className="mb-2"
          >
            <Form.Group controlId="name-input-group" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                placeholder="Item name"
                {...register("itemName", {})}
              />
            </Form.Group>

            <Form.Group controlId="desc-input-group" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                {...register("description", {})}
              />
            </Form.Group>

            <Form.Group controlId="image-upload-group" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                required
                type="file"
                accept="image/*"
                {...register("image")}
              ></Form.Control>
            </Form.Group>

            <Stack
              direction="horizontal"
              gap={3}
              className="justify-content-end"
            >
              <Button variant="danger" type="reset">
                Reset
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
