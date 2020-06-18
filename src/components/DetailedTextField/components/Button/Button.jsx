import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import classes from "./Button.module.scss";

const isReversed = (active) => (active ? "white" : "#aaa");
const notReversed = (active) => (active ? "black" : "#ccc");

const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(className, classes.root)}
      style={{
        color: reversed ? isReversed(active) : notReversed(active),
      }}
      {...props}
    />
  )
);

Button.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  reversed: PropTypes.bool,
};

Button.defaultProps = {
  active: false,
  reversed: false,
};

Button.displayName = "Button";

export default Button;
