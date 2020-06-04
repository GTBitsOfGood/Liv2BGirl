import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import TextareaAutosize from "react-textarea-autosize";
import urls from "../../../../../utils/urls";
import { createThread } from "../../../../actions/Thread";
import logo from "../../../../../public/img/logo.png";
import styles from "../thread.module.scss";

const CreateThreadComponent = () => {
  const router = useRouter();
  const { groupid } = router.query;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleCreateThread = async () => {
    if (title.length > 0 && text.length > 0) {
      createThread(groupid, title, text).then(res => {
        if (res) {
          Router.push(urls.pages.app.thread(res._id));
        }
      });
    } else {
      // eslint-disable-next-line no-alert
      window.alert("Post must have a title and description!");
    }
  };

  return (
    <div style={{ marginTop: "48px" }}>
      <div className="TopNav">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => Router.back()}
          onKeyDown={() => Router.back()}
        >
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </div>
        <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
        <button type="button" className="Button" onClick={handleCreateThread}>
          Post
        </button>
      </div>
      <div className="Page">
        <h1 className={styles.CreateThreadHeading}>Start a New Thread.</h1>
        <form className={styles.CreateThreadForm}>
          <input
            onChange={event => {
              setTitle(event.target.value);
            }}
            className={styles.CreateThreadTitle}
            type="text"
            placeholder="Title"
          />
          <TextareaAutosize
            className={styles.CreateThreadText}
            placeholder="Description"
            onChange={event => {
              setText(event.target.value);
            }}
            maxRows={8}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateThreadComponent;
