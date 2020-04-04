import React from "react";
import logo from "../../../public/img/logo.png";

const TopNavBar = () => (
  <div className="TopNav">
    <a href="/app/profile">
      <img
        className="Avatar"
        src="https://picsum.photos/200/200"
        alt="Avatar"
      />
    </a>
    <a href="/app/">
      <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
    </a>
    <div />
  </div>
);

export default TopNavBar;
