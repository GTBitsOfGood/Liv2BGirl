import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "../../_error";
import TermsCond from "../../../components/Group/New/TermsCond";
import NewGroup from "../../../components/Group/New/NewGroup";
import NewGroupConfirmation from "../../../components/Group/New/NewGroupConfirmation";
import TopNavBar from "../../../components/TopNavBar";
import { getCategories } from "../../../actions/GroupCategory";
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

const NewGroupPage = ({ error, currentUser, categories }) => {
  const [stage, setStage] = React.useState(0);
  const [newGroupId, setGroupId] = React.useState("");

  const handleNext = (gid) => {
    if (gid != null) {
      setGroupId(gid);
    }

    setStage((prevStage) => prevStage + 1);
  };

  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

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

  try {
    const categories = await getCategories(cookies);

    return {
      categories,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

NewGroupPage.propTypes = {
  error: PropTypes.string,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
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
