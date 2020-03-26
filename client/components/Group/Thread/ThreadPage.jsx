import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";

// Components
import CommentCard from "./CommentCard";

// Stylings
import global from "../../components.global.scss";
import styles from "./thread.module.scss";

const fakeComments = [
  {
    author: "CrazyPurpleFox",
    date: "00-00-0000 00:00",
    text:
      "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    author: "SadBlueElephant",
    date: "00-00-0000 00:00",
    text:
      "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    author: "HappyGreenBear",
    date: "00-00-0000 00:00",
    text:
      "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const ThreadPage = props => {
  const { threadid, author, date, groupid } = props;
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="thread-page">
      <div className={global.TopNav}>
        <Link className={global.Back} href={`/app/groups/${groupid}`}>
          <Icon icon={bxArrowBack} width="18px" />
        </Link>
        <h3 className={styles.ThreadNavTitle}>Thread</h3>
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className={global.IconButton}
        >
          {saved ? (
            <Icon icon={bxsBookmark} height="18px" />
          ) : (
            <Icon icon={bxBookmark} height="18px" />
          )}
        </button>
      </div>
      <div className={`${global.Page} ${styles.ThreadPage}`}>
        <div className={styles.ThreadInfo}>
          <img
            className={styles.ThreadGroupAvatar}
            src="https://picsum.photos/100/100"
            alt="Group Avatar"
          />
          <h1 className={styles.ThreadGroupName}>{groupid}</h1>
        </div>
        <h1 className={styles.ThreadName}>{threadid}</h1>
        <div className={styles.ThreadDetails}>
          <img
            className={styles.ThreadAuthorAvatar}
            src="https://picsum.photos/50/50"
            alt="Group Avatar"
          />
          <p className={styles.ThreadAuthor}>{author}</p>
          <p className={styles.ThreadDate}>{date}</p>
        </div>
        <p className={styles.ThreadText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className={styles.ThreadComments}>
        {fakeComments.map(thread => (
          <CommentCard
            key="Thread"
            author={thread.author}
            date={thread.date}
            text={thread.text}
          />
        ))}
      </div>
      <div className={styles.CommentFooter}>
        <img
          className={styles.UserAvatar}
          src="https://picsum.photos/100/100"
          alt="User Avatar"
        />
        <textarea
          type="text"
          name="comment"
          id="comment"
          placeholder="Comment"
          className={styles.CommentInput}
          onChange={event => {
            const { value } = event.target;

            setComment(value);
          }}
        />
      </div>
    </div>
  );
};

ThreadPage.propTypes = {
  threadid: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  groupid: PropTypes.string.isRequired,
};

export default ThreadPage;
