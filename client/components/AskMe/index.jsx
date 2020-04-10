import React, { useState } from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxSearch from "@iconify/icons-bx/bx-search";

// Styling
import classes from "./askme.module.scss";
import QuestionCard from "./QuestionCard";

const fakeQuestion = {
  id: 1,
  asked: "Lorem ipsum dolor sit amet, consectetur?",
  comments: 3,
  postDate: 1,
  answeredDate: null,
  ambassador: {},
  answer: "",
};

const fakeQuestion2 = {
  id: 2,
  asked: "Lorem ipsum dolor sit amet, consectetur?",
  comments: 100,
  postDate: 1,
  answeredDate: 4,
  ambassador: {
    name: "ambassador",
  },
  answer:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
};

const AskMe = () => {
  const [curTab, setTab] = useState(0);

  const featured = [
    fakeQuestion2,
    fakeQuestion2,
    fakeQuestion2,
    fakeQuestion2,
    fakeQuestion2,
  ];

  const myQuestions = [
    fakeQuestion,
    fakeQuestion2,
    fakeQuestion,
    fakeQuestion2,
    fakeQuestion2,
  ];

  const bookmarks = [fakeQuestion2, fakeQuestion2];

  const askTab = () => {
    if (curTab === 0) {
      return featured.map(question => <QuestionCard question={question} />);
    }
    if (curTab === 1) {
      return myQuestions.map(question => <QuestionCard question={question} />);
    }
    return bookmarks.map(question => <QuestionCard question={question} />);
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
        <div className={classes.SelectedPage}>{askTab()}</div>
      </div>
    </>
  );
};

export default AskMe;
