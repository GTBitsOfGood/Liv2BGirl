import React, { useState } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";
import "./CreateNewGroup.scss";

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

const NewGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  return (
    <div className="newgroup-pg">
      <div className="newgroup-header">
        <Button
          className="header-back-btn"
          tag={Link}
          href={urls.pages.termAndCond}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <h1 className="header-text">Create New Group</h1>
        <div />
      </div>
      <div className="page">
        <div className="add-icon">
          <Button className="add-btn">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <h1 className="add-text">Add an icon</h1>
        </div>
        <FormGroup>
          <Label className="create-grp-header">Group Name *</Label>
          <Input
            className="grp-name-text"
            onChange={event => setName(event.target.value)}
            name="groupname"
          />
        </FormGroup>
        <FormGroup>
          <Label className="create-grp-header">Description *</Label>
          <Input
            className="grp-dsc-text"
            onChange={event => setDescription(event.target.value)}
            type="textarea"
            name="description"
          />
        </FormGroup>
        <h1 className="create-grp-header">Category</h1>
        <div className="grp-category-deck">
          {categories.map(cat => (
            <Button
              active={category === cat}
              onClick={() => {
                setCategory(cat);
              }}
              className="category-btn"
            >
              {cat}
            </Button>
          ))}
        </div>
        <Button
          className="grp-next-btn"
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
