import React, { useState } from "react";
import Router from "next/router";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

import {
  faAngleRight,
  faGlobe,
  faGlasses,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Audience from "./Audience";

// Styling
import styles from "./newquestion.module.scss";

const NewQuestion = () => {
  const [visibility, setVisibility] = useState("Public");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [changeAudience, audienceToggle] = useState(false);

  const getIcon = () => {
    if (visibility === "Public") {
      return <FontAwesomeIcon icon={faGlobe} className={styles.Icon} />;
    }
    if (visibility === "Anonymous") {
      return <FontAwesomeIcon icon={faGlasses} className={styles.Icon} />;
    }
    return <FontAwesomeIcon icon={faUserCircle} className={styles.Icon} />;
  };

  const toggle = () => {
    audienceToggle(!changeAudience);
  };

  const postQuestion = () => {
    if (question !== "") {
      // eslint-disable-next-line no-alert
      alert(`Question: ${question} Description: ${description}`);
      Router.push("/app/ask-me");
      return;
    }
    // eslint-disable-next-line no-alert
    alert(`Question Required!`);
  };

  return (
    <>
      <div className="TopNav">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => Router.back()}
          onKeyDown={() => Router.back()}
        >
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </div>
        <h3>Ask Question</h3>
        <button type="button" className="Button" onClick={() => postQuestion()}>
          Post
        </button>
      </div>

      <div className={styles.AskPage}>
        <div className={styles.Audience}>
          <h3>Audience:</h3>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggle()}
            onKeyDown={() => toggle()}
            className={styles.SetVis}
          >
            {getIcon()}
            <h3>{visibility}</h3>
            <FontAwesomeIcon icon={faAngleRight} className={styles.Toggle} />
          </div>
        </div>

        <div className={styles.Question}>
          <h3>Question</h3>
          <textarea
            className={styles.QuestionBox}
            placeholder="Start your question with “ What”, “How”, “Why”. etc."
            onChange={event => setQuestion(event.target.value)}
          />
        </div>

        <div className={styles.Description}>
          <h3>Description (Optional)</h3>
          <textarea
            className={styles.DescriptionBox}
            placeholder="Add more context to your question."
            onChange={event => setDescription(event.target.value)}
          />
        </div>
      </div>

      {changeAudience && (
        <Audience
          toggle={toggle}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
    </>
  );
};

export default NewQuestion;
