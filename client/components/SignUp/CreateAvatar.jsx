import React, { useEffect } from "react";
import { Link } from "next/link";

// FontAwesome Icons
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import urls from "../../../utils/urls";
import { avatarImg, colorArr } from "../../../utils/avatars";

// Styling
import styles from "./signup.module.scss";

const CreateAvatar = ({ values, setValues, setStageCompleted }) => {
  const { avatar, avatarColor } = values;

  useEffect(() => {
    setStageCompleted(true);
  }, []);

  return (
    <div className="Page" style={{ marginBottom: 0 }}>
      <div className={styles.AvatarHeader}>
        <div tag={Link} href={urls.pages.signUp} className={styles.BackBtn}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
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
  );
};

export default CreateAvatar;
