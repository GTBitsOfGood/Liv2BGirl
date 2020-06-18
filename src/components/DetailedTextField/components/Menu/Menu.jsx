import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import classes from "./Menu.module.scss";

const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx(className, classes.root)} {...props} />
));

Menu.propTypes = {
  className: PropTypes.string,
};

Menu.displayName = "Menu";

export default Menu;
