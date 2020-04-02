import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";

const AskQuestion = props => {
  return (
    <div>
      <div style={{ backgroundColor: "lightgray" }}>
        <Button className="Back" tag={Link} href={urls.pages.app.termAndCond}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <label style={{ marginLeft: 60, fontWeight: "bold" }}>
          Ask Question
        </label>
      </div>
      <div>
        <h2>Audience:</h2>
        <Dropdown group size="sm">
          <DropdownMenu>
            <DropdownItem>Public</DropdownItem>
            <DropdownItem>Private</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <FormGroup>
        <Label>Question</Label> <br />
        <Input type="textarea" name="question" style={{ height: 100 }} />
      </FormGroup>
    </div>
  );
};
export default AskQuestion;
