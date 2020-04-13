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
import { getThread } from "../../../actions/Thread";
import { getCommentsByThread, createComment } from "../../../actions/Comment";
import { getUser } from "../../../actions/User";
import { getGroup } from "../../../actions/Group";

// Stylings
import styles from "./thread.module.scss";

// Navigation
import urls from "../../../../utils/urls";

const Thread = props => {
  const { threadid, currentUser } = props;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);
  const [threadData, setThreadData] = useState(null);
  const [author, setAuthor] = useState("");
  const [groupName, setGroup] = useState("");

  const postComment = () => {
    if (comment.length > 0) {
      createComment(currentUser.id, threadid, comment).then(res => {
        if (res) {
          console.log(res);
        }
      });
    }
  };

  useEffect(() => {
    getThread(threadid).then(res => {
      if (res) {
        setThreadData(res);

        getUser(res.posterId).then(user => {
          if (user) setAuthor(user.username);
        });

        getGroup(res.groupId).then(group => {
          if (group) setGroup(group.name);
        });

        getCommentsByThread(res._id).then(comments => {
          if (comments) {
            setComments(comments);
          }
        });
      }
    });
  }, []);

  return (
    <div className={styles.ThreadPage}>
      <div className="TopNav">
        {threadData && (
          <Link href={urls.pages.app.group(threadData.groupId)}>
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
      {threadData && (
        <div className={`Page ${styles.ThreadMain}`}>
          <div className={styles.ThreadInfo}>
            <img
              className={styles.ThreadGroupAvatar}
              src="https://picsum.photos/100/100"
              alt="Group Avatar"
            />
            <h6 className={styles.ThreadGroupName}>{groupName}</h6>
          </div>
          <h2 className={styles.ThreadName}>{threadData.title}</h2>
          <div className={styles.ThreadDetails}>
            <img
              className={styles.ThreadAuthorAvatar}
              src="https://picsum.photos/50/50"
              alt="Group Avatar"
            />
            <div>
              <h5 className={styles.ThreadAuthor}>{author}</h5>
              <h6 className={styles.ThreadDate}>{threadData.postedAt}</h6>
            </div>
          </div>
          <h4 className={styles.ThreadText}>{threadData.content}</h4>
        </div>
      )}

      <div className={styles.ThreadComments}>
        {comments.map(thread => (
          <CommentCard
            key="Thread"
            authorid={thread.poster}
            date={thread.postedAt}
            text={thread.content}
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
  threadid: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Thread;
