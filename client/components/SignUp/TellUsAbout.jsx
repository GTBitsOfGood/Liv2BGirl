import React, { useEffect } from "react";

// Styling
import global from "../components.global.scss";
import styles from "./signup.module.scss";

// Avatar Utils
import { avatarImg, colorArr } from "../../../utils/avatars";

const topics = [
  "Music",
  "Movies",
  "Art",
  "Books",
  "Career",
  "Sports",
  "Science",
];

const TellUsAbout = ({ values, setValues, setStageCompleted }) => {
  const {
    username,
    age,
    grade,
    selectedTopics,
    ageOpen,
    gradeOpen,
    avatar,
    avatarColor,
  } = values;

  useEffect(() => {
    if (age > 0 && grade.length > 0 && selectedTopics.length > 0) {
      setStageCompleted(true);
    }
  }, [age, grade, selectedTopics]);

  const renderAgeOptions = () => {
    const ages = [13, 14, 15, 16, 17, 18]; // TODO: hardcoded

    return ages.map(item => (
      <option onChange={() => setValues({ age: item })}>{item}</option>
    ));
  };

  const renderGradeOptions = () => {
    const grades = ["7th", "8th", "9th", "10th", "11th", "12th"]; // TODO: hardcoded

    return grades.map(item => (
      <option onChange={() => setValues({ grade: item })}>{item}</option>
    ));
  };

  const renderTopics = () => {
    return topics.map(topic => {
      return (
        <button
          type="button"
          className={
            selectedTopics.includes(topic)
              ? `${global.SmallPill} ${global.ActivePill}`
              : `${global.SmallPill}`
          }
          onClick={() => {
            const newTopics = [...selectedTopics];
            const index = newTopics.indexOf(topic);

            if (index < 0) {
              newTopics.push(topic);
            } else {
              newTopics.splice(index, 1);
            }

            setValues({
              selectedTopics: newTopics,
            });
          }}
        >
          <h2>{topic}</h2>
        </button>
      );
    });
  };

  return (
    <div className={`${global.Page} ${styles.AboutPg}`}>
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
          <select id="age" className={styles.AboutSelect}>
            {renderAgeOptions()}
          </select>
        </div>

        <div style={{ display: "flex" }}>
          <label className={styles.AboutLabel} htmlFor="grade">
            <h2>School Year:</h2>
          </label>
          <select id="grade" className={styles.AboutSelect}>
            {renderGradeOptions()}
          </select>
        </div>

        <h2 className={styles.AboutLabel}>Topics you are interested in:</h2>
        <div className={styles.AboutTopics}>{renderTopics()}</div>
      </form>
    </div>
  );
};

export default TellUsAbout;
