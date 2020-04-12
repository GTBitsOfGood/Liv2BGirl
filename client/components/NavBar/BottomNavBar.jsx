import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Styling
import style from "./navbar.module.scss";

const BottomNavBar = () => {
  const router = useRouter();

  return (
    <div className={style.BottomNav}>
      <Link href="/app">
        <div className={style.NavItem}>
          <div
            className={
              router.asPath === "/app"
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Home</p>
        </div>
      </Link>

      <Link href="/app/groups">
        <div className={style.NavItem}>
          <div
            className={
              router.asPath.includes("/app/groups")
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Group</p>
        </div>
      </Link>

      <Link href="/app/ask-me">
        <div className={style.NavItem}>
          <div
            className={
              router.asPath.includes("/app/ask-me")
                ? `${style.NavButton} ${style.ActiveItem}`
                : style.NavButton
            }
          />
          <p>Ask Me</p>
        </div>
      </Link>

      <Link href="/app/notifications">
        <div className={style.NavItem}>
          <div
            className={
              router.asPath === "/app/notifications"
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
