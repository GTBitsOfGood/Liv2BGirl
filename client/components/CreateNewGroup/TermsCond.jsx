import React, { useState } from "react";
import { Button, CustomInput } from "reactstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import urls from "../../../utils/urls";

// Styling
import "./CreateNewGroup.scss";

const TermsCond = () => {
  const [notChecked, setChecked] = useState(true);

  return (
    <div className="terms-pg">
      <div className="newgroup-header">
        <Button
          className="header-back-btn"
          tag={Link}
          href={urls.pages.groupList}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <h1 className="header-text">Create New Group</h1>
        <div />
      </div>
      <div className="page">
        <h2 className="page-header">Terms & Agreement</h2>
        <p className="page-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="page-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <CustomInput
          onClick={() => {
            setChecked(!notChecked);
          }}
          className="checkTerms"
          type="checkbox"
          id="checkTerms"
          label="I agree to the Terms & Agreement"
        />
        <Button
          className="grp-next-btn"
          disabled={notChecked}
          tag={Link}
          href={urls.pages.app.newgroup}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default TermsCond;
