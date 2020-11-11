import React from "react";
import { createPost } from "../../../actions/Post";
import styles from "./postPage.module.scss";
import { useRouter } from "next/router";
import urls from "../../../../utils/urls";

const PostPage = () => {
  const [content, setContent] = React.useState("");
  const router = useRouter();

  const getText = (event) => {
    setContent(event.target.value);
  };

  const createPostHelper = () => {
    createPost(null, content);
    router.push(urls.pages.app.index);
  };

  return (
    <>
      <body className={styles.PostPage}>
        <h1>Create a Post!</h1>
        <h2>Insert the contents of what you would like to post here!</h2>
        <h5>
          Note: You will be redirected to the home page once you click Post!
        </h5>
        <input className={styles.Input} onChange={getText}></input>
        <button
          className={styles.PostPage.button}
          onClick={() => createPostHelper()}
        >
          Post
        </button>
      </body>
    </>
  );
};

PostPage.showTopNav = true;
PostPage.showBottomNav = true;

export default PostPage;
