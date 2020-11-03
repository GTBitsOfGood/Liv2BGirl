import React from "react";
import { createPost } from "../../../actions/Post";

var content = "";
const getText = (event) => {
  content = event.target.value;
};

const createPostHelper = () => {
  console.log(content);
  createPost(content);
};

const PostPage = () => (
  <>
    <h1>Create a Post!</h1>
    <body>
      <h2>Insert the contents of what you would like to post here!</h2>
      <input onChange={getText}></input>
    </body>
  </>
);

PostPage.showTopNav = true;
PostPage.showBottomNav = true;

export default PostPage;
