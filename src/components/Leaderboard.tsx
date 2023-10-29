import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {
  RatingItem,
  getHighestRatedItems,
  getLowestRatedItems,
} from "../tasks/getRatingItems";
import { auth as fAuth } from "../config/firebase";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { FirebaseImage } from "./FirebaseImage";
import Container from "react-bootstrap/Container";

const getTableBody = (items: Array<RatingItem>) => {
  return items.map((val, idx) => {
    return (
      <tr key={nanoid()}>
        <td>{idx + 1}</td>
        <td>{val.name}</td>
        <td>
          <FirebaseImage src={val.image} thumbnail width="100" />
        </td>
        <td>{val.averageRating} ★</td>
      </tr>
    );
  });
};

export const Leaderboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, authLoading, authError] = useAuthState(fAuth);
  const [leaderboardItems, setLeaderboardItems] = useState<Array<RatingItem>>(
    [],
  );
  const [leaderboardSort, setLeaderboardSort] = useState("desc");

  useEffect(() => {
    if (auth) {
      if (leaderboardSort === "desc") {
        getHighestRatedItems(10).then((items) => {
          setLeaderboardItems(items);
        });
      } else {
        getLowestRatedItems(10).then((items) => {
          setLeaderboardItems(items);
        });
      }
    }
  }, [auth, leaderboardSort]);

  return (
    <>
      <h1>
        {leaderboardSort === "desc" ? "Highest" : "Lowest"} Rated Items&nbsp;
        <Button
          onClick={() => {
            leaderboardSort === "desc"
              ? setLeaderboardSort("asc")
              : setLeaderboardSort("desc");
          }}
        >
          {leaderboardSort === "desc" ? (
            <BsFillHandThumbsUpFill />
          ) : (
            <BsFillHandThumbsDownFill />
          )}
        </Button>
      </h1>
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Image</td>
              <td>Average Rating</td>
            </tr>
          </thead>
          <tbody>{leaderboardItems && getTableBody(leaderboardItems)}</tbody>
        </Table>
      </Container>
    </>
  );
};
