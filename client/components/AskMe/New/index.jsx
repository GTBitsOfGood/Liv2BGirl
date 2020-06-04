import React, { useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";

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

// Components
import TextareaAutosize from "react-textarea-autosize";
import Audience from "./Audience";

// API Call
import { createThread } from "../../../actions/AskMe";

// Styling
import styles from "./newquestion.module.scss";

// Navigation
import urls from "../../../../utils/urls";

const NewQuestion = props => {
  const { currentUser } = props;
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

  const postQuestion = async () => {
    if (question.length > 0) {
      const thread = await createThread(question, description, visibility);
      await Router.push(urls.pages.app.viewQuestion(thread._id));
    }
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
          <TextareaAutosize
            className={styles.DescriptionBox}
            placeholder="Add more context to your question."
            onChange={event => setDescription(event.target.value)}
            minRows={8}
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

NewQuestion.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewQuestion;
