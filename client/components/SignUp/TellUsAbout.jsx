import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { signUp } from "../../actions/User";
import { avatarImg, colorArr } from "../../../utils/avatars";
import styles from "./signup.module.scss";

const topics = [
  "Music",
  "Movies",
  "Art",
  "Books",
  "Career",
  "Sports",
  "Science",
];
const ages = [13, 14, 15, 16, 17, 18];
const grades = [7, 8, 9, 10, 11, 12];

const TellUsAbout = ({ values, setValues, handleNext }) => {
  const { username, age, grade, interests, avatar, avatarColor } = values;

  const goToNext = async () => {
    if (age === 0 || grade === 0 || interests.length === 0) {
      window.alert("All fields must be answered before continuing!");
    } else {
      await signUp(null, values)
        .then(() => handleNext())
        .catch(() => {
          window.alert("Failed to create account!");

          return Router.reload();
        });
    }
  };

  const renderedTopics = topics.map(topic => (
    <button
      type="button"
      className={
        interests.includes(topic) ? "SmallPill ActivePill" : "SmallPill"
      }
      onClick={() => {
        const newTopics = [...interests];
        const index = newTopics.indexOf(topic);

        if (index < 0) {
          newTopics.push(topic);
        } else {
          newTopics.splice(index, 1);
        }

        setValues({
          interests: newTopics,
        });
      }}
    >
      <h2>{topic}</h2>
    </button>
  ));

  return (
    <>
      <div className={`Page ${styles.AboutPg}`}>
        <h1 className={styles.AboutHead}>Tell us more about you.</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              backgroundColor: colorArr[avatarColor],
            }}
            className={`${styles.AboutAvatar} ${styles.AvatarLogo}`}
          >
            <img
              src={avatarImg[avatar]}
              alt="CreateAvatar"
              className={styles.AvatarImg}
            />
          </div>
          <h2 className={styles.AboutUsername}>{username}</h2>
        </div>
        <form>
          <div style={{ display: "flex" }}>
            <label className={styles.AboutLabel} htmlFor="age">
              <h2>Age:</h2>
            </label>
            <select
              id="age"
              className={styles.AboutSelect}
              onChange={event => setValues({ age: event.target.value })}
            >
              {ages.map(item => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex" }}>
            <label className={styles.AboutLabel} htmlFor="grade">
              <h2>School Year:</h2>
            </label>
            <select
              id="grade"
              className={styles.AboutSelect}
              onChange={event => setValues({ grade: event.target.value })}
            >
              {grades.map(item => (
                <option value={item}>{`${item}th`}</option>
              ))}
            </select>
          </div>

          <h2 className={styles.AboutLabel}>Topics you are interested in:</h2>
          <div className={styles.AboutTopics}>{renderedTopics}</div>
        </form>
      </div>
      <div style={{ display: "flex" }}>
        <button type="button" className="NextButton" onClick={goToNext}>
          <h1>CREATE PROFILE</h1>
        </button>
      </div>
    </>
  );
};

TellUsAbout.propTypes = {
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

export default TellUsAbout;
