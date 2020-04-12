import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import commentPlusOutline from "@iconify/icons-mdi/comment-plus-outline";
import dotsHorizontal from "@iconify/icons-mdi/dots-horizontal";
import accountCircleOutline from "@iconify/icons-mdi/account-circle-outline";

// API Call
import { followGroup, unfollowGroup } from "../../../actions/User";

// Components
import ThreadPost from "../Thread/Post";
import AdminTab from "./AdminTab";

// Logo for Header
import logo from "../../../../public/img/logo.png";

// Stylings
import styles from "./viewgroup.module.scss";

// Navigation
import urls from "../../../../utils/urls";

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

const user = {
  id: "1234567",
  role: "Ambassador",
};

const ViewGroup = props => {
  const { groupid } = props;
  const [joined, setJoined] = useState(false);
  const [sortedBy, setSortedBy] = useState("latest comment");
  const [adminTab, setAdminTab] = useState(false);

  const groupAction = () => {
    if (joined) {
      followGroup(groupid, user.id);
      setJoined(false);
    } else {
      unfollowGroup(groupid, user.id);
      setJoined(true);
    }
  };

  const toggle = () => {
    setAdminTab(!adminTab);
  };

  return (
    <>
      {adminTab && <AdminTab onClick={toggle} />}
      <div className="TopNav">
        <Link href={urls.pages.app.groupList}>
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </Link>
        <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
        {// user.id == groupid.author ||
        user.role === "Ambassador" || user.role === "Moderator" ? (
          <Icon className="Icon" icon={dotsHorizontal} width="18px" />
        ) : (
          <div />
        )}
      </div>
      <div className={styles.GroupHeader}>
        <img
          className={styles.GroupAvatar}
          src="https://picsum.photos/100/100"
          alt="Group Avatar"
        />
        {// user.id == groupid.author ||
        user.role === "Ambassador" || user.role === "Moderator" ? (
          <Icon
            className={styles.AdminIcon}
            icon={accountCircleOutline}
            width="15px"
          />
        ) : (
          <div />
        )}

        <div className={styles.GroupInfo}>
          <h3 className={styles.GroupName}>{groupid}</h3>
          <h4 className={styles.GroupDescription}>Description</h4>
        </div>
        {user.role === "Ambassador" || user.role === "Moderator" ? (
          <button
            type="button"
            className={styles.GroupEdit}
            onClick={() => toggle()}
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            className={styles.GroupJoin}
            onClick={groupAction}
          >
            {joined ? "Leave" : "Join"}
          </button>
        )}
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
            <Link href={`/app/groups/${groupid}/new-thread`}>
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

ViewGroup.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default ViewGroup;
