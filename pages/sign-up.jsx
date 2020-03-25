import React, { useState } from "react";
import { useRouter } from "next/router";

// API Call
import { signUp } from "../client/actions/api";
import urls from "../utils/urls";

// Pages
import SignUpInfo from "../client/components/SignUp/SignUpInfo";
import CreateAvatar from "../client/components/SignUp/CreateAvatar";
import GenUsername from "../client/components/SignUp/GenUsername";
import TellUsAbout from "../client/components/SignUp/TellUsAbout";

// Other Components
import SignUpProgressBar from "../client/components/SignUp/SignUpProgressBar";
import RegistrationCompleted from "../client/components/SignUp/RegistrationCompleted";

// Styling
import global from "../client/components/components.global.scss";

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

const getStepText = stage => {
  switch (stage) {
    case 0: {
      return "SIGN UP";
    }
    case 3: {
      return "CREATE PROFILE";
    }
    case 4: {
      return "GET STARTED";
    }
    default: {
      return "NEXT STEP";
    }
  }
};

const SignUp = () => {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [values, setPureValues] = useState({
    username: "",
    email: "",
    password: "",
    invCode: "",
    avatar: 0,
    avatarColor: 0,
    age: 13,
    grade: "7th",
    selectedTopics: [],
  });

  const setValues = newObj => {
    setPureValues(oldObject => ({
      ...oldObject,
      ...newObj,
    }));
  };

  const goToNext = async () => {
    if (stageCompleted) {
      if (stage + 1 < 4) {
        setStage(prevState => prevState + 1);
        setStageCompleted(false);
      } else if (stage + 1 === 4) {
        await signUp(values)
          .then(() => {
            setStage(prevState => prevState + 1);
            setStageCompleted(true);
          })
          .catch(() => {
            setStage(0);
            setStageCompleted(false);
            // eslint-disable-next-line no-alert
            window.alert("Failed to create account!");
          });
      } else if (stage + 1 === 5) {
        await router.replace(urls.pages.app.home);
      }

      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <SignUpProgressBar stage={stage} setStage={setStage} />
      <CurrentStep
        stage={stage}
        values={values}
        setValues={setValues}
        setStageCompleted={setStageCompleted}
      />
      <div style={{ display: "flex" }}>
        <button type="button" className={global.nextButton} onClick={goToNext}>
          <h1>{getStepText(stage)}</h1>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
