import React from "react";
import PropTypes from "prop-types";

// API Calls
import { getThread } from "../../../../client/actions/AskMe";
import { getCommentsByAskMeThread } from "../../../../client/actions/Comment";
import { getUser } from "../../../../client/actions/User";

// Page Component
import Question from "../../../../client/components/AskMe/Question";

const QuestionPage = ({ data, currentUser }) => {
  return <Question question={data} currentUser={currentUser} />;
};

QuestionPage.getInitialProps = async ({ query }) => {
  const { questionid } = query;

  const data = {
    questionid,
  };

  await getThread(questionid).then(async res => {
    if (res) {
      data.asked = res.title;
      data.postedAt = res.postedAt;
      data.description = res.content;

      await getUser(res.posterId).then(user => {
        if (user) {
          data.author = {
            userId: res.visibility === "Anonymous" ? null : user.id,
            username:
              res.visibility === "Anonymous" ? "Anonymous" : user.username,
            avatar: res.visibility === "Anonymous" ? 1 : user.avatar,
            avatarColor: res.visibility === "Anonymous" ? 1 : user.avatarColor,
          };
        }
      });

      data.visibility = res.groupId;

      await getCommentsByAskMeThread(res._id).then(comments => {
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
    questionid: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userId: PropTypes.string,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }).isRequired,
    visiblity: PropTypes.string.isRequired,
    asked: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
};

QuestionPage.showTopNav = false;
QuestionPage.showBottomNav = false;

export default QuestionPage;
