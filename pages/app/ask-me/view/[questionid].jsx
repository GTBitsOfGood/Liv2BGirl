import React from "react";
import { useRouter } from "next/router";

// Page Component
import QuestionPage from "../../../../client/components/AskQuestion/QuestionPage";

const Question = () => {
  const router = useRouter();
  const { questionid } = router.query;

  return <QuestionPage questionid={questionid} />;
};

export default Question;
