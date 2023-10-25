import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Stack from "react-bootstrap/Stack";
import DOMPurify from "dompurify";

// Type of the object created when submitting the form
type AddNewItemFormInput = {
  itemName: string;
  description: string;
  image: FileList;
};

type OnFormSubmitHandlerType = (
  item: string,
  description: string,
  image: string
) => undefined;
interface AddNewItemCardProps {
  OnFormSubmit?: OnFormSubmitHandlerType;
}

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
    data
  ) => {
    console.log(data);

    // call the callback handler from props if it exists
    // todo: idk what type the image is supposed to be
    if (props.OnFormSubmit) {
      props.OnFormSubmit(
        DOMPurify.sanitize(data.itemName),
        DOMPurify.sanitize(data.description),
        await data.image[0].text()
      );
    }
  };

  return (
    <Card className="w-50">
      <Card.Body>
        <Card.Title>Add New Item</Card.Title>
        <hr />
        <Form onSubmit={handleSubmit(onAddNewItemFormSubmit)} className="mb-2">
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
              rows={5}
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

          <Stack direction="horizontal" gap={3} className="justify-content-end">
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
  );
};
