import React, { useState } from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxSearch from "@iconify/icons-bx/bx-search";

// Styling
import classes from "./askme.module.scss";

const AskMe = () => {
  const [curTab, setTab] = useState(0);

  const askTab = () => {
    if (curTab === 0) {
      return <p>Ok</p>;
    }
    if (curTab === 1) {
      return <p>Ok 2</p>;
    }
    return <p>Ok 3</p>;
  };

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
          <button
            type="button"
            className={classes.NavBtn}
            onClick={() => setTab(0)}
          >
            <h6
              className={curTab === 0 ? classes.SelectedNav : classes.NavItem}
            >
              Featured
            </h6>
          </button>

          <button
            type="button"
            className={classes.NavBtn}
            onClick={() => setTab(1)}
          >
            <h6
              className={curTab === 1 ? classes.SelectedNav : classes.NavItem}
            >
              My Questions
            </h6>
          </button>

          <button
            type="button"
            className={classes.NavBtn}
            onClick={() => setTab(2)}
          >
            <h6
              className={curTab === 2 ? classes.SelectedNav : classes.NavItem}
            >
              Bookmark
            </h6>
          </button>
        </div>
        <div className="Page">{askTab()}</div>
      </div>
    </>
  );
};

export default AskMe;
