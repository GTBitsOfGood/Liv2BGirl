import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import { createThread } from "../../../actions/User";
import logo from "../../../../public/img/logo.png";
import styles from "./thread.module.scss";

const CreateThreadComponent = props => {
  const router = useRouter();
  const { groupid } = router.query;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { currentUser } = props;

  const handleCreateThread = async () => {
    createThread(currentUser.id, groupid, title, text);

    // eslint-disable-next-line no-alert
    window.alert(
      `Created in group ${groupid} with title "${title}" and text "${text}"`
    );
  };

  return (
    <div style={{ marginTop: "48px" }}>
      <div className="TopNav">
        <Link href={`/app/groups/${groupid}`}>
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </Link>
        <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
        <Link href={`/app/groups/thread/${title}`}>
          <button type="button" className="Button" onClick={handleCreateThread}>
            Post
          </button>
        </Link>
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
          <textarea
            onChange={event => {
              setText(event.target.value);
            }}
            className={styles.CreateThreadText}
            placeholder="Text"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateThreadComponent;
