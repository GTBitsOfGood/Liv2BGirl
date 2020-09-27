import React from "react";
import { createCode } from "../../../actions/InvitationCode";
import classes from "./InvitePage.module.scss";

const InvitePage = () => {
  const inputRef = React.useRef(null);
  const [code, setCode] = React.useState("");

  const handleCreate = () =>
    createCode(null)
      .then((newCode) => setCode(newCode._id))
      .catch((error) => {
        window.alert(error.message);
      });

  const handleCopy = (e) => {
    if (code != null && code.length > 0) {
      inputRef.current.select();
      document.execCommand("copy");
      e.target.focus();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Create Invitation Code</h1>
        <p>
          This button will create an invitation code that can be used to
          register a new user. The code can only be used once before it expires
          and a new code must be generated. Anyone who is given a code can
          create an account, so distribute them carefully.
        </p>
        <button className={classes.createButton} onClick={handleCreate}>
          Create
        </button>
      </div>
      <div className={classes.result}>
        <div className={classes.inputSection}>
          <label>Invitation Code</label>
          <input ref={inputRef} type="text" readOnly value={code} />
          <button onClick={handleCopy}>Copy</button>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
