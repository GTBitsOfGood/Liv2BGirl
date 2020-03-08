import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

// import { check } from "prettier";
import css from "./newgroup.module.css";

const NewGroup = props => {
  const [notChecked, setChecked] = React.useState(true);

  return (
    <div>
      <button type="button" className="btn btn-default btn-lg">
        Create New Group
      </button>
      <h2 style={{ fontSize: 18, fontWeight: "bold" }}>Terms & Agreement</h2>
      <br />
      <p>
        Some terms and agreements idk what to write blah blah blah follow these
        rules you must make sure blah blah blah failure to comply blah blah blah
      </p>

      <p>
        Some more terms and agreements woot woot yeet yeet uhhhhhhh go bits of
        good yayay im gonna keep writing stuff uhhhhh random words octopus dog
        notebook blanket bed sleep eyes
      </p>
      <br />

      <div>
        <input
          onClick={() => {
            setChecked(!notChecked);
          }}
          type="checkbox"
          style={{ width: 25, height: 25, marginRight: 20 }}
        />
        <label>I have read the terms and conditions</label>
      </div>
      <br />
      <Button
        disabled={notChecked}
        onClick={() => console.log("clicked!")}
        style={{
          outlineColor: "lightgray",
          backgroundColor: "lightgray",
          marginLeft: 100,
          width: 150,
          height: 50,
          WebkitBorderRadius: 40,
          color: "black",
        }}
      >
        Next Step
      </Button>
    </div>
  );
};

export default NewGroup;
