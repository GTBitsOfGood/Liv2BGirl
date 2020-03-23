import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";
import "./NewGroup.scss";

const NewGroupConfirmation = props => {
  return (
    <div>
      <div style={{ backgroundColor: "lightgray" }}>
        <Button className="button" tag={Link} href={urls.pages.app.newgroup}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <label style={{ marginLeft: 60, fontWeight: "bold" }}>
          Create New Group
        </label>
      </div>
      <div>
        <Button
          style={{
            height: 100,
            width: 100,
            marginLeft: 120,
            marginTop: 80,
            borderRadius: 50,
          }}
          className="button"
        >
          <FontAwesomeIcon
            style={{ color: "darkgray", height: 45, width: 50 }}
            icon={faCheck}
          />
        </Button>
        <br />
        <label
          style={{
            marginLeft: 85,
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          Group created successfully
        </label>
      </div>
      <br />
      <Button
        className="create"
        style={{
          WebkitBorderRadius: 40,
          width: 150,
          height: 50,
          marginLeft: 95,
          marginTop: 60,
        }}
      >
        GO TO GROUP
      </Button>
    </div>
  );
};
export default NewGroupConfirmation;
