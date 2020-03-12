import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

// Stylings
import "./ThreadPage.scss";

const CommentPage = props => {
  const { author, date, text } = props;

  return (
    <div className="page comment-pg">
      <div className="comment-details">
        <img
          className="author-avatar"
          src="https://picsum.photos/50/50"
          alt="Group Avatar"
        />
        <div comment-details-sub>
          <p className="comment-author">{author}</p>
          <p className="comment-date">{date}</p>
        </div>
      </div>
      <p className="comment-text">{text}</p>
      <Button className="comment-reply">Reply</Button>
    </div>
  );
};

CommentPage.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CommentPage;
