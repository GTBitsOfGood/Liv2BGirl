import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "next/link";

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
import { avatarImg, colorArr } from "../../../../utils/avatars";
import styles from "./thread.module.scss";

// Navigation
import urls from "../../../../utils/urls";

const Thread = ({ currentUser, thread }) => {
  const {
    threadid,
    author,
    groupName,
    title,
    postedAt,
    content,
    comments,
  } = thread;
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const { id, username, avatar, avatarColor } = author;

  const postComment = () => {
    if (comment.length > 0) {
      createComment(currentUser.id, threadid, comment).then(res => {
        if (res) {
          window.location.reload();
        }
      });
    }
  };

  const setReply = value => {
    setComment(value);
  };

  return (
    <div className={styles.ThreadPage}>
      <div className="TopNav">
        {thread && (
          <div
            role="button"
            tabIndex={-1}
            onClick={() => Router.back()}
            onKeyDown={() => Router.back()}
          >
            <Icon className="Back" icon={bxArrowBack} width="18px" />
          </div>
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
            <div
              className={styles.ThreadAuthorAvatar}
              style={{
                backgroundColor: colorArr[avatarColor],
              }}
            >
              <img
                className={styles.AuthorAvatarImg}
                src={avatarImg[avatar]}
                alt="Author Avatar"
              />
            </div>
            <div>
              <Link href={urls.pages.app.profile(id)}>
                <div>
                  <h5 className={styles.ThreadAuthor}>{username}</h5>
                </div>
              </Link>

              <h6 className={styles.ThreadDate}>
                {new Date(postedAt).toLocaleString()}
              </h6>
            </div>
          </div>
          <h4 className={styles.ThreadText}>{content}</h4>
        </div>
      )}

      <div className={styles.ThreadComments}>
        {comments.map(item => (
          <CommentCard
            key={item._id}
            author={item.author}
            date={item.postedAt}
            text={item.content}
            setReply={setReply}
          />
        ))}
      </div>

      <div className={styles.CommentFooter}>
        <div className={styles.Footer1}>
          <div
            className={`${styles.ThreadAuthorAvatar} ${styles.UserAvatar}`}
            style={{
              backgroundColor: colorArr[currentUser.avatarColor],
            }}
          >
            <img
              className={styles.AuthorAvatarImg}
              src={avatarImg[currentUser.avatar]}
              alt="Author Avatar"
            />
          </div>
          <textarea
            className={styles.CommentInput}
            placeholder="Comment"
            onChange={event => setComment(event.target.value)}
            value={comment}
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
  thread: PropTypes.shape({
    threadid: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }).isRequired,
    groupId: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
};

export default Thread;
