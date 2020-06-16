import React from "react";
import PropTypes from "prop-types";
import { getCategories } from "../../../actions/GroupCategory";
import TermsCond from "../../../components/Group/New/TermsCond";
import NewGroup from "../../../components/Group/New/NewGroup";
import NewGroupConfirmation from "../../../components/Group/New/NewGroupConfirmation";
import TopNavBar from "../../../components/TopNavBar";
import urls from "../../../../utils/urls";

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

  const handleNext = (gid) => {
    if (gid != null) {
      setGroupId(gid);
    }

    setStage((prevStage) => prevStage + 1);
  };

  return (
    <>
      <TopNavBar
        backUrl={urls.pages.app.groups.index}
        title="Create New Group"
      />
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
