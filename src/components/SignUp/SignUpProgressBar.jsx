import React from "react";
import PropTypes from "prop-types";
import styles from "./signup.module.scss";

const ProgressCircle = ({ active, ...rest }) => (
  <div
    className={styles.ProgressCircle}
    style={{
      backgroundColor: active ? "#BDBDBD" : "#FFFFFF",
    }}
    {...rest}
  />
);

ProgressCircle.propTypes = {
  active: PropTypes.bool.isRequired,
};

const SignUpProgressBar = ({ stage, setStage }) => {
  if (stage < 1 || stage > 3) {
    return null;
  }

  const goToStage = (newStage) => {
    if (newStage < stage) {
      setStage(newStage);
    }
  };

  return (
    <div className={styles.ProgressContainer}>
      <ProgressCircle active={stage > 0} onClick={() => goToStage(1)} />
      <ProgressCircle active={stage > 1} onClick={() => goToStage(2)} />
      <ProgressCircle active={stage > 2} onClick={() => goToStage(3)} />
    </div>
  );
};

SignUpProgressBar.propTypes = {
  stage: PropTypes.number.isRequired,
  setStage: PropTypes.func.isRequired,
};

export default SignUpProgressBar;
