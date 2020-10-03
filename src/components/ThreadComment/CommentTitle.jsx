import React from "react";
import { editComment } from "../../actions/Comment";
import DetailedTextField from "../DetailedTextField";
import Button from "../DetailedTextField/components/Button";
import Router from "next/router";
const CommentTitle = ({ isChanging, comment }) => {
  const [newTitle, setTitle] = React.useState("");
  if (isChanging) {
    return (
      <div>
        <input onChange={(e) => setTitle(e.target.value)} />
        <Button
          onClick={() => {
            var obj = JSON.parse(comment.content);
            obj[0]["children"][0]["text"] = newTitle;
            var content = JSON.stringify(obj);
            editComment(null, comment._id, content);
            isChanging = false;
            Router.reload();
          }}
        >
          Change
        </Button>
      </div>
    );
  } else {
    return (
      <DetailedTextField
        readOnly={true}
        textNodes={
          comment.content != null && comment.content.length > 0
            ? JSON.parse(comment.content)
            : null
        }
      />
    );
  }
};

export default CommentTitle;
