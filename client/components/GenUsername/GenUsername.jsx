import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const descriptions = [
  "Kind",
  "Cool",
  "Bubbly",
  "Neat",
  "Brave",
  "Social",
  "Eager",
  "Giving",
  "Shy",
  "Friendly",
];

const favThings = [
  "Dogs",
  "Biking",
  "Bowling",
  "Reading",
  "Sports",
  "Skating",
  "Cats",
  "Movies",
  "Birds",
  "Running",
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const GenUsername = ({ values, setValues }) => {
  const [describe, setDescribe] = React.useState(
    descriptions[Math.floor(Math.random() * descriptions.length)]
  );
  const [like, setLike] = React.useState(
    favThings[Math.floor(Math.random() * favThings.length)]
  );
  const [lucky, setLucky] = React.useState(
    numbers[Math.floor(Math.random() * numbers.length)]
  );

  function genUser() {
    const randDescBeg = Math.floor(Math.random() * 2);
    const randLikeBeg = Math.floor(Math.random() * 2);
    const randDesc = Math.floor(Math.random() * (describe.length - 2)) + 2;
    const randLike = Math.floor(Math.random() * (like.length - 2)) + 2;

    return (
      describe.substring(randDescBeg, randDesc) +
      like.substring(randLikeBeg, randLike) +
      lucky +
      Math.floor(Math.random() * lucky)
    );
  }

  const [usernames, setUsernames] = React.useState(
    Array.from({ length: 9 }, () => genUser())
  );

  const numColumns = 3;
  const buttonWidth = 100;
  const buttonMargin = 16;

  return (
    <div>
      <h5 style={{ fontWeight: "bold" }}>Generate a username</h5>
      <Form>
        <FormGroup>
          <Label>Describe yourself in one word: </Label>
          <Input
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => {
              const { value } = event.target;

              setDescribe(value);
            }}
            type="select"
            style={{ height: 35 }}
          >
            {descriptions.map(word => (
              <option>{word}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label> One thing you like:</Label>
          <Input
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => {
              const { value } = event.target;

              setLike(value);
            }}
            type="select"
            style={{ height: 35 }}
          >
            {favThings.map(word => (
              <option>{word}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Your lucky number: </Label>
          <Input
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => {
              const { value } = event.target;

              setLucky(value);
            }}
            style={{ height: 35 }}
            type="select"
          >
            {numbers.map(word => (
              <option>{word}</option>
            ))}
          </Input>
        </FormGroup>
      </Form>
      <Button
        onClick={() => {
          setUsernames(Array.from({ length: 9 }, () => genUser()));
        }}
        style={{
          outlineColor: "lightgray",
          backgroundColor: "lightgray",
          height: 30,
          WebkitBorderRadius: 40,
          color: "black",
          paddingBottom: 28,
        }}
      >
        Generate!
      </Button>
      <br />
      <Label style={{ marginTop: 10 }}>Pick your username: </Label>
      <br />
      <div
        style={{
          width: buttonWidth * numColumns + buttonMargin * numColumns,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {usernames.map(name => (
          <Button
            onClick={() => {
              setValues({
                username: name,
              });
            }}
            style={{
              marginRight: buttonMargin,
              marginBottom: buttonMargin,
              width: buttonWidth,
              height: 40,
              maxWidth: 100,
              fontSize: 11,
              WebkitBorderRadius: 30,
              color: "gray",
              backgroundColor: "white",
            }}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GenUsername;
