import React from "react";
import PropTypes from "prop-types";
import { useSlate } from "slate-react";
import Button from "../Button";
import Icon from "../Icon";
import { isBlockActive, toggleBlock } from "../../utils";

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();

  const handleMouseDown = (event) => {
    event.preventDefault();

    toggleBlock(editor, format);
  };

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={handleMouseDown}
    >
      <Icon icon={icon} />
    </Button>
  );
};

BlockButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
};

export default BlockButton;
