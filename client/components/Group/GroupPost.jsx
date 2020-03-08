import React from "react";
import PropTypes from "prop-types";

// Styling
import "./GroupPage.scss";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";

const GroupPost = props => {
  const { title, summary, author, comments } = props;

  return (
    <div className="group-thread">
      <div style={{ display: "flex" }}>
        <h1 className="thread-title">{title}</h1>
        <h2 className="thread-time">5h</h2>
      </div>

      <h2 className="thread-summary">{summary}</h2>
      <div className="thread-details">
        <img
          className="author-avatar"
          src="https://picsum.photos/50/50"
          alt="Group Avatar"
        />
        <p className="thread-author">{author}</p>
        <div className="thread-comments">
          <Icon icon={bxCommentDetail} />
          <p>{comments}</p>
        </div>
      </div>
    </div>
  );
};

GroupPost.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
};

export default GroupPost;
