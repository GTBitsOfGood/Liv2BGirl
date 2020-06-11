import React from "react";
import PropTypes from "prop-types";
import ViewGroup from "../../../components/Group/View";
import ErrorPage from "../../_error";
import { getGroup } from "../../../actions/Group";
import { getGroupThreads } from "../../../actions/GroupThread";

const GroupPage = ({ error, currentUser, groupData, threads }) => {
  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <ViewGroup
      currentUser={currentUser}
      groupData={groupData}
      threads={threads}
    />
  );
};

GroupPage.getInitialProps = async ({ query, req }) => {
  const { groupid } = query;
  const cookies = req ? req.headers.cookie : null;

  try {
    const groupData = await getGroup(cookies, groupid);
    const threads = await getGroupThreads(cookies, groupid);

    return {
      groupData,
      threads,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

GroupPage.propTypes = {
  error: PropTypes.string,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  groupData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      iconUrl: PropTypes.string.isRequired,
      parent: PropTypes.string,
    }).isRequired,
  }),
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.number.isRequired,
        avatarColor: PropTypes.number.isRequired,
      }),
    })
  ),
};

GroupPage.defaultProps = {
  error: null,
  groupData: null,
  threads: [],
};

GroupPage.showTopNav = false;
GroupPage.showBottomNav = true;

export default GroupPage;
