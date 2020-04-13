import React from "react";
import PropTypes from "prop-types";

// API Calls
import { getThread } from "../../../../client/actions/Thread";
import { getCommentsByThread } from "../../../../client/actions/Comment";
import { getUser } from "../../../../client/actions/User";

// Page Component
import Question from "../../../../client/components/AskMe/Question";

const QuestionPage = ({ data }) => {
  return <Question question={data} />;
};

QuestionPage.getInitialProps = async ({ query }) => {
  const { questionid } = query;

  const data = {
    questionid,
  };

  await getThread(questionid).then(async res => {
    if (res) {
      data.title = res.title;
      data.postedAt = res.postedAt;
      data.content = res.content;

      await getUser(res.posterId).then(user => {
        if (user) {
          data.author = user;
        }
      });

      data.visibility = res.groupId;

      await getCommentsByThread(res._id).then(comments => {
        data.comments = comments || [];
      });
    }
  });

  return {
    data,
  };
};

QuestionPage.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    posterId: PropTypes.string.isRequired,
    visiblity: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionPage;
