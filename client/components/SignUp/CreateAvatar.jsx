import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { avatarImg, colorArr } from "../../../utils/avatars";
import urls from "../../../utils/urls";
import styles from "./signup.module.scss";

const CreateAvatar = ({ values, setValues, handleNext }) => {
  const { avatar, avatarColor } = values;

  return (
    <>
      <div className="Page" style={{ marginBottom: 0 }}>
        <div className={styles.AvatarHeader}>
          <Link href={urls.pages.signUp}>
            <div className={styles.BackBtn}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          </Link>
          <h1 className={styles.AvatarHeading}>Make your own avatar.</h1>
          <div />
        </div>
        <div
          style={{
            backgroundColor: colorArr[avatarColor],
          }}
          className={styles.AvatarLogo}
        >
          <img
            src={avatarImg[avatar]}
            alt="CreateAvatar"
            className={styles.AvatarImg}
          />
        </div>
        <br />

        <div className={styles.AvatarObject}>
          <h2>Object</h2>
          <div className={styles.ObjectDeck}>
            {avatarImg.map((curAvatar, index) => (
              <div
                role="button"
                key={curAvatar}
                tabIndex={index}
                className={
                  index === avatar
                    ? `${styles.ObjectCard} ${styles.Active}`
                    : `${styles.ObjectCard}`
                }
                onClick={() => {
                  setValues({
                    avatar: index,
                  });
                }}
                onKeyDown={() => {
                  setValues({
                    avatar: index,
                  });
                }}
              >
                <img
                  className={styles.ObjectImg}
                  src={curAvatar}
                  alt={`Avatar ${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.AvatarColor}>
          <h2>Background Color</h2>
          <div className={styles.ColorDeck}>
            {colorArr.map((curColor, index) => (
              <div
                role="button"
                key={curColor}
                tabIndex={index}
                className={
                  index === avatarColor
                    ? `${styles.ColorCard} ${styles.Active}`
                    : `${styles.ColorCard}`
                }
                style={{ backgroundColor: curColor }}
                onClick={() => {
                  setValues({
                    avatarColor: index,
                  });
                }}
                onKeyDown={() => {
                  setValues({
                    avatarColor: index,
                  });
                }}
                aria-label="Background Color"
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button type="button" className="NextButton" onClick={handleNext}>
          <h1>NEXT STEP</h1>
        </button>
      </div>
    </>
  );
};

CreateAvatar.propTypes = {
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

export default CreateAvatar;
