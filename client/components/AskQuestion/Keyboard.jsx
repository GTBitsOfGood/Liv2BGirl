import React from "react";
import { Button, ListGroup, ListGroupItem, Label } from "reactstrap";
import {
  faArrowLeft,
  faGlobe,
  faGlasses,
  faCheck,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import classes from "./question.module.css";

const Keyboard = props => {
  function getCheck() {
    return <FontAwesomeIcon style={{ marginLeft: 5 }} icon={faCheck} />;
  }

  return (
    <div>
      <div style={{ backgroundColor: "lightgray" }}>
        <Button
          className="Back"
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: "black",
          }}
          tag={Link}
          onClick={() => props.setClicked(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <label style={{ marginLeft: 90, fontWeight: "bold" }}>Audience</label>
      </div>
      <div>
        <ListGroup>
          <ListGroupItem
            onClick={() => props.setVis("Public")}
            tag="button"
            action
          >
            <FontAwesomeIcon style={{ marginRight: 5 }} icon={faGlobe} /> Public
            {props.audience === "Public" && getCheck()}
            <br />
            <Label style={{ fontSize: 11 }}>
              Others will see this question with your identity shown.
            </Label>
          </ListGroupItem>
          <ListGroupItem
            onClick={() => props.setVis("Anonymous")}
            tag="button"
            action
          >
            <FontAwesomeIcon style={{ marginRight: 5 }} icon={faGlasses} />{" "}
            Anonymous
            {props.audience === "Anonymous" && getCheck()}
            <Label style={{ fontSize: 11 }}>
              Others will see this question with your identity hidden.
            </Label>
          </ListGroupItem>
          <ListGroupItem
            onClick={() => props.setVis("Ambassador")}
            tag="button"
            action
          >
            <FontAwesomeIcon style={{ marginRight: 5 }} icon={faUserCircle} />{" "}
            Ambassador
            {props.audience === "Ambassador" && getCheck()}
            <Label style={{ fontSize: 11 }}>
              Only Ambassador will see this question and your identity.
            </Label>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};
export default Keyboard;
