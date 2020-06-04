import React from "react";
import PropTypes from "prop-types";
import ViewGroup from "../../../client/components/Group/View";
import ErrorPage from "../../_error";
import { getGroup } from "../../../client/actions/Group";
import { getGroupThreads } from "../../../client/actions/Thread";

const GroupPage = ({ error, currentUser, groupid, groupData, threads }) => {
  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <ViewGroup
      currentUser={currentUser}
      groupid={groupid}
      groupData={groupData}
      threads={threads}
    />
  );
};

GroupPage.getInitialProps = async ({ query }) => {
  const { groupid } = query;

  try {
    const groupData = await getGroup(groupid);
    const threads = await getGroupThreads(groupid);

    return {
      groupid,
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
  groupid: PropTypes.string.isRequired,
  groupData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
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
