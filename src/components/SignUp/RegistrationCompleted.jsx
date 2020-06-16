import React from "react";
import Link from "next/link";
import checkmark from "../../../public/static/img/checkmark.png";
import urls from "../../../utils/urls";
import styles from "./signup.module.scss";

const RegistrationCompleted = () => (
  <>
    <div className={`Page ${styles.CompletePage}`}>
      <img className={styles.CompleteCheck} src={checkmark} alt="Checkmark" />
      <h2 className={styles.CompleteText}>Registration Completed</h2>
    </div>
    <Link href={urls.pages.app.index}>
      <div style={{ display: "flex" }}>
        <button type="button" className="NextButton">
          <h1>GET STARTED</h1>
        </button>
      </div>
    </Link>
  </>
);

export default RegistrationCompleted;
