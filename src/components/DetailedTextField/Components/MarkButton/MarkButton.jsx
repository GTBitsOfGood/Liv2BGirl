import React from "react";
import PropTypes from "prop-types";
import { useSlate } from "slate-react";
import Button from "../Button";
import Icon from "../Icon";
import { isMarkActive, toggleMark } from "../../utils";

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();

  const handleMouseDown = (event) => {
    event.preventDefault();

    toggleMark(editor, format);
  };

  return (
    <Button active={isMarkActive(editor, format)} onMouseDown={handleMouseDown}>
      <Icon icon={icon} />
    </Button>
  );
};

MarkButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
};

export default MarkButton;
