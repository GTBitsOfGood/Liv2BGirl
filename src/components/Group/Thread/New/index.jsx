import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import TopNavBar from "../../../TopNavBar";
import DetailedTextField from "../../../DetailedTextField";
import { createThread } from "../../../../actions/GroupThread";
import urls from "../../../../../utils/urls";
import styles from "../thread.module.scss";

const CreateThreadComponent = () => {
  const router = useRouter();
  const { groupid } = router.query;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreateThread = async () => {
    if (title.length > 0 && body.length > 0) {
      await createThread(null, groupid, title, body)
        .then((res) =>
          Router.replace(
            urls.pages.app.groups.group.threads.view(groupid, res._id)
          )
        )
        .catch((error) => {
          window.alert(error.message);
        });
    } else {
      window.alert("Post must have a title and description!");
    }
  };

  return (
    <>
      <TopNavBar
        backUrl={urls.pages.app.groups.group.view()}
        backUrlAs={urls.pages.app.groups.group.view(groupid)}
        rightNode={
          <button type="button" className="Button" onClick={handleCreateThread}>
            Post
          </button>
        }
      />
      <div className="Page">
        <h1 className={styles.CreateThreadHeading}>Start a New Thread.</h1>
        <form className={styles.CreateThreadForm}>
          <input
            onChange={(event) => setTitle(event.target.value)}
            className={styles.CreateThreadTitle}
            type="text"
            placeholder="Title"
          />
          <div className={styles.CreateThreadText}>
            <DetailedTextField
              readOnly={false}
              onChange={({ nodes }) => setBody(nodes)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateThreadComponent;
