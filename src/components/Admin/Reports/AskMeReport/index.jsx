import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import styles from "../ReportsPage.module.scss";
import Router from "next/router";

const AskMeReport = ({ Thread }) => (
  <Link
    href={urls.pages.app.askMe.questions.view()}
    as={urls.pages.app.askMe.questions.view(Thread._id)}
  >
    <a className={styles.AskMeReport}>
      <div className={styles.ReportHeader}>
        <h3 className={styles.Question}>{`Question: ${Thread.title}`}</h3>
        <button variant="success">Go to Thread to Ignore or Delete</button>
      </div>
    </a>
  </Link>
);

AskMeReport.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AskMeReport;
