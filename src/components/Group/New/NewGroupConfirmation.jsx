import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import urls from "../../../../utils/urls";
import styles from "./newgroup.module.scss";

const NewGroupConfirmation = ({ newGroupId }) => (
  <div className={styles.ConfirmationPage}>
    <div className={styles.ConfirmationBtn}>
      <FontAwesomeIcon className={styles.CheckIcon} icon={faCheck} />
    </div>
    <h2 className={styles.ConfirmationHeader}>Group created successfully</h2>
    <div style={{ display: "flex" }}>
      <Link href={urls.pages.app.group(newGroupId)}>
        <button className="NextButton" type="button">
          <h1>GO TO THE GROUP</h1>
        </button>
      </Link>
    </div>
  </div>
);

NewGroupConfirmation.propTypes = {
  newGroupId: PropTypes.string.isRequired,
};

export default NewGroupConfirmation;
