import React, { useState } from "react";
import Router from "next/router";
import SignUpInfo from "../client/components/SignUp";
import CreateAvatar from "../client/components/SignUp/CreateAvatar";
import GenUsername from "../client/components/SignUp/GenUsername";
import TellUsAbout from "../client/components/SignUp/TellUsAbout";
import SignUpProgressBar from "../client/components/SignUp/SignUpProgressBar";
import RegistrationCompleted from "../client/components/SignUp/RegistrationCompleted";
import { getCurrentUser } from "../client/actions/User";
import urls from "../utils/urls";

const CurrentStep = ({ stage, ...rest }) => {
  switch (stage) {
    case 0: {
      return <SignUpInfo {...rest} />;
    }
    case 1: {
      return <CreateAvatar {...rest} />;
    }
    case 2: {
      return <GenUsername {...rest} />;
    }
    case 3: {
      return <TellUsAbout {...rest} />;
    }
    case 4: {
      return <RegistrationCompleted {...rest} />;
    }
    default: {
      return null;
    }
  }
};

const SignUp = () => {
  const [stage, setStage] = useState(0);
  const [values, setPureValues] = useState({
    invCode: "",
    username: "",
    email: "",
    password: "",
    avatar: 0,
    avatarColor: 0,
    age: 13,
    grade: 7,
    interests: [],
  });

  const setValues = newObj => {
    setPureValues(oldObject => ({
      ...oldObject,
      ...newObj,
    }));
  };

  const handleNext = () => {
    setStage(prevStage => prevStage + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <SignUpProgressBar stage={stage} setStage={setStage} />
      <CurrentStep
        stage={stage}
        values={values}
        setValues={setValues}
        handleNext={handleNext}
      />
    </div>
  );
};

SignUp.getInitialProps = async ({ req, res }) => {
  const cookies = req ? req.headers.cookie : null;

  const currentUser = await getCurrentUser(cookies);

  if (currentUser != null) {
    if (res) {
      res.writeHead(302, {
        Location: urls.pages.app.home,
      });
      res.end();
    } else {
      await Router.push(urls.pages.app.home);
    }
  }

  return {
    currentUser,
  };
};

SignUp.showTopNav = false;
SignUp.showBottomNav = false;

export default SignUp;
