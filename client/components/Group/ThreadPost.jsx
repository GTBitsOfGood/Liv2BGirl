import React from "react";
import PropTypes from "prop-types";
import { Link } from "next/link";
import { Button } from "reactstrap";
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";
import classes from "./GroupPage.module.scss";

const ThreadPost = props => {
  const { title, summary, author, comments } = props;

  return (
    <Button
      tag={Link}
      className={classes.groupThread}
      href={`/app/groups/thread/${title}`}
    >
      <div style={{ display: "flex" }}>
        <h1 className={classes.threadTitle}>{title}</h1>
        <h2 className={classes.threadTime}>5h</h2>
      </div>

      <h2 className={classes.threadSummary}>{summary}</h2>
      <div className={classes.threadDetails}>
        <img
          className={classes.authorAvatar}
          src="https://picsum.photos/50/50"
          alt="Group Avatar"
        />
        <p className={classes.threadAuthor}>{author}</p>
        <div className={classes.threadComments}>
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
