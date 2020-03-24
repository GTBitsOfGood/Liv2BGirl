import React from "react";

// Styling
import style from "./navbar.module.scss";

const BottomNavBar = () => (
  <div className={style.BottomNav}>
    <div className={style.NavItem}>
      <a href="/app" exact>
        <div className={style.NavButton} />
      </a>
      <p>Home</p>
    </div>
    <div className={style.NavItem}>
      <a href="/app/groups">
        <div className={style.NavButton} />
      </a>
      <p>Group</p>
    </div>
    <div className={style.NavItem}>
      <a href="/app/ask-me">
        <div className={style.NavButton} />
      </a>
      <p>Ask Me</p>
    </div>
    <div className={style.NavItem}>
      <a href="/app/notifications">
        <div className={style.NavButton} />
      </a>
      <p>Notifications</p>
    </div>
  </div>
);

export default BottomNavBar;
