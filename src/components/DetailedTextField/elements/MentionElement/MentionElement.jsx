import React from "react";
import PropTypes from "prop-types";
import { useSelected, useFocused } from "slate-react";
import classes from "./MentionElement.module.scss";

const MentionElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();

  const { user } = element;

  return (
    <span
      contentEditable={false}
      className={classes.root}
      style={{
        boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
      }}
      {...attributes}
    >
      @{user.username}
      {children}
    </span>
  );
};

MentionElement.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  element: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MentionElement;
