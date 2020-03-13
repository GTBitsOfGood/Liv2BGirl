import React from "react";
import ProgressCircle from "./ProgressCircle";
import classes from "./SignUpProgressBar.module.css";

const SignUpProgressBar = ({ stage, setStage }) => {
  if (stage < 1 || stage > 3) {
    return null;
  }

  const goToStage = newStage => {
    if (newStage < stage) {
      setStage(newStage);
    }
  };

  return (
    <div className={classes.progressContainer}>
      <ProgressCircle active={stage > 0} onClick={() => goToStage(1)} />
      <ProgressCircle active={stage > 1} onClick={() => goToStage(2)} />
      <ProgressCircle active={stage > 2} onClick={() => goToStage(3)} />
    </div>
  );
};

export default SignUpProgressBar;
