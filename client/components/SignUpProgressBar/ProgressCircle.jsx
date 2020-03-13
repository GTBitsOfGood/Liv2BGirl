import React from "react";
import classes from "./SignUpProgressBar.module.css";

const ProgressCircle = ({ active, ...rest }) => (
  <div
    className={classes.progressCircle}
    style={{
      backgroundColor: active ? "#BDBDBD" : "#FFFFFF",
    }}
    {...rest}
  />
);

export default ProgressCircle;
