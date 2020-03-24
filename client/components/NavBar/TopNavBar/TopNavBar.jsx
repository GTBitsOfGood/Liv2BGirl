import React from "react";
import logo from "../../../../public/img/logo.png";

// Styling
import global from "../../components.global.scss";
import styles from "../navbar.module.scss";

const TopNavBar = () => (
  <div className={global.TopNav}>
    <a href="/app/profile">
      <img
        className="navbar-avatar"
        src="https://picsum.photos/200/200"
        alt="Avatar"
      />
    </a>
    <a href="/app/">
      <img className="navbar-logo" src={logo} alt="Liv2BGirl Logo" />
    </a>
    <div />
  </div>
);

export default TopNavBar;
