import React from "react";

// Stylings
import "../../../client/components/Group/GroupPage.scss";

// Icons
import { Icon } from "@iconify/react";

// Components
import { Button } from "reactstrap";

const CreateThread = ({ values, setValues }, props) => {
  const { title, text } = values;
  const { groupid } = props;

  return (
    <div>
      <h1>Start a New Thread.</h1>
    </div>
  );
};

export default CreateThread;
