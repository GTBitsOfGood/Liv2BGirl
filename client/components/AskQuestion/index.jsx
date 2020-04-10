import React from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxSearch from "@iconify/icons-bx/bx-search";

// Styling
import classes from "./askme.module.scss";

const AskMe = () => {
  return (
    <>
      <div className="TopNav">
        <div className="Avatar" />
        <h3>Ask Me</h3>
        <div />
      </div>
      <div className={classes.AskPage}>
        <div className={classes.TopHead}>
          <Link href="/app/ask-me/new">
            <button type="button" className={classes.AskBtn}>
              Ask Question
            </button>
          </Link>
          <div className={classes.SearchBar}>
            <input type="text" placeholder="Search for questions" />
            <Icon icon={bxSearch} />
          </div>
        </div>
        <div className={classes.SecondHead}>
          <h6 className={classes.NavBtn}>Featured</h6>
          <h6 className={classes.NavBtn}>My Questions</h6>
          <h6 className={classes.NavBtn}>Bookmark</h6>
        </div>
        <div className="Page">Test</div>
      </div>
    </>
  );
};

export default AskMe;
