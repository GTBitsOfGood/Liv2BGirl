import React from "react";
import PropTypes from "prop-types";
import {
  descriptions,
  favThings,
  numbers,
  randomDescription,
  randomThing,
  randomNumber,
} from "./utils";
import { generateUsernames } from "../../../actions/User";
import styles from "../signup.module.scss";

const GenUsername = ({ values, setValues, handleNext }) => {
  const { username } = values;

  const [describe, setDescribe] = React.useState(randomDescription());
  const [like, setLike] = React.useState(randomThing());
  const [lucky, setLucky] = React.useState(randomNumber());
  const [usernames, setUsernames] = React.useState([]);

  const makeUsernames = () =>
    generateUsernames(null, describe, like, lucky, 9).then((newNames) =>
      setUsernames(newNames)
    );

  const goToNext = () => {
    if (username.length === 0) {
      window.alert("All fields must be answered before continuing!");
    } else {
      handleNext();
    }
  };

  React.useEffect(() => {
    makeUsernames();
  }, []);

  return (
    <>
      <div className={`Page ${styles.GenUsername}`}>
        <h1 className={styles.GenHeader}>Generate a username.</h1>
        <form>
          <div>
            <label className={styles.GenLabel} htmlFor="describe-user">
              <h3>Describe yourself in one word:</h3>
            </label>
            <select
              id="describe-user"
              className={styles.GenSelect}
              onChange={(event) => setDescribe(event.target.value)}
              value={describe}
            >
              {descriptions.map((word) => (
                <option key={word} value={word}>
                  {word}
                </option>
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
              onChange={(event) => setLike(event.target.value)}
              value={like}
            >
              {favThings.map((word) => (
                <option key={word} value={word}>
                  {word}
                </option>
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
              onChange={(event) => setLucky(event.target.value)}
              value={lucky}
            >
              {numbers.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </form>
        <button className={styles.GenBtn} type="button" onClick={makeUsernames}>
          Generate!
        </button>
        <h2 className={styles.GenPick}>Pick your username:</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {usernames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setValues({ username: name })}
              className={
                username === name ? "SmallPill ActivePill" : "SmallPill"
              }
            >
              <h2>{name}</h2>
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button type="button" className="NextButton" onClick={goToNext}>
          <h1>NEXT STEP</h1>
        </button>
      </div>
    </>
  );
};

GenUsername.propTypes = {
  values: PropTypes.shape({
    invCode: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    grade: PropTypes.number.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setValues: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default GenUsername;
