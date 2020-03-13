import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "next/link";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";
import { Button } from "reactstrap";
import clsx from "clsx";
import CommentCard from "./CommentCard";
import classes from "./ThreadPage.module.scss";

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
    <div className={classes.threadPage}>
      <div className={classes.threadHeader}>
        <Button
          tag={Link}
          className={classes.threadBtn}
          href={`/app/groups/${groupid}`}
        >
          <Icon
            className={classes.threadBack}
            icon={bxArrowBack}
            width="18px"
          />
        </Button>
        <h1 className={classes.threadLabel}>Thread</h1>
        <Button onClick={() => setSaved(!saved)} className={classes.threadBtn}>
          {saved ? (
            <Icon
              className={classes.threadSave}
              icon={bxsBookmark}
              width="18px"
            />
          ) : (
            <Icon
              className={classes.threadSave}
              icon={bxBookmark}
              width="18px"
            />
          )}
        </Button>
      </div>
      <div className={clsx("page", classes.threadMain)}>
        <div className={classes.threadInfo}>
          <img
            className={classes.threadGroupAvatar}
            src="https://picsum.photos/100/100"
            alt="Group Avatar"
          />
          <h1 className={classes.threadGroupName}>{groupid}</h1>
        </div>
        <h1 className={classes.threadName}>{threadid}</h1>
        <div className={classes.threadDetails}>
          <img
            className={classes.authorAvatar}
            src="https://picsum.photos/50/50"
            alt="Group Avatar"
          />
          <p className={classes.threadAuthor}>{author}</p>
          <p className={classes.threadDate}>{date}</p>
        </div>
        <p className={classes.threadText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className={classes.threadComments}>
        {fakeComments.map(thread => (
          <CommentCard
            key="Thread"
            author={thread.author}
            date={thread.date}
            text={thread.text}
          />
        ))}
      </div>
      <div className={classes.commentFooter}>
        <img
          className={classes.userAvatar}
          src="https://picsum.photos/100/100"
          alt="User Avatar"
        />
        <textarea
          name="comment"
          id="comment"
          placeholder="Comment"
          className={classes.commentInput}
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
