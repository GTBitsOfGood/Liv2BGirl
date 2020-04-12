import React from "react";
import { useRouter } from "next/router";

// Page Component
import Question from "../../../../client/components/AskMe/Question";

const QuestionPage = () => {
  const router = useRouter();
  const { questionid } = router.query;

  const fakeQuestion = {
    id: 2,
    author: "username",
    asked: "Lorem ipsum dolor sit amet, consectetur?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",

    comments: 100,
    postDate: "00-00-0000",
    answeredDate: "00-00-0001",
    ambassador: {
      name: "ambassador name",
    },
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  return <Question questionid={questionid} question={fakeQuestion} />;
};

export default QuestionPage;
