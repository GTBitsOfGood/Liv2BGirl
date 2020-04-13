import React, { useEffect } from "react";

// Styling
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
  const { username, age, grade, interests, avatar, avatarColor } = values;

  useEffect(() => {
    if (age > 0 && grade > 0 && interests.length > 0) {
      setStageCompleted(true);
    }
  }, [age, grade, interests]);

  const renderAgeOptions = () => {
    const ages = [13, 14, 15, 16, 17, 18];

    return ages.map(item => <option value={item}>{item}</option>);
  };

  const renderGradeOptions = () => {
    const grades = [7, 8, 9, 10, 11, 12];

    return grades.map(item => <option value={item}>{`${item}th`}</option>);
  };

  const renderTopics = () => {
    return topics.map(topic => {
      return (
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
      );
    });
  };

  return (
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
            {renderAgeOptions()}
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
