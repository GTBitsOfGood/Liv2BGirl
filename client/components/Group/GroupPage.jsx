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
        <GroupPost />
        <GroupPost />
        <GroupPost />
        <GroupPost />
        <GroupPost />
      </div>
    </div>
  );
};

GroupPage.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default GroupPage;
