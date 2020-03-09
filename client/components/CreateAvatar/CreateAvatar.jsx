import React, { useState } from "react";
import { Button } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";

import avatarPhoto1 from "../../../public/img/avatars/apple.png";
import avatarPhoto2 from "../../../public/img/avatars/avocado.png";
import avatarPhoto3 from "../../../public/img/avatars/banana.png";
import avatarPhoto4 from "../../../public/img/avatars/kiwi.png";
import avatarPhoto5 from "../../../public/img/avatars/pear.png";
import avatarPhoto6 from "../../../public/img/avatars/strawberry.png";

// CreateAvatar Images
const avatarImg = [
  avatarPhoto1,
  avatarPhoto2,
  avatarPhoto3,
  avatarPhoto4,
  avatarPhoto5,
  avatarPhoto6,
];

const colorArr = ["red", "blue", "green", "yellow", "cyan", "magenta"];

const CreateAvatar = ({ values, setValues }) => {
  const { avatar, avatarColor } = values;

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
                  avatar: index,
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
