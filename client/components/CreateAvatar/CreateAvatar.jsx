import React from "react";
import { Button } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";
import { avatarImg, colorArr } from "../../utils/avatars";

const CreateAvatar = ({ values, setValues, setStageCompleted }) => {
  const { avatar, avatarColor } = values;

  React.useEffect(() => {
    setStageCompleted(true);
  }, []);

  return (
    <div className="page" style={{ marginBottom: 0 }}>
      <div className="avatar-header">
        <Button tag={Link} href={urls.pages.signUp} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <div className="avatar-header-text">Make your own avatar.</div>
        <div />
      </div>
      <div
        style={{
          backgroundColor: colorArr[avatarColor],
        }}
        className="avatar-logo"
      >
        <img
          src={avatarImg[avatar]}
          alt="CreateAvatar"
          className="avatar-img"
        />
      </div>
      <br />

      <div className="avatar-object">
        <h4>Object</h4>
        <div className="object-deck">
          {avatarImg.map((curAvatar, index) => (
            <div
              className={
                index === avatar ? "object-card active" : "object-card"
              }
              key={curAvatar}
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
              role="button"
              tabIndex={index}
            >
              <img
                className="object-img"
                src={curAvatar}
                alt={`Avatar ${index}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="avatar-color">
        <h4>Background Color</h4>
        <div className="color-deck">
          {colorArr.map((curColor, index) => (
            <Button
              key={curColor}
              onClick={() => {
                setValues({
                  avatar: index,
                });
              }}
              onKeyDown={() => {
                setValues({
                  avatarColor: index,
                });
              }}
              className={
                index === avatarColor ? "color-card active" : "color-card"
              }
              style={{ backgroundColor: curColor }}
              aria-label="Background Color"
              tabIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateAvatar;
