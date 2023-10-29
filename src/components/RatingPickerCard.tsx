import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { FirebaseError } from "firebase/app";


interface RatingPickerCardProps {
  id: string;
  name: string;
  description: string;
  img_src: string;
  rating: number;
  OnRatingChanged: (
    id: string,
    rating: number
  ) => Promise<void | FirebaseError>;
}

export const RatingPickerCard = ({ ...props }: RatingPickerCardProps) => {
  const handleRating = async (id: string, rating: number) => {
    await props.OnRatingChanged(id, rating);
  };

  const [rating, setRating] = useState(0);

  return (
    <>
      <Card style={{ width: "25rem" }}>
        {props.img_src ? (
          <Card.Img variant="top" src={props.img_src} />
        ) : (
          <Spinner />
        )}
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <div className="d-flex justify-content-center">
            <Rating
              initialValue={props.rating}
              onClick={(val: number) => setRating(val)}
              allowFraction
            />
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={() => {
                handleRating(props.id, rating);
              }}
            >
              Submit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
