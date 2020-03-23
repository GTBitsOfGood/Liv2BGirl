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
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  return (
    <div>
      <div style={{ backgroundColor: "lightgray" }}>
        <Button className="button" tag={Link} href={urls.pages.app.termAndCond}>
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
          <Input
            onChange={event => {
              setName(event.target.value), console.log(name);
            }}
            name="groupname"
          />
        </FormGroup>
        <FormGroup>
          <Label>Description *</Label>
          <Input
            onChange={event => {
              setDescription(event.target.value), console.log(description);
            }}
            type="textarea"
            name="description"
            style={{ height: 100 }}
          />
        </FormGroup>
        <h6>Category</h6>
        {categories.map(cat => (
          <Button
            onClick={() => {
              setCategory(cat), console.log(category);
            }}
            className="username-btn"
          >
            {cat}
          </Button>
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
            paddingTop: 13,
          }}
          tag={Link}
          href={urls.pages.app.newgroupconf}
        >
          CREATE
        </Button>
      </div>
    </div>
  );
};
export default NewGroup;
