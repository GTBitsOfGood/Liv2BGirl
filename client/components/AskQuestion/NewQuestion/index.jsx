import React, { useState } from "react";
import Link from "next/link";
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
import classes from "./newquestion.module.scss";

const NewQuestion = () => {
  const [visibility, setVisibility] = useState("Public");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [changeAudience, audienceToggle] = useState(false);

  const getIcon = () => {
    if (visibility === "Public") {
      return <FontAwesomeIcon icon={faGlobe} className={classes.Icon} />;
    }
    if (visibility === "Anonymous") {
      return <FontAwesomeIcon icon={faGlasses} className={classes.Icon} />;
    }
    return <FontAwesomeIcon icon={faUserCircle} className={classes.Icon} />;
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
        <Link href="/app/ask-me/">
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </Link>
        <h3>Ask Question</h3>
        <button type="button" className="Button" onClick={() => postQuestion()}>
          Post
        </button>
      </div>

      <div className={classes.AskPage}>
        <div className={classes.Audience}>
          <h3>Audience:</h3>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggle()}
            onKeyDown={() => toggle()}
            className={classes.SetVis}
          >
            {getIcon()}
            <h3>{visibility}</h3>
            <FontAwesomeIcon icon={faAngleRight} className={classes.Toggle} />
          </div>
        </div>

        <div className={classes.Question}>
          <h3>Question</h3>
          <textarea
            className={classes.QuestionBox}
            placeholder="Start your question with “ What”, “How”, “Why”. etc."
            onChange={event => setQuestion(event.target.value)}
          />
        </div>

        <div className={classes.Description}>
          <h3>Description (Optional)</h3>
          <textarea
            className={classes.DescriptionBox}
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
