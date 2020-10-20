import React from "react";
import ErrorPage from "../../_error";
import { getCurrentUser } from "../../../actions/User";
import ReportsPage from "../../../components/Admin/Reports";
import PropTypes from "prop-types";
import {getReportedThreads} from "../../../actions/AskMeThread";

const Reports = ({
    error,
    currentUser,
    amt, 
    gt, 
    comms,
  }) => {
    if (error) {
      console.error("error", error);
  
      return (
        <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
      );
    }
  
    return (
      <ReportsPage
        AskMeThreads={amt}
        GroupThreads={gt}
        Comments={comms}
      />
    );
  };
  
Reports.getInitialProps = async ({ req }) => {
    const cookies = req ? req.headers.cookie : null;
    console.log(cookies);
    try {
      const amt = await getReportedThreads(cookies);
      const gt = await getReportedThreads(cookies);
      const comms = await getReportedThreads(cookies);
      const currentUser = await getCurrentUser(cookies).catch(() => null);

      console.log(currentUser);

      if (currentUser != null) {
        if (res) {
          res.writeHead(302, {
            Location: urls.pages.app.index,
          });
          res.end();
        } else {
          await Router.push(urls.pages.app.index);
        }
      }
  
      return {
        amt,
        gt,
        comms,
        currentUser
      };
    } catch (error) {
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