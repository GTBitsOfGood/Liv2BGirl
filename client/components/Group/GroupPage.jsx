import React, { useState } from "react";
import PropTypes from "prop-types";

// Stylings
import "./GroupPage.scss";

// Icons
import { Icon } from "@iconify/react";
import commentPlusOutline from "@iconify/icons-mdi/comment-plus-outline";

// Components
import { Button, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import GroupPost from "./GroupPost";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortedBy, setSortedBy] = useState("latest comment");

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <div className="group-header">
        <img
          className="group-avatar"
          src="https://picsum.photos/100/100"
          alt="Group Avatar"
        />
        <div className="group-title">
          <h2 className="group-name">{groupid}</h2>
          <h3 className="group-description">Description</h3>
        </div>
        <Button className="group-join">Join</Button>
      </div>
      <div className="group-content">
        <div className="group-row-1">
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
          <Icon className="add-post" width="1.5rem" icon={commentPlusOutline} />
        </div>
        {fakeThreads.map(thread => (
          <GroupPost
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
