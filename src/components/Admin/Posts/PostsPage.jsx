import React from "react";
import classes from "./PostsPage.module.scss";
import AskMeReport from "../Reports/AskMeReport";
import GroupReport from "../Reports/GroupReport";
import CommentReport from "../Reports/CommentReport";

const PostsPage = ({ currentUser, AskMeThreads, GroupThreads, Comments }) => {
  const askMe = () => {
    //console.log(AskMeThreads);
    return AskMeThreads.map((thread) => <AskMeReport Thread={thread} />);
  };

  const group = () => {
    //console.log(GroupThreads);
    return GroupThreads.map((thread) => <GroupReport Thread={thread} />);
  };

  const comment = () => {
    //console.log(Comments);
    return Comments.map((comment) => <CommentReport Comment={comment} />);
  };

  return (
    <div className={classes.root}>
      <h1>Posts</h1>
      <p>
        These posts have been created by users of the platform. Approve or reject them.  
      </p>
    </div>
  );
};

export default PostsPage;
