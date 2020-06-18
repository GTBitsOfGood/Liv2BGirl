import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Iconify from "@iconify/react";
import classes from "./Icon.module.scss";

const Icon = React.forwardRef(({ className, icon, ...props }, ref) => (
  <span ref={ref} className={clsx(className, classes.root)} {...props}>
    <Iconify icon={icon} />
  </span>
));

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any.isRequired,
};

Icon.displayName = "Icon";

export default Icon;
