import React from "react";

// Styling
import styles from "../navbar.module.scss";

const BottomNavBar = () => (
  <div className="bottom-nav">
    <li>
      <a href="/app" exact>
        <div className="navbar-button" />
      </a>
      <p>Home</p>
    </li>
    <li>
      <a href="/app/groups">
        <div className="navbar-button" />
      </a>
      <p>Group</p>
    </li>
    <li>
      <a href="/app/ask-me">
        <div className="navbar-button" />
      </a>
      <p>Ask Me</p>
    </li>
    <li>
      <a href="/app/notifications">
        <div className="navbar-button" />
      </a>
      <p>Notifications</p>
    </li>
  </div>
);

export default BottomNavBar;
