import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import styles from "../ReportsPage.module.scss";
//import { unreportThread } from "../../../../actions/AskMeThread.js";

const GroupReport = ( {Thread} ) => (
  <Link
    href={urls.pages.app.askMe.questions.view()}
    as={urls.pages.app.askMe.questions.view(Thread._id)}
  >
    <a className={styles.AskMeReport}>
      <div className={styles.ReportHeader}>
        <h3 className={styles.Question}>{`Question: ${Thread.title}`}</h3>
        <button variant="success">
          Approve
        </button>
      </div>
    </a>
  </Link>
);

//return bookmarks.map((question) => (
// <QuestionCard key={question._id} question={question} />
// ));

GroupReport.propTypes = {
  Thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupReport;
