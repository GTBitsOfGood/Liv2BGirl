import React, { useState } from "react";
import Router from "next/router";
import SignUpInfo from "../components/SignUp";
import CreateAvatar from "../components/SignUp/CreateAvatar";
import GenUsername from "../components/SignUp/GenUsername/GenUsername";
import TellUsAbout from "../components/SignUp/TellUsAbout";
import SignUpProgressBar from "../components/SignUp/SignUpProgressBar";
import RegistrationCompleted from "../components/SignUp/RegistrationCompleted";
import { getCurrentUser } from "../actions/User";
import urls from "../../utils/urls";

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

  const setValues = (newObj) => {
    setPureValues((oldObject) => ({
      ...oldObject,
      ...newObj,
    }));
  };

  const handleNext = () => {
    setStage((prevStage) => prevStage + 1);
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

  const currentUser = await getCurrentUser(cookies).catch(() => null);

  if (currentUser != null) {
    if (res) {
      res.writeHead(302, {
        Location: urls.pages.app.index,
      });
      res.end();
    } else {
      await Router.push(urls.pages.app.index);
    }
  }

  return {
    currentUser,
  };
};

SignUp.showTopNav = false;
SignUp.showBottomNav = false;

export default SignUp;
