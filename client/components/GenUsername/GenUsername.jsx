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

const GenUsername = ({ values, setValues, setStageCompleted }) => {
  const { username } = values;

  React.useEffect(() => {
    if (username.length > 0) {
      setStageCompleted(true);
    }
  }, [username]);

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

  return (
    <div className="gen-username page">
      <h1 className="gen-header">Generate a username</h1>
      <Form>
        <FormGroup>
          <Label className="gen-label">Describe yourself in one word: </Label>
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
          <Label className="gen-label"> One thing you like:</Label>
          <Input
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => {
              const { value } = event.target;

              setLike(value);
            }}
            type="select"
          >
            {favThings.map(word => (
              <option>{word}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label className="gen-label">Your lucky number: </Label>
          <Input
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => {
              const { value } = event.target;

              setLucky(value);
            }}
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
        className="gen-btn"
      >
        Generate!
      </Button>
      <p className="gen-pick">Pick your username: </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {usernames.map(name => (
          <Button
            active={username === name}
            onClick={() => {
              setValues({
                username: name,
              });
            }}
            className="username-btn"
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GenUsername;
