import React from "react";
import Router from "next/router";
import {
  faAngleRight,
  faGlobe,
  faGlasses,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Audience from "./Audience";
import TopNavBar from "../../TopNavBar";
import DetailedTextField from "../../DetailedTextField";
import { createThread } from "../../../actions/AskMeThread";
import urls from "../../../../utils/urls";
import styles from "./newquestion.module.scss";

const getIcon = (visibility) => {
  if (visibility === "Public") {
    return <FontAwesomeIcon icon={faGlobe} className={styles.Icon} />;
  }

  if (visibility === "Anonymous") {
    return <FontAwesomeIcon icon={faGlasses} className={styles.Icon} />;
  }

  return <FontAwesomeIcon icon={faUserCircle} className={styles.Icon} />;
};

const NewQuestion = () => {
  const [visibility, setVisibility] = React.useState("Public");
  const [question, setQuestion] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [changeAudience, audienceToggle] = React.useState(false);

  const toggle = () => {
    audienceToggle(!changeAudience);
  };

  const postQuestion = async () => {
    if (question.length > 0) {
      return createThread(null, question, description, visibility)
        .then((thread) =>
          Router.push(urls.pages.app.askMe.questions.view(thread._id))
        )
        .catch((error) => {
          window.alert(error.message);
        });
    }
  };

  return (
    <>
      <TopNavBar
        backUrl={urls.pages.app.askMe.index}
        title="Ask Question"
        rightNode={
          <button type="button" className="Button" onClick={postQuestion}>
            Post
          </button>
        }
      />
      <div className={styles.AskPage}>
        <div className={styles.Audience}>
          <h3>Audience:</h3>
          <div
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={toggle}
            className={styles.SetVis}
          >
            {getIcon(visibility)}
            <h3>{visibility}</h3>
            <FontAwesomeIcon icon={faAngleRight} className={styles.Toggle} />
          </div>
        </div>

        <div className={styles.Question}>
          <h3>Question</h3>
          <textarea
            className={styles.QuestionBox}
            placeholder="Start your question with “ What”, “How”, “Why”. etc."
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>

        <div className={styles.Description}>
          <h3>Description (Optional)</h3>
          <div className={styles.DescriptionBox}>
            <DetailedTextField
              readOnly={false}
              onChange={({ nodes }) => setDescription(nodes)}
            />
          </div>
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
