import React from "react";
import { Button, Card, CardImg, CardDeck, Row } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../utils/urls";

const Avatar = () => {
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
      <Button
        style={{ WebkitTextFillColor: "#4F4F4F", backgroundColor: "#C4C4C4" }}
        className="avatar-logo"
        disabled
      >
        Avatar
      </Button>
      <br />

      <Row className="ml-3">
        <div display="table-cell" vertical-align="middle">
          <h4 style={{ fontSize: "18px", color: "#4F4F4F" }}>Object</h4>
        </div>
      </Row>
      <Row className="scrollable-box ml-3">
        <CardDeck
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            marginTop: "20px"
          }}
        >
          <Card style={{ flexBasis: "55%", marginRight: "15px" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/400/400?image=10"
              alt="Card image cap"
            />
          </Card>
          <Card style={{ flexBasis: "55%", marginRight: "15px" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/400/400?image=20"
              alt="Card image cap"
            />
          </Card>
          <Card style={{ flexBasis: "55%", marginRight: "15px" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/400/400?image=30"
              alt="Card image cap"
            />
          </Card>
          <Card style={{ flexBasis: "55%", marginRight: "15px" }}>
            <CardImg
              top
              width="100%"
              src="https://picsum.photos/400/400?image=40"
              alt="Card image cap"
            />
          </Card>
        </CardDeck>
      </Row>

      <Row className="ml-3">
        <div display="table-cell" vertical-align="middle">
          <h4 style={{ fontSize: "18px", color: "#4F4F4F" }}>
            Background Color
          </h4>
        </div>
      </Row>
      <Row className="scrollable-box ml-3">
        <CardDeck
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            marginTop: "20px"
          }}
        >
          <Card style={{ marginRight: "15px", border: "none" }}>
            <span className="color" />
          </Card>
          <Card style={{ marginRight: "15px", border: "none" }}>
            <span className="color" />
          </Card>
          <Card style={{ marginRight: "15px", border: "none" }}>
            <span className="color" />
          </Card>
          <Card style={{ marginRight: "15px", border: "none" }}>
            <span className="color" />
          </Card>
          <Card style={{ marginRight: "15px", border: "none" }}>
            <span className="color" />
          </Card>
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
