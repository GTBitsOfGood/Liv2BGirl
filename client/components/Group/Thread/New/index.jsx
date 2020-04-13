import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import logo from "../../../../../public/img/logo.png";

// API Call
import { createThread } from "../../../../actions/User";

// Styling
import styles from "../thread.module.scss";

// Navigation
import urls from "../../../../../utils/urls";

const CreateThreadComponent = props => {
  const { currentUser } = props;
  const router = useRouter();
  const { groupid } = router.query;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleCreateThread = async () => {
    if (title.length > 0 && text.length > 0) {
      createThread(currentUser.id, groupid, title, text).then(res => {
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
        <Link href={urls.pages.app.group(groupid)}>
          <div>
            <Icon className="Back" icon={bxArrowBack} width="18px" />
          </div>
        </Link>
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
          <textarea
            onChange={event => {
              setText(event.target.value);
            }}
            className={styles.CreateThreadText}
            placeholder="Description"
          />
        </form>
      </div>
    </div>
  );
};

CreateThreadComponent.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateThreadComponent;
