import React from "react";
import PropTypes from "prop-types";

// API Calls
import { getCurrentUser } from "../../../client/actions/User";
import { getUserQuestions } from "../../../client/actions/Thread";

// Page Component
import AskMe from "../../../client/components/AskMe";

const AskMePage = ({ ownQuestions }) => {
  return <AskMe ownQuestions={ownQuestions} />;
};

AskMePage.getInitialProps = async ({ req }) => {
  const props = {};

  const cookies = req ? req.headers.cookie : null;

  await getCurrentUser(cookies).then(async user => {
    props.ownQuestions = await getUserQuestions(user.id);
  });

  return props;
};

AskMePage.propTypes = {
  ownQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      posterId: PropTypes.string.isRequired,
      groupId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
      numComments: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default AskMePage;
