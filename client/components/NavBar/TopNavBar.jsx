import React from "react";
import Link from "next/link";

// Logo/Avatar Assets
import logo from "../../../public/img/logo.png";
import { avatarImg, colorArr } from "../../../utils/avatars";

// Navigation
import urls from "../../../utils/urls";

const TopNavBar = ({ currentUser }) => {
  const userId = currentUser != null ? currentUser.id : null;
  const avatar = currentUser != null ? currentUser.avatar : null;
  const avatarColor = currentUser != null ? currentUser.avatarColor : null;

  return (
    <div className="TopNav">
      {userId != null ? (
        <Link href={urls.pages.app.profile(userId)}>
          <div
            style={{
              backgroundColor: colorArr[avatarColor],
            }}
            className="Avatar"
          >
            <img
              src={avatarImg[avatar]}
              alt="CreateAvatar"
              className="AvatarImg"
            />
          </div>
        </Link>
      ) : (
        <div className="Avatar" />
      )}
      <a href={urls.pages.app.home}>
        <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
      </a>
      <div />
    </div>
  );
};

export default TopNavBar;
