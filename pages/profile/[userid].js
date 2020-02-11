import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()
  const { userid } = router.query

  return <p>User: {userid}</p>
}

export default ProfilePage