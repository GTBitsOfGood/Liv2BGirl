import React from "react";
import { editThread } from "../../../actions/AskMeThread";
import Router from "next/router";
import Button from "../../DetailedTextField/components/Button";
const QuestionTitle = ({ isChanging, thread_id, thread_name }) => {
  const [newTitle, setTitle] = React.useState(thread_name);
  console.log(thread_name);

  if (isChanging) {
    return (
      <div>
        <input value={newTitle} onChange={(e) => setTitle(e.target.value)} />
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
