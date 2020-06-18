import React from "react";
import PropTypes from "prop-types";

const Leafs = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

Leafs.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node.isRequired,
  leaf: PropTypes.shape({
    bold: PropTypes.bool,
    code: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool,
  }).isRequired,
};

export default Leafs;
