import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "next/link";

// icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";

// Stylings
import "./ThreadPage.scss";

// Components
import { Button, Input } from "reactstrap";
import CommentCard from "./CommentCard";

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
      <div className="thread-header">
        <Button
          tag={Link}
          className="thread-btn"
          href={`/app/groups/${groupid}`}
        >
          <Icon className="thread-back" icon={bxArrowBack} width="18px" />
        </Button>
        <h1 className="thread-label">Thread</h1>
        <Button onClick={() => setSaved(!saved)} className="thread-btn">
          {saved ? (
            <Icon className="thread-save" icon={bxsBookmark} width="18px" />
          ) : (
            <Icon className="thread-save" icon={bxBookmark} width="18px" />
          )}
        </Button>
      </div>
      <div className="thread-main page">
        <div className="thread-info">
          <img
            className="thread-group-avatar"
            src="https://picsum.photos/100/100"
            alt="Group Avatar"
          />
          <h1 className="thread-group-name">{groupid}</h1>
        </div>
        <h1 className="thread-name">{threadid}</h1>
        <div className="thread-details">
          <img
            className="author-avatar"
            src="https://picsum.photos/50/50"
            alt="Group Avatar"
          />
          <p className="thread-author">{author}</p>
          <p className="thread-date">{date}</p>
        </div>
        <p className="thread-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="thread-comments">
        {fakeComments.map(thread => (
          <CommentCard
            key="Thread"
            author={thread.author}
            date={thread.date}
            text={thread.text}
          />
        ))}
      </div>
      <div className="comment-footer">
        <img
          className="user-avatar"
          src="https://picsum.photos/100/100"
          alt="User Avatar"
        />
        <Input
          type="text"
          name="comment"
          id="comment"
          placeholder="Comment"
          className="comment-input"
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
