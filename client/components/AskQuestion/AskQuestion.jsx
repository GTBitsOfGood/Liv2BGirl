import React from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import {
  faArrowLeft,
  faAngleRight,
  faGlobe,
  faGlasses,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import Keyboard from "./Keyboard";
import urls from "../../../utils/urls";
import "./question.module.css";

const AskQuestion = props => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [visibility, setVisibility] = React.useState("Public");
  const [question, setQuestion] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [clickedVis, setClickedVis] = React.useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  function getIcon() {
    if (visibility === "Public") {
      return (
        <FontAwesomeIcon
          style={{ color: "black", marginRight: 7 }}
          icon={faGlobe}
        />
      );
    }
    if (visibility === "Anonymous") {
      return (
        <FontAwesomeIcon
          style={{ color: "black", marginRight: 7 }}
          icon={faGlasses}
        />
      );
    }
    if (visibility === "Ambassador") {
      return (
        <FontAwesomeIcon
          style={{ color: "black", marginRight: 7 }}
          icon={faUserCircle}
        />
      );
    }
  }

  return (
    <div>
      {clickedVis && (
        <Keyboard
          setVis={setVisibility}
          audience={visibility}
          setClicked={setClickedVis}
        />
      )}
      {!clickedVis && (
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
              href={urls.pages.app.termAndCond}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <label style={{ marginLeft: 70, fontWeight: "bold" }}>
              Ask Question
            </label>

            <Button
              className="SmallPill"
              style={{
                backgroundColor: "darkGray",
                color: "black",
                marginLeft: 55,
                fontSize: 11.5,
                fontWeight: "bold",
                height: 25,
                WebkitTextFillColor: "$text",
              }}
              tag={Link}
            >
              Post
            </Button>
          </div>

          <div style={{ marginLeft: 10, marginTop: 10 }}>
            <div style={{ display: "flex" }}>
              <h3 style={{ marginTop: 6 }}>Audience:</h3>

              <Button
                onClick={() => setClickedVis(true)}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  WebkitTextFillColor: "black",
                }}
              >
                {getIcon()}
                {visibility}
                <FontAwesomeIcon
                  style={{ color: "black", marginLeft: 10 }}
                  icon={faAngleRight}
                />
              </Button>

              {/* <Dropdown
            style={{
              marginLeft: 20,
              WebkitTextFillColor: "black",
              color: "white",
            }}
            group
            isOpen={dropdownOpen}
            size="sm"
            toggle={toggle}
          >
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
              style={{ color: "transparent" }}
            >
              {getIcon()}
              {visibility}
              <FontAwesomeIcon
                style={{ color: "black", marginLeft: 10 }}
                icon={faAngleRight}
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setVisibility("Public")}>
                Public
              </DropdownItem>
              <DropdownItem onClick={() => setVisibility("Anonymous")}>
                Anonymous
              </DropdownItem>
              <DropdownItem onClick={() => setVisibility("Ambassador")}>
                Ambassador
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
            </div>
            <br />
            <FormGroup>
              <Label>Question</Label>
              <Input
                type="textarea"
                placeholder='Start your question with "What" "How", "Why", etc.'
                style={{ height: 100, width: 325 }}
                onChange={e => setQuestion(e.target.value)}
                value={question}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description (Optional)</Label>
              <Input
                type="textarea"
                placeholder="Add more context to your question"
                style={{ height: 230, width: 325 }}
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </FormGroup>
          </div>
        </div>
      )}
    </div>
  );
};
export default AskQuestion;
