import React from "react";
import classes from "./ReportsPage.module.scss";
import AskMeReport from "./AskMeReport";
import GroupReport from "./GroupReport";
import CommentReport from "./CommentReport";

const ReportsPage = ({ currentUser, AskMeThreads, GroupThreads, Comments }) => {
  const askMe = () => {
    console.log(AskMeThreads);
    return AskMeThreads.map((thread) => <AskMeReport Thread={thread} />);
  };

  const group = () => {
    console.log(GroupThreads);
    return GroupThreads.map((thread) => <GroupReport Thread={thread} />);
  };

  const comment = () => {
    console.log(Comments);
    return Comments.map((comment) => <CommentReport Comment={comment} />);
  };

  return (
    <div className={classes.root}>
      <h1>Reports</h1>
      <p>
        These threads and comments have been reported by users and should be
        reviewed to determine whether they violate the rules of the platform.
      </p>
      <h4>Ask Me Threads</h4>
      <div>{askMe()}</div>
      <h4>Group Threads</h4>
      <div>{group()}</div>
      <h4>Comments</h4>
      <div>{comment()}</div>
    </div>
  );
};

export default ReportsPage;
