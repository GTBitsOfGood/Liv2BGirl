import React, { useState } from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

import {
  faArrowLeft,
  faAngleRight,
  faGlobe,
  faGlasses,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Keyboard from "./Keyboard";
// import urls from "../../../utils/urls";

// Styling
import classes from "./question.module.scss";

const AskQuestion = () => {
  const [visibility, setVisibility] = useState("Public");
  // const [question, setQuestion] = useState("");
  // const [description, setDescription] = useState("");
  // const [clickedVis, setClickedVis] = useState(false);

  const getIcon = () => {
    if (visibility === "Public") {
      return <FontAwesomeIcon icon={faGlobe} />;
    }
    if (visibility === "Anonymous") {
      return <FontAwesomeIcon icon={faGlasses} />;
    }
    return <FontAwesomeIcon icon={faUserCircle} />;
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
          <div role="button" className={classes.SetVis}>
            {getIcon()}
            <h3>{visibility}</h3>
          </div>
        </div>

        <div className={classes.Question}>
          <h3>Question</h3>
          <textarea
            className={classes.QuestionBox}
            placeholder="Start your question with “ What”, “How”, “Why”. etc."
          />
        </div>

        <div className={classes.Description}>
          <h3>Description (Optional)</h3>
          <textarea
            className={classes.DescriptionBox}
            placeholder="Add more context to your question."
          />
        </div>
      </div>

      {/* < style={{ marginLeft: 10, marginTop: 10 }}>
       <div style={{ display: "flex" }}>
         <h3 style={{ marginTop: 6 }}>Audience:</h3>

       <Button
          onClick={() => setClickedVis(true)}
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            WebkitTextFillColor: "black",
          }}
        >
          {getIcon()}
          {visibility}
          <FontAwesomeIcon
            style={{ color: "black", marginLeft: 10 }}
            icon={faAngleRight}
          />
        </Button>
      </div> */}
      {/* <FormGroup>
        <Label>Question</Label>
        <Input
          type="textarea"
          placeholder='Start your question with "What" "How", "Why", etc.'
          style={{ height: 100, width: 325 }}
          onChange={e => setQuestion(e.target.value)}
          value={question}
        />
      </FormGroup> */}
      {/* <FormGroup>
        <Label>Description (Optional)</Label>
        <Input
          type="textarea"
          placeholder="Add more context to your question"
          style={{ height: 230, width: 325 }}
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
      </FormGroup>  */}
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
