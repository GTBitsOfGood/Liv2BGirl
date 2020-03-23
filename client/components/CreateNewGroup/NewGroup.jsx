import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";
import "./NewGroup.scss";
// import { check } from "prettier";

const NewGroup = props => {
  const [notChecked, setChecked] = React.useState(true);

  return (
    <div>
      <div style={{ backgroundColor: "lightgray", marginTop: 50 }}>
        <Button className="button" tag={Link} href={urls.pages.signUp}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <label style={{ marginLeft: 60 }}>Create New Group</label>
      </div>
      <div className="page">
        <h2 style={{ fontSize: 18, fontWeight: "bold" }}>Terms & Agreement</h2>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
        <p />
        <br />
        <div>
          <input
            onClick={() => {
              setChecked(!notChecked);
            }}
            type="checkbox"
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
          <label>I have read the terms and conditions</label>
        </div>
        <br />
        <Button
          disabled={notChecked}
          onClick={() => console.log("clicked!")}
          style={{
            outlineColor: "lightgray",
            backgroundColor: "lightgray",
            marginLeft: 75,
            width: 150,
            height: 50,
            WebkitBorderRadius: 40,
            color: "black",
          }}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default NewGroup;
