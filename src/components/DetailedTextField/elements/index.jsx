import React from "react";
import PropTypes from "prop-types";
import MentionElement from "./MentionElement";

const Elements = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "mention":
      return (
        <MentionElement attributes={attributes} element={element}>
          {children}
        </MentionElement>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

Elements.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  element: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Elements;
