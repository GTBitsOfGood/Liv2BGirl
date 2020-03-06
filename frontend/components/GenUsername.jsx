import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const GenUsername = props => {
  const { userid } = props;
  const [describe, setDescribe] = React.useState("");
  const [like, setLike] = React.useState("");
  const [lucky, setLucky] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [generate, setGenerate] = React.useState(false);

  function genUser() {
    let randDescBeg = Math.floor(Math.random() * 2);
    let randLikeBeg = Math.floor(Math.random() * 2);
    let randDesc = Math.floor(Math.random() * (describe.length - 2)) + 2;
    let randLike = Math.floor(Math.random() * (like.length - 2)) + 2;
    let username =
      describe.substring(randDescBeg, randDesc) +
      like.substring(randLikeBeg, randLike) +
      lucky +
      Math.floor(Math.random() * lucky);
    return username;
  }

  const descriptions = [
    "",
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
    "",
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
  const numbers = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const usernames = [
    [genUser(), genUser(), genUser()],
    [genUser(), genUser(), genUser()],
    [genUser(), genUser(), genUser()],
  ];

  return (
    <div>
      <h5 style={{ fontWeight: "bold" }}>Generate a username</h5>
      <Form>
        <FormGroup>
          <Label>Describe yourself in one word: </Label>
          <Input
            onClick={() => {
              setGenerate(false);
            }}
            onChange={event => {
              setDescribe(event.target.value);
            }}
            type="select"
            style={{ height: 35 }}
          >
            {descriptions.map((word, i) => {
              return <option> {word} </option>;
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label> One thing you like:</Label>
          <Input
            onClick={() => {
              setGenerate(false);
            }}
            onChange={event => {
              setLike(event.target.value);
            }}
            type="select"
            style={{ height: 35 }}
          >
            {favThings.map((word, i) => {
              return <option> {word} </option>;
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Your lucky number: </Label>
          <Input
            onClick={() => {
              setGenerate(false);
            }}
            onChange={event => {
              setLucky(event.target.value);
            }}
            style={{ height: 35 }}
            type="select"
          >
            {numbers.map((word, i) => {
              return <option> {word} </option>;
            })}
          </Input>
        </FormGroup>
      </Form>
      <Button
        onClick={() => {
          setGenerate(true);
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
      <br></br>
      <Label style={{ marginTop: 10 }}>Pick your username: </Label>
      <br></br>
      {generate &&
        describe != "" &&
        like != "" &&
        lucky != "" &&
        usernames.map((name, i) => {
          return (
            <div style={{ alignItems: "center" }}>
              <Button
                onClick={e => {
                  setUsername(name[0]);
                }}
                style={{
                  marginRight: 25,
                  marginBottom: 20,
                  height: 40,
                  width: 100,
                  fontSize: 11,
                  WebkitBorderRadius: 30,
                  color: "gray",
                  backgroundColor: "white",
                }}
              >
                {name[0]}
              </Button>

              <Button
                onClick={e => {
                  setUsername(name[1]);
                }}
                style={{
                  marginRight: 25,
                  marginBottom: 20,
                  height: 40,
                  width: 100,
                  fontSize: 11,
                  WebkitBorderRadius: 30,
                  color: "gray",
                  backgroundColor: "white",
                }}
              >
                {name[1]}
              </Button>

              <Button
                onClick={e => {
                  setUsername(name[2]);
                }}
                style={{
                  marginBottom: 20,
                  height: 40,
                  width: 100,
                  fontSize: 11,
                  WebkitBorderRadius: 30,
                  color: "gray",
                  backgroundColor: "white",
                }}
              >
                {name[2]}
              </Button>
              <br></br>
            </div>
          );
        })}
      <br></br>
      <Button
        style={{
          outlineColor: "lightgray",
          backgroundColor: "lightgray",
          marginLeft: 130,
          height: 30,
          WebkitBorderRadius: 40,
          color: "black",
          paddingBottom: 28,
        }}
      >
        Next Step
      </Button>
    </div>
  );
};

export default GenUsername;
