import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";

// Icons
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API Call
import { createGroup } from "../../../client/actions/Group";

// Components
import TermsCond from "../../../client/components/Group/New/TermsCond";
import NewGroup from "../../../client/components/Group/New/NewGroup";
import NewGroupConfirmation from "../../../client/components/Group/New/NewGroupConfirmation";

// Navigation
import urls from "../../../utils/urls";

const CurrentStep = ({ stage, ...rest }) => {
  switch (stage) {
    case 0: {
      return <TermsCond {...rest} />;
    }
    case 1: {
      return <NewGroup {...rest} />;
    }
    case 2: {
      return <NewGroupConfirmation {...rest} />;
    }
    default: {
      return null;
    }
  }
};

const userId = "5e93869d57bbd30798b3aaa2";

const getStepText = stage => {
  switch (stage) {
    case 0: {
      return "NEXT STEP";
    }
    case 1: {
      return "CREATE";
    }
    default: {
      return "GO TO THE GROUP";
    }
  }
};

const NewGroupPage = () => {
  const [newGroupId, setGroupId] = useState("");
  const [stage, setStage] = useState(0);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [values, setPureValues] = useState({
    icon: null,
    name: "",
    description: "",
    category: "",
    checked: false,
  });

  const setValues = newObj => {
    setPureValues(oldObject => ({
      ...oldObject,
      ...newObj,
    }));
  };

  const goToNext = async () => {
    if (stageCompleted) {
      if (stage + 1 < 2) {
        setStage(prevState => prevState + 1);
        setStageCompleted(false);
      } else if (stage + 1 === 2) {
        await createGroup(
          values.name,
          values.description,
          [values.category],
          userId
        )
          .then(res => {
            setStage(prevState => prevState + 1);
            setStageCompleted(true);
            setGroupId(res._id);
          })
          .catch(() => {
            setStage(0);
            setStageCompleted(false);
            // eslint-disable-next-line no-alert
            window.alert("Failed to create group!");
          });
      } else if (stage + 1 === 3) {
        await Router.push(`/app/groups/${newGroupId}`);
      }

      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="TopNav">
        <Link href={urls.pages.app.groupList}>
          <div>
            <FontAwesomeIcon className="Back" icon={faArrowLeft} />
          </div>
        </Link>
        <h3 className="Text">Create New Group</h3>
        <div />
      </div>
      <CurrentStep
        stage={stage}
        values={values}
        setValues={setValues}
        setStageCompleted={setStageCompleted}
      />
      <div style={{ display: "flex" }}>
        <button type="button" className="NextButton" onClick={goToNext}>
          <h1>{getStepText(stage)}</h1>
        </button>
      </div>
    </>
  );
};

export default NewGroupPage;
