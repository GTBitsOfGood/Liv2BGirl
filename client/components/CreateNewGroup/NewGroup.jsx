import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";
import "./NewGroup.scss";

const categories = [
  "Music",
  "Movie",
  "Art",
  "Books",
  "Mental Health",
  "Dating",
  "College",
  "Career",
];

const NewGroup = props => {
  return (
    <div>
      <div style={{ backgroundColor: "lightgray", marginTop: 50 }}>
        <Button className="button" tag={Link} href={urls.pages.signUp}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <label style={{ marginLeft: 60, fontWeight: "bold" }}>
          Create New Group
        </label>
      </div>
      <div>
        <Button
          style={{ height: 60, width: 60, marginLeft: 130, marginTop: 20 }}
          className="button"
        >
          <FontAwesomeIcon
            style={{ color: "darkgray", height: 45, width: 30 }}
            icon={faPlus}
          />
        </Button>
        <br />
        <label style={{ marginLeft: 135, fontWeight: "bold", fontSize: 8 }}>
          Add an icon
        </label>
      </div>

      <div
        style={{ marginTop: 20, marginLeft: 10, marginRight: 10, height: 720 }}
      >
        <FormGroup>
          <Label>Group Name *</Label>
          <Input name="groupname" />
        </FormGroup>
        <FormGroup>
          <Label>Description *</Label>
          <Input type="textarea" name="description" style={{ height: 100 }} />
        </FormGroup>
        <h6>Category</h6>
        {categories.map(category => (
          <Button className="username-btn">{category}</Button>
        ))}
        <br />
        <Button
          className="create"
          style={{
            WebkitBorderRadius: 40,
            width: 150,
            height: 50,
            marginLeft: 85,
            marginTop: 20,
          }}
        >
          CREATE
        </Button>
      </div>
    </div>
  );
};
export default NewGroup;
