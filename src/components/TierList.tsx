import { BsStarFill } from "react-icons/bs";
import Table from "react-bootstrap/Table";
import DOMPurify from "dompurify";
import Image from "react-bootstrap/Image";
import { Stack } from "react-bootstrap";
import { nanoid } from "nanoid";
import "./tierlist.css";

const getTierImages = (
  ratings: Array<{ url: string; rating: number }>,
  tier: number,
) => {
  return ratings
    .filter((rating) => Math.round(rating.rating) === tier)
    .map((rating) => (
      <Image src={rating.url} key={nanoid()} thumbnail width="100" />
    ));
};

interface TierListProps {
  name: string;
  ratings: Array<{ url: string; rating: number }>;
}
export const TierList = ({ ...props }: TierListProps) => {
  // Generate name to display + sanitize
  let nameDisplay = "";
  nameDisplay = props.name;
  if (nameDisplay.indexOf("@") >= 0) {
    nameDisplay = nameDisplay.split("@")[0];
  }
  nameDisplay = DOMPurify.sanitize(nameDisplay);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td colSpan={2}>
              <h2>{nameDisplay}'s ratings</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              5 <BsStarFill />
            </td>
            <td>
              <Stack direction="horizontal" gap={1}>
                {getTierImages(props.ratings, 5)}
              </Stack>
            </td>
          </tr>
          <tr>
            <td>
              4 <BsStarFill />
            </td>
            <td>
              <Stack direction="horizontal" gap={1}>
                {getTierImages(props.ratings, 4)}
              </Stack>
            </td>
          </tr>
          <tr>
            <td>
              3 <BsStarFill />
            </td>
            <td>
              <Stack direction="horizontal" gap={1}>
                {getTierImages(props.ratings, 3)}
              </Stack>
            </td>
          </tr>
          <tr>
            <td>
              2 <BsStarFill />
            </td>
            <td>
              <Stack direction="horizontal" gap={1}>
                {getTierImages(props.ratings, 2)}
              </Stack>
            </td>
          </tr>
          <tr>
            <td>
              1 <BsStarFill />
            </td>
            <td>
              <Stack direction="horizontal" gap={1}>
                {getTierImages(props.ratings, 1)}
              </Stack>
            </td>
          </tr>
          <tr>
            <td>
              0 <BsStarFill />
            </td>
            <td>
              <Stack direction="horizontal" gap={1}>
                {getTierImages(props.ratings, 0)}
              </Stack>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
