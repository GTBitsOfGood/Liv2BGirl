import React from 'react';
import PropTypes from 'prop-types';

const ProfilePage = (props) => {
  const { userid } = props;

  return (
    <p>
      User: {userid}
    </p>
  );
};

ProfilePage.propTypes = {
  userid: PropTypes.string.isRequired,
};

export default ProfilePage;