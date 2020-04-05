import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import commentPlusOutline from "@iconify/icons-mdi/comment-plus-outline";

// API Call
import { followGroup, unfollowGroup } from "../../actions/api";

// Components
import ThreadPost from "./Thread/ThreadPost";

// Logo for Header
import logo from "../../../public/img/logo.png";

// Stylings
import styles from "./group.module.scss";
import urls from "../../../utils/urls";

const fakeThreads = [
  {
    title: "Test 1",
    summary:
      "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    username: "CrazyPurpleFox",
    comments: 12,
  },
  {
    title: "Test 2",
    summary:
      "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    username: "HappyBlueTurtle",
    comments: 24,
  },
  {
    title: "Test 3",
    summary:
      "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    username: "SadRedElephant",
    comments: 0,
  },
  {
    title: "Test 4",
    summary:
      "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    username: "GrossWhiteCat",
    comments: 3,
  },
  {
    title: "Test 5",
    summary:
      "5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    username: "AngryGrayLion",
    comments: 189,
  },
  {
    title: "Test 6",
    summary:
      "6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    username: "HappyGreenDog",
    comments: 72,
  },
];

const GroupPage = props => {
  const { groupid } = props;
  const [joined, setJoined] = useState(false);
  const [sortedBy, setSortedBy] = useState("latest comment");

  const groupAction = () => {
    const userid = "123456789";

    if (joined) {
      followGroup(groupid, userid);
      setJoined(false);
    } else {
      unfollowGroup(groupid, userid);
      setJoined(true);
    }
  };

  return (
    <>
      <div className={styles.TopNav}>
        <Link href={urls.pages.app.groupList}>
          <Icon className={styles.Back} icon={bxArrowBack} width="18px" />
        </Link>
        <img className={styles.Logo} src={logo} alt="Liv2BGirl Logo" />
        <div />
      </div>
      <div className={styles.GroupHeader}>
        <img
          className={styles.GroupAvatar}
          src="https://picsum.photos/100/100"
          alt="Group Avatar"
        />
        <div className={styles.GroupInfo}>
          <h3 className={styles.GroupName}>{groupid}</h3>
          <h4 className={styles.GroupDescription}>Description</h4>
        </div>
        <button
          type="button"
          className={styles.GroupJoin}
          onClick={groupAction}
        >
          {joined ? "Leave" : "Join"}
        </button>
      </div>
      <div className="Page">
        <div className={styles.GroupTopBar}>
          <h6>Sort by </h6>
          <select
            className={styles.GroupSelect}
            onClick={event => setSortedBy(event.target.value)}
          >
            <option>latest comment</option>
            <option>latest post</option>
          </select>

          <button type="button" className={styles.CreateBtn} disabled={!joined}>
            <Link href={urls.pages.app.createThread(groupid)}>
              <Icon
                className={styles.AddPost}
                width="15px"
                icon={commentPlusOutline}
              />
            </Link>
          </button>
        </div>
        {fakeThreads.map(thread => (
          <ThreadPost
            key="Thread"
            title={thread.title}
            summary={thread.summary}
            author={thread.username}
            comments={thread.comments}
          />
        ))}
      </div>
    </>
  );
};

GroupPage.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default GroupPage;
