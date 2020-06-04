import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import urls from "../../../utils/urls";
import style from "./navbar.module.scss";

const BottomNavBar = () => {
  const router = useRouter();

  return (
    <div className={style.BottomNav}>
      <Link href={urls.pages.app.home}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath === urls.pages.app.home
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

export default BottomNavBar;
