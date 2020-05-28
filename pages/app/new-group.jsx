import React from "react";
import Router from "next/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategories } from "../../client/actions/Categories";
import TermsCond from "../../client/components/Group/New/TermsCond";
import NewGroup from "../../client/components/Group/New/NewGroup";
import NewGroupConfirmation from "../../client/components/Group/New/NewGroupConfirmation";

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

const NewGroupPage = ({ currentUser, categories }) => {
  const [stage, setStage] = React.useState(0);
  const [newGroupId, setGroupId] = React.useState("");

  const handleNext = gid => {
    if (gid != null) {
      setGroupId(gid);
    }

    setStage(prevStage => prevStage + 1);
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
          <FontAwesomeIcon className="Back" icon={faArrowLeft} />
        </div>
        <h3 className="Text">Create New Group</h3>
        <div />
      </div>
      <CurrentStep
        stage={stage}
        currentUser={currentUser}
        categories={categories}
        newGroupId={newGroupId}
        handleNext={handleNext}
      />
    </>
  );
};

NewGroupPage.getInitialProps = async () => {
  const categories = await getCategories();

  return {
    categories,
  };
};

NewGroupPage.showTopNav = false;
NewGroupPage.showBottomNav = false;

export default NewGroupPage;
