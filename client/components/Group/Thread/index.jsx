import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";

// Components
import CommentCard from "./CommentCard";

// API Calls
import { createComment } from "../../../actions/Comment";

// Stylings
import styles from "./thread.module.scss";

// Navigation
import urls from "../../../../utils/urls";

const Thread = props => {
  const { thread } = props;
  const {
    id,
    author,
    groupId,
    groupName,
    title,
    postedAt,
    content,
    comments,
  } = thread;
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  const postComment = () => {
    if (comment.length > 0) {
      createComment(currentUser.id, id, comment).then(res => {
        if (res) {
          console.log(res);
        }
      });
    }
  };

  return (
    <div className={styles.ThreadPage}>
      <div className="TopNav">
        {thread && (
          <Link href={urls.pages.app.group(groupId)}>
            <Icon className="Back" icon={bxArrowBack} width="18px" />
          </Link>
        )}
        <h3 className={styles.ThreadNavTitle}>Thread</h3>
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className="IconButton"
        >
          {saved ? (
            <Icon icon={bxsBookmark} height="18px" />
          ) : (
            <Icon icon={bxBookmark} height="18px" />
          )}
        </button>
      </div>
      {thread && (
        <div className={`Page ${styles.ThreadMain}`}>
          <div className={styles.ThreadInfo}>
            <img
              className={styles.ThreadGroupAvatar}
              src="https://picsum.photos/100/100"
              alt="Group Avatar"
            />
            <h6 className={styles.ThreadGroupName}>{groupName}</h6>
          </div>
          <h2 className={styles.ThreadName}>{title}</h2>
          <div className={styles.ThreadDetails}>
            <img
              className={styles.ThreadAuthorAvatar}
              src="https://picsum.photos/50/50"
              alt="Group Avatar"
            />
            <div>
              <h5 className={styles.ThreadAuthor}>{author}</h5>
              <h6 className={styles.ThreadDate}>{postedAt}</h6>
            </div>
          </div>
          <h4 className={styles.ThreadText}>{content}</h4>
        </div>
      )}

      <div className={styles.ThreadComments}>
        {comments.map(item => (
          <CommentCard
            key="Thread"
            authorid={item.poster}
            date={item.postedAt}
            text={item.content}
          />
        ))}
      </div>

      <div className={styles.CommentFooter}>
        <div className={styles.Footer1}>
          <img
            className={styles.UserAvatar}
            src="https://picsum.photos/100/100"
            alt="User Avatar"
          />
          <textarea
            className={styles.CommentInput}
            placeholder="Comment"
            onChange={event => setComment(event.target.value)}
          />
        </div>
        <button
          type="button"
          className="PostButton"
          onClick={() => postComment()}
          style={{ marginLeft: "auto", marginTop: "12px" }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

Thread.propTypes = {
  thread: PropTypes.shape({}).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Thread;
