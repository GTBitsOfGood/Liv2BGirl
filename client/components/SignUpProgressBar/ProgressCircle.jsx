import React from "react";
import classes from "./SignUpProgressBar.module.scss";

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
