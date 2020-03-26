import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

// Components
import logo from "../../../../public/img/logo.png";

// Stylings
import global from "../../components.global.scss";
import styles from "./thread.module.scss";

const CreateThreadComponent = () => {
  const router = useRouter();
  const { groupid } = router.query;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleCreateThread = async () =>
    // eslint-disable-next-line no-alert
    window.alert(
      `Created in group ${groupid} with title "${title}" and text "${text}"`
    );

  return (
    <div style={{ marginTop: "48px" }}>
      <div className={global.TopNav}>
        <Link href={`/app/groups/${groupid}`}>
          <Icon className={global.Back} icon={bxArrowBack} width="18px" />
        </Link>
        <img className={global.Logo} src={logo} alt="Liv2BGirl Logo" />
        <Link href={`/app/groups/${groupid}`}>
          <button
            type="button"
            className={global.Button}
            onClick={handleCreateThread}
          >
            Post
          </button>
        </Link>
      </div>
      <div className={global.Page}>
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
