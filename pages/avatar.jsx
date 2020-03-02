import React, { useState } from "react";
import { Button, Card, CardImg, CardDeck, Row } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../utils/urls";

import avatarPhoto1 from "../public/img/avatars/apple.png";
import avatarPhoto2 from "../public/img/avatars/avocado.png";
import avatarPhoto3 from "../public/img/avatars/banana.png";
import avatarPhoto4 from "../public/img/avatars/kiwi.png";
import avatarPhoto5 from "../public/img/avatars/pear.png";
import avatarPhoto6 from "../public/img/avatars/strawberry.png";

// Avatar Images
const avatarImg = [
  avatarPhoto1,
  avatarPhoto2,
  avatarPhoto3,
  avatarPhoto4,
  avatarPhoto5,
  avatarPhoto6
];

const colorArr = ["red", "blue", "green", "yellow", "cyan", "magenta"];

const Avatar = () => {
  const [avatar, setAvatar] = useState(0);
  const [color, setColor] = useState(0);

  return (
    <div>
      <div style={{ fontWeight: "bold", textAlign: "center" }}>
        <Button
          tag={Link}
          href={urls.pages.signUp}
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: "black",
            float: "left",
            padding: 0
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <span style={{ fontSize: "22px", color: "#4F4F4F" }}>
          Make your own avatar.
        </span>
      </div>
      <div
        style={{
          backgroundColor: colorArr[color],
          display: "flex"
        }}
        className="avatar-logo"
        disabled
      >
        <img
          src={avatarImg[avatar]}
          alt="Avatar"
          style={{ margin: "25px", flexGrow: "1" }}
        />
      </div>
      <br />

      <Row className="ml-3">
        <div display="table-cell" vertical-align="middle">
          <h4 style={{ fontSize: "18px", color: "#4F4F4F" }}>Object</h4>
        </div>
      </Row>
      <Row className="scrollable-box ml-3">
        <CardDeck
          style={{
            display: "flex",
            overflowX: "scroll",
            flexDirection: "row",
            marginTop: "20px"
          }}
        >
          {avatarImg.map((curAvatar, index) => (
            <Card
              key={curAvatar}
              style={{ flex: "0 0 40%", marginRight: "25px", border: "none" }}
              onClick={() => setAvatar(index)}
            >
              <CardImg
                style={{ margin: "auto 0" }}
                width="200px"
                src={curAvatar}
                alt={index}
              />
            </Card>
          ))}
        </CardDeck>
      </Row>

      <Row className="ml-3" style={{ marginTop: "50px" }}>
        <div display="table-cell" vertical-align="middle">
          <h4 style={{ fontSize: "18px", color: "#4F4F4F" }}>
            Background Color
          </h4>
        </div>
      </Row>
      <Row className="scrollable-box ml-3">
        <CardDeck
          style={{
            display: "flex",
            overflowX: "scroll",
            flexDirection: "row",
            marginTop: "20px"
          }}
        >
          {colorArr.map((curColor, index) => (
            <Card
              key={curColor}
              style={{ flex: "0 0 40%", marginRight: "25px", border: "none" }}
              onClick={() => setColor(index)}
            >
              <span className="color" style={{ backgroundColor: curColor }} />
            </Card>
          ))}
        </CardDeck>
      </Row>

      <Button
        style={{
          WebkitTextFillColor: "#111111",
          fontWeight: "bold",
          color: "#4F4F4F"
        }}
        className="button"
      >
        NEXT STEP
      </Button>
    </div>
  );
};
export default Avatar;
