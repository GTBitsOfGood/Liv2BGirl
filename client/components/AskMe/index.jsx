import React, { useState } from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxSearch from "@iconify/icons-bx/bx-search";

// Styling
import styles from "./askme.module.scss";
import QuestionCard from "./QuestionCard";

// Navigation
import urls from "../../../utils/urls";

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
      <div className={styles.AskPage}>
        <div className={styles.TopHead}>
          <Link href={urls.pages.app.askquestion}>
            <button type="button" className={styles.AskBtn}>
              Ask Question
            </button>
          </Link>
          <div className={styles.SearchBar}>
            <input type="text" placeholder="Search for questions" />
            <Icon icon={bxSearch} />
          </div>
        </div>
        <div className={styles.SecondHead}>
          <button
            type="button"
            className={styles.NavBtn}
            onClick={() => setTab(0)}
          >
            <h6 className={curTab === 0 ? styles.SelectedNav : styles.NavItem}>
              Featured
            </h6>
          </button>

          <button
            type="button"
            className={styles.NavBtn}
            onClick={() => setTab(1)}
          >
            <h6 className={curTab === 1 ? styles.SelectedNav : styles.NavItem}>
              My Questions
            </h6>
          </button>

          <button
            type="button"
            className={styles.NavBtn}
            onClick={() => setTab(2)}
          >
            <h6 className={curTab === 2 ? styles.SelectedNav : styles.NavItem}>
              Bookmark
            </h6>
          </button>
        </div>
        <div className={styles.SelectedPage}>{askTab()}</div>
      </div>
    </>
  );
};

export default AskMe;
