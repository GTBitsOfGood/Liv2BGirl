import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()
  const { uid } = router.query

  return <p>User: {uid}</p>
}

export default ProfilePage