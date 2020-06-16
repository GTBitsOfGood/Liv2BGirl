import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import urls from "../../../utils/urls";
import style from "./BottomNavBar.module.scss";

const BottomNavBar = () => {
  const router = useRouter();

  return (
    <div className={clsx(style.BottomNav, "GlobalBottomNavBar")}>
      <Link href={urls.pages.app.index}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath === urls.pages.app.index
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Home</p>
        </div>
      </Link>

      <Link href={urls.pages.app.groups.index}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath.includes(urls.pages.app.groups.index)
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Groups</p>
        </div>
      </Link>

      <Link href={urls.pages.app.askMe.index}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath.includes(urls.pages.app.askMe.index)
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Ask Me</p>
        </div>
      </Link>
      <Link href={urls.pages.app.notifications.index}>
        <div className={style.NavItem}>
          <div
            className={
              router.asPath === urls.pages.app.notifications.index
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
