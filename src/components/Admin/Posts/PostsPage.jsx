import React from "react";
import classes from "./PostsPage.module.scss";
import Post from "../../Post";

const PostsPage = ({ Posts }) => {
  const post = () => {
    //console.log(AskMeThreads);
    return Posts.map((post) => <Post post={post} />);
  };

  return (
    <div className={classes.root}>
      <h1>Posts</h1>
      <p>
        These posts have been created by users of the platform. Approve or reject them.  
      </p>
      <div>
        {post()}
      </div>
    </div>
  );
};

export default PostsPage;
