import React from "react";
import styles from "./SignUpProgressBar.module.css";

const ProgressCircle = ({ active }) => (
  <div
    className={styles.circle}
    style={{
      backgroundColor: active ? "#BDBDBD" : "#FFFFFF",
    }}
  />
);

const SignUpProgressBar = ({ stage }) => {
  if (stage < 1 || stage > 3) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ProgressCircle active={stage > 0} />
      <ProgressCircle active={stage > 1} />
      <ProgressCircle active={stage > 2} />
    </div>
  );
};

export default SignUpProgressBar;
