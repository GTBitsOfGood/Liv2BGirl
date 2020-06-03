import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import urls from "../../../utils/urls";
import style from "./navbar.module.scss";

const BottomNavBar = ({ currentUser }) => {
  const router = useRouter();

  // Using profile page instead of home page (urls.pages.app.home) until it is designed
  const homePath = urls.pages.app.profile(currentUser._id);

  return (
    <div className={style.BottomNav}>
      <Link href={homePath}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath === homePath
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Home</p>
        </div>
      </Link>

      <Link href={urls.pages.app.groupList}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath.includes(urls.pages.app.groupList)
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Groups</p>
        </div>
      </Link>

      <Link href={urls.pages.app.askMe}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath.includes(urls.pages.app.askMe)
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Ask Me</p>
        </div>
      </Link>
      <Link href={urls.pages.app.notifications}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath === urls.pages.app.notifications
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Notifications</p>
        </div>
      </Link>
    </div>
  );
};

BottomNavBar.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
};

export default BottomNavBar;
