import React from "react";
import ErrorPage from "../../_error";
import { getCurrentUser } from "../../../actions/User";
import ReportsPage from "../../../components/Admin/Reports";
import PropTypes from "prop-types";
import { getReportedThreads } from "../../../actions/AskMeThread";
import { getReportedGroupThreads } from "../../../actions/GroupThread";
import { getReportedComments } from "../../../actions/Comment";
import urls from "../../../../utils/urls";
import Router from "next/router";

const Reports = ({ error, currentUser, amt, gt, comms }) => {
  console.log(currentUser);

  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <ReportsPage
      currentUser={currentUser}
      AskMeThreads={amt}
      GroupThreads={gt}
      Comments={comms}
    />
  );
};

Reports.getInitialProps = async ({ req, res }) => {
  const cookies = req ? req.headers.cookie : null;
  console.log(cookies);
  try {
    const amt = await getReportedThreads(cookies);
    const gt = await getReportedGroupThreads(cookies);
    const comms = await getReportedComments(cookies);
    const currentUser = await getCurrentUser(cookies).catch(() => null);

    console.log(currentUser);

    return {
      amt,
      gt,
      comms,
      currentUser,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

const QuestionType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
}).isRequired;

Reports.propTypes = {
  error: PropTypes.string,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  featuredQuestions: PropTypes.arrayOf(QuestionType),
  ownQuestions: PropTypes.arrayOf(QuestionType),
  bookmarks: PropTypes.arrayOf(QuestionType),
};

Reports.defaultProps = {
  error: null,
  featuredQuestions: null,
  ownQuestions: null,
  bookmarks: null,
};

Reports.showTopNav = true;
Reports.showBottomNav = true;

export default Reports;
