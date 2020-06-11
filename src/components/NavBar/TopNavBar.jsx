import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import logo from "../../../public/static/img/logo.png";
import { avatarImg, colorArr } from "../../../utils/avatars";
import urls from "../../../utils/urls";

const TopNavBar = ({ currentUser }) => (
  <div className="TopNav">
    <Link href={urls.pages.app.profile(currentUser._id)}>
      <div
        style={{
          backgroundColor: colorArr[currentUser.avatarColor],
        }}
        className="Avatar"
      >
        <img
          src={avatarImg[currentUser.avatar]}
          alt="CreateAvatar"
          className="AvatarImg"
        />
      </div>
    </Link>
    <a href={urls.pages.app.home}>
      <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
    </a>
    <div />
  </div>
);

TopNavBar.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
};

export default TopNavBar;
