import React from "react";

// Styling
import "./GroupPage.scss";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";

const GroupThread = () => {
  return (
    <div className="group-thread">
      <div style={{ display: "flex" }}>
        <h1 className="thread-title">Thread Title</h1>
        <h2 className="thread-time">5h</h2>
      </div>

      <h2 className="thread-summary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </h2>
      <div className="thread-details">
        <img
          className="author-avatar"
          src="https://picsum.photos/50/50"
          alt="Group Avatar"
        />
        <p className="thread-author">username</p>
        <div className="thread-comments">
          <Icon icon={bxCommentDetail} />
          <p>100</p>
        </div>
      </div>
    </div>
  );
};

export default GroupThread;
