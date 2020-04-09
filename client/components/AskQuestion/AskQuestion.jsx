import React, { useState } from "react";
import Link from "next/link";

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

import Keyboard from "./Keyboard";

// Styling
import classes from "./question.module.scss";

const AskQuestion = () => {
  const [visibility, setVisibility] = useState("Public");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [changeAudience, audienceToggle] = useState(true);

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

  return (
    <>
      <div className="TopNav">
        <Link href="/app/ask-me/">
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </Link>
        <h3>Ask Question</h3>
        <Link href="/app/ask-me">
          <button type="button" className="Button">
            Post
          </button>
        </Link>
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
        <Keyboard
          toggle={toggle}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
    </>
  );
};

export default AskQuestion;

// {clickedVis && (
//   <Keyboard
//     setVis={setVisibility}
//     audience={visibility}
//     setClicked={setClickedVis}
//   />
// )}
// {!clickedVis && (
//   <div>
//     <div style={{ backgroundColor: "lightgray" }}>
//       <Button
//         className="Back"
//         style={{
//           backgroundColor: "transparent",
//           borderColor: "transparent",
//           color: "black",
//         }}
//         tag={Link}
//         href={urls.pages.app.termAndCond}
//       >
//         <FontAwesomeIcon icon={faArrowLeft} />
//       </Button>
//       <label style={{ marginLeft: 70, fontWeight: "bold" }}>
//         Ask Question
//       </label>

//       <Button
//         className="SmallPill"
//         style={{
//           backgroundColor: "darkGray",
//           color: "black",
//           marginLeft: 55,
//           fontSize: 11.5,
//           fontWeight: "bold",
//           height: 25,
//           WebkitTextFillColor: "$text",
//         }}
//         tag={Link}
//       >
//         Post
//       </Button>
//     </div>

//   </div>
// )}
