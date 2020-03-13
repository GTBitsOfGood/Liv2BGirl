import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "next/link";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import commentPlusOutline from "@iconify/icons-mdi/comment-plus-outline";
import { Button, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import ThreadPost from "./ThreadPost";
import logo from "../../../public/img/logo.png";
import classes from "./GroupPage.module.scss";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortedBy, setSortedBy] = useState("latest comment");

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <div className={classes.groupPgHeader}>
        <Button tag={Link} className={classes.groupBack} href="/app/groups/">
          <Icon className="back-group" icon={bxArrowBack} width="18px" />
        </Button>
        <img className={classes.navbarLogo} src={logo} alt="Liv2BGirl Logo" />
        <div />
      </div>
      <div className={classes.groupHeader}>
        <img
          className={classes.groupAvatar}
          src="https://picsum.photos/100/100"
          alt="Group Avatar"
        />
        <div className={classes.groupTitle}>
          <h2 className={classes.groupName}>{groupid}</h2>
          <h3 className={classes.groupDescription}>Description</h3>
        </div>
        <Button
          className={classes.groupJoin}
          onClick={() => setJoined(!joined)}
        >
          {joined ? "Leave" : "Join"}
        </Button>
      </div>
      <div className="page">
        <div className={classes.groupRow1}>
          <p>Sort by </p>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
              caret
            >
              {sortedBy}
            </DropdownToggle>
            <DropdownMenu>
              <div
                onClick={() => setSortedBy("latest comment")}
                onKeyDown={() => setSortedBy("latest comment")}
                role="button"
                tabIndex="0"
              >
                latest comment
              </div>
              <div
                onClick={() => setSortedBy("latest post")}
                onKeyDown={() => setSortedBy("latest post")}
                role="button"
                tabIndex="0"
              >
                latest post
              </div>
            </DropdownMenu>
          </Dropdown>

          <Button
            tag={Link}
            className={classes.createThreadBtn}
            href={`/app/groups/${groupid}/create-thread`}
            disabled={!joined}
          >
            <Icon
              className={classes.addPost}
              width="1.5rem"
              icon={commentPlusOutline}
            />
          </Button>
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
    </div>
  );
};

GroupPage.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default GroupPage;
