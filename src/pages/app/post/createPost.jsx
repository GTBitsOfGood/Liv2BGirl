import React from "react";
import { createPost } from "../../../actions/Post";

const PostPage = (currentUser) => {
  const [content, setContent] = React.useState("");

  const getText = (event) => {
    setContent(event.target.value);
  };

  const createPostHelper = (currentUser) => {
    createPost(currentUser, content);
  };

  return (
    <>
      <h1>Create a Post!</h1>
      <body>
        <h2>Insert the contents of what you would like to post here!</h2>
        <input onChange={getText} placeholder="Enter text here..."></input>
        <button onClick={() => createPostHelper(currentUser)}>Post</button>
      </body>
    </>
  );
};

PostPage.showTopNav = true;
PostPage.showBottomNav = true;

export default PostPage;
