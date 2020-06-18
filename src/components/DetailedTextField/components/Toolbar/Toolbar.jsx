import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Menu from "../Menu";
import classes from "./Toolbar.module.scss";

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu ref={ref} className={clsx(className, classes.root)} {...props} />
));

Toolbar.propTypes = {
  className: PropTypes.string,
};

Toolbar.displayName = "Toolbar";

export default Toolbar;
