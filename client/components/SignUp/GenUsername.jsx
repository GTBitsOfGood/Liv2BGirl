import React, { useEffect, useState } from "react";

// Styling
import global from "../components.global.scss";
import styles from "./signup.module.scss";

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

  useEffect(() => {
    if (username.length > 0) {
      setStageCompleted(true);
    }
  }, [username]);

  const [describe, setDescribe] = useState(
    descriptions[Math.floor(Math.random() * descriptions.length)]
  );
  const [like, setLike] = useState(
    favThings[Math.floor(Math.random() * favThings.length)]
  );
  const [lucky, setLucky] = useState(
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

  const [usernames, setUsernames] = useState(
    Array.from({ length: 9 }, () => genUser())
  );

  return (
    <div className={`${global.Page} ${styles.GenUsername}`}>
      <h1 className={styles.GenHeader}>Generate a username.</h1>
      <form>
        <div>
          <label className={styles.GenLabel} htmlFor="describe-user">
            <h3>Describe yourself in one word:</h3>
          </label>
          <select
            id="describe-user"
            className={styles.GenSelect}
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => setDescribe(event.target.value)}
          >
            {descriptions.map(word => (
              <option>{word}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.GenLabel} htmlFor="user-likes">
            <h3>One thing you like:</h3>
          </label>
          <select
            id="user-likes"
            className={styles.GenSelect}
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => setLike(event.target.value)}
          >
            {favThings.map(word => (
              <option>{word}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.GenLabel} htmlFor="lucky-number">
            <h3>Your lucky number:</h3>
          </label>
          <select
            id="lucky-number"
            className={styles.GenSelect}
            onClick={() => {
              setUsernames(Array.from({ length: 9 }, () => genUser()));
            }}
            onChange={event => setLucky(event.target.value)}
          >
            {numbers.map(word => (
              <option>{word}</option>
            ))}
          </select>
        </div>
      </form>
      <button
        type="button"
        onClick={() => setUsernames(Array.from({ length: 9 }, () => genUser()))}
        className={styles.GenBtn}
      >
        Generate!
      </button>
      <h2 className={styles.GenPick}>Pick your username:</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {usernames.map(name => (
          <button
            type="button"
            onClick={() => setValues({ username: name })}
            className={
              username === name
                ? `${global.SmallPill} ${global.ActivePill}`
                : `${global.SmallPill}`
            }
          >
            <h2>{name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenUsername;
