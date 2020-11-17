import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import urls from "../../../utils/urls";
import style from "./BottomNavBar.module.scss";
import home from "../../../public/static/img/home.png";
import groups from "../../../public/static/img/groups.png";
import bell from "../../../public/static/img/bell.png";

const BottomNavBar = () => {
  const router = useRouter();

  return (
    <div className={clsx(style.BottomNav, "GlobalBottomNavBar")}>
      <Link href={urls.pages.app.index}>
        <div className={style.NavItem}>
          <img src={home} alt="home" />
          <br></br>
          <div
            className={
              router.asPath === urls.pages.app.index
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
        </div>
      </Link>

      <Link href={urls.pages.app.groups.index}>
        <div className={style.NavItem}>
          <img src={groups} alt="groups" />
          <br></br>
          <div
            className={
              router.asPath.includes(urls.pages.app.groups.index)
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
        </div>
      </Link>
      <Link href={urls.pages.app.askMe.index}>
        <div className={style.NavItem}>
          <p>Post</p>
          <br></br>
          <div
            className={
              router.asPath.includes(urls.pages.app.askMe.index)
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
        </div>
      </Link>
      <Link href={urls.pages.app.askMe.index}>
        <div className={style.NavItem}>
          <p>Ask Me</p>
          <br></br>
          <div
            className={
              router.asPath.includes(urls.pages.app.askMe.index)
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
        </div>
      </Link>
      <Link href={urls.pages.app.notifications.index}>
        <div className={style.NavItem}>
          <img src={bell} alt="notifications" />
          <br></br>
          <div
            className={
              router.asPath === urls.pages.app.notifications.index
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
        </div>
      </Link>
    </div>
  );
};

export default BottomNavBar;
