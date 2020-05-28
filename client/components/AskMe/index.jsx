import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxSearch from "@iconify/icons-bx/bx-search";

// Styling
import styles from "./askme.module.scss";
import QuestionCard from "./QuestionCard";

// Navigation
import urls from "../../../utils/urls";

const AskMe = ({ loggedIn, featuredQuestions, ownQuestions, bookmarks }) => {
  const [curTab, setTab] = useState(0);

  const askTab = () => {
    if (curTab === 0) {
      return featuredQuestions.map(question => (
        <QuestionCard key={question._id} question={question} />
      ));
    }

    if (curTab === 1) {
      return ownQuestions.map(question => (
        <QuestionCard key={question._id} question={question} />
      ));
    }

    return bookmarks.map(question => (
      <QuestionCard key={question._id} question={question} />
    ));
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
          <Link href={urls.pages.app.askQuestion}>
            <button type="button" className={styles.AskBtn}>
              Ask Question
            </button>
          </Link>
          <div className={styles.SearchBar}>
            <input type="text" placeholder="Search for questions" />
            <Icon icon={bxSearch} />
          </div>
        </div>
        {loggedIn && (
          <div className={styles.SecondHead}>
            <button
              type="button"
              className={styles.NavBtn}
              onClick={() => setTab(0)}
            >
              <h6
                className={curTab === 0 ? styles.SelectedNav : styles.NavItem}
              >
                Featured
              </h6>
            </button>

            <button
              type="button"
              className={styles.NavBtn}
              onClick={() => setTab(1)}
              disabled={ownQuestions == null}
            >
              <h6
                className={curTab === 1 ? styles.SelectedNav : styles.NavItem}
              >
                My Questions
              </h6>
            </button>

            <button
              type="button"
              className={styles.NavBtn}
              onClick={() => setTab(2)}
            >
              <h6
                className={curTab === 2 ? styles.SelectedNav : styles.NavItem}
              >
                Bookmarks
              </h6>
            </button>
          </div>
        )}
        <div className={styles.SelectedPage}>{askTab()}</div>
      </div>
    </>
  );
};

const QuestionType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  posterId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
}).isRequired;

AskMe.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  featuredQuestions: PropTypes.arrayOf(QuestionType).isRequired,
  ownQuestions: PropTypes.arrayOf(QuestionType).isRequired,
  bookmarks: PropTypes.arrayOf(QuestionType).isRequired,
};

export default AskMe;