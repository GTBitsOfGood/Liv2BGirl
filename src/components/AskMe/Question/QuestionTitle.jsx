import React from "react";
import { editThread } from "../../../actions/AskMeThread";
import Router from "next/router";
import Button from "../../DetailedTextField/components/Button";
const QuestionTitle = ({ isChanging, thread_id, thread_name }) => {
  const [newTitle, setTitle] = React.useState("");
  if (isChanging) {
    return (
      <div>
        <input onChange={(e) => setTitle(e.target.value)} />
        <Button
          onClick={() => {
            editThread(null, thread_id, newTitle);
            isChanging = false;
            Router.reload();
          }}
        >
          Submit
        </Button>
      </div>
    );
  } else {
    return <h3>{`Question: ${thread_name}`}</h3>;
  }
};

export default QuestionTitle;
