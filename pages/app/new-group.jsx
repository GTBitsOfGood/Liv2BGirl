import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategories } from "../../client/actions/Categories";
import TermsCond from "../../client/components/Group/New/TermsCond";
import NewGroup from "../../client/components/Group/New/NewGroup";
import NewGroupConfirmation from "../../client/components/Group/New/NewGroupConfirmation";
import urls from "../../utils/urls";

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
        currentUser={currentUser}
        categories={categories}
        newGroupId={newGroupId}
        handleNext={handleNext}
      />
    </>
  );
};

NewGroupPage.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  const categories = await getCategories(cookies);

  return {
    categories,
  };
};

NewGroupPage.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

NewGroupPage.showTopNav = false;
NewGroupPage.showBottomNav = false;

export default NewGroupPage;
