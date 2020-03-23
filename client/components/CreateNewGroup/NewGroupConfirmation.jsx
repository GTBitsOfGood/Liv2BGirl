import React from "react";
import { Button } from "reactstrap";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";
import "./CreateNewGroup.scss";

const NewGroupConfirmation = () => {
  return (
    <div className="newgroup-conf-pg">
      <div className="newgroup-header">
        <Button
          className="header-back-btn"
          tag={Link}
          href={urls.pages.newgroup}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <h1 className="header-text">Create New Group</h1>
        <div />
      </div>
      <div className="conf-btn">
        <FontAwesomeIcon className="check-icon" icon={faCheck} />
      </div>
      <h1 className="conf-header">Group created successfully</h1>

      <Button className="grp-next-btn">GO TO THE GROUP</Button>
    </div>
  );
};
export default NewGroupConfirmation;
