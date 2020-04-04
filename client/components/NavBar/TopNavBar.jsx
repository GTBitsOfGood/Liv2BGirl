import React from "react";
import logo from "../../../public/img/logo.png";
import style from "./navbar.module.scss";

const TopNavBar = () => (
  <div className={style.TopNav}>
    <a href="/app/profile">
      <img
        className={style.Avatar}
        src="https://picsum.photos/200/200"
        alt="Avatar"
      />
    </a>
    <a href="/app/">
      <img className={style.Logo} src={logo} alt="Liv2BGirl Logo" />
    </a>
    <div />
  </div>
);

export default TopNavBar;
