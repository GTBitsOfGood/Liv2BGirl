import React from "react";
import PropTypes from "prop-types";
import { Link } from "next/link";

// Components
import { Button } from "reactstrap";

// Styling
import "./GroupPage.scss";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";

const ThreadPost = props => {
  const { title, summary, author, comments } = props;

  return (
    <Button
      tag={Link}
      className="group-thread"
      href={`/app/groups/thread/${title}`}
    >
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
    </Button>
  );
};

ThreadPost.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
};

export default ThreadPost;
