import React from "react";
import logo from "../../../public/img/logo.png";

// Styling
import global from "../components.global.scss";
import styles from "./navbar.module.scss";

const TopNavBar = () => (
  <div className={global.TopNav}>
    <a href="/app/profile">
      <img
        className={styles.Avatar}
        src="https://picsum.photos/200/200"
        alt="Avatar"
      />
    </a>
    <a href="/app/">
      <img className={styles.Logo} src={logo} alt="Liv2BGirl Logo" />
    </a>
    <div />
  </div>
);

export default TopNavBar;