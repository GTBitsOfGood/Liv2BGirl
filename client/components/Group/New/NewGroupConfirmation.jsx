import React from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// Styling
import styles from "./newgroup.module.scss";

const NewGroupConfirmation = () => {
  return (
    <div className={styles.ConfirmationPage}>
      <div className={styles.ConfirmationBtn}>
        <FontAwesomeIcon className={styles.CheckIcon} icon={faCheck} />
      </div>
      <h2 className={styles.ConfirmationHeader}>Group created successfully</h2>
    </div>
  );
};
export default NewGroupConfirmation;
