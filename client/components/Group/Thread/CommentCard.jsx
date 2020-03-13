import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import clsx from "clsx";
import classes from "./ThreadPage.module.scss";

const CommentPage = props => {
  const { author, date, text } = props;

  return (
    <div className={clsx("page", classes.commentPg)}>
      <div className={classes.commentDetails}>
        <img
          className={classes.authorAvatar}
          src="https://picsum.photos/50/50"
          alt="Group Avatar"
        />
        <div>
          <p className={classes.commentAuthor}>{author}</p>
          <p className={classes.commentDate}>{date}</p>
        </div>
      </div>
      <p className={classes.commentText}>{text}</p>
      <Button className={classes.commentReply}>Reply</Button>
    </div>
  );
};

CommentPage.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CommentPage;
