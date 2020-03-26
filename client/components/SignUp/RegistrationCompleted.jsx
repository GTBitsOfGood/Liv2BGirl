import React from "react";
import checkmark from "../../../public/img/checkmark.png";

// Styling
import styles from "./signup.module.scss";

const RegistrationCompleted = () => (
  <div className={`Page ${styles.CompletePage}`}>
    <img className={styles.CompleteCheck} src={checkmark} alt="Checkmark" />
    <h2 className={styles.CompleteText}>Registration Completed</h2>
  </div>
);

export default RegistrationCompleted;
