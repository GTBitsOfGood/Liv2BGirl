import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createGroup } from "../../../client/actions/Group";
import TermsCond from "../../../client/components/Group/New/TermsCond";
import NewGroup from "../../../client/components/Group/New/NewGroup";
import NewGroupConfirmation from "../../../client/components/Group/New/NewGroupConfirmation";
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
  const router = useRouter();
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
        await createGroup(values.name, values.description, [values.category])
          .then(() => {
            setStage(prevState => prevState + 1);
            setStageCompleted(true);
          })
          .catch(() => {
            setStage(0);
            setStageCompleted(false);
            // eslint-disable-next-line no-alert
            window.alert("Failed to create group!");
          });
      } else if (stage + 1 === 3) {
        await router.replace(`/app/groups/${values.name}`);
      }

      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="TopNav">
        <Link href={urls.pages.groupList}>
          <FontAwesomeIcon className="Back" icon={faArrowLeft} />
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
