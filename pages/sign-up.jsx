import React from "react";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import { signUp } from "../client/actions/api";
import SignUpInfo from "../client/components/SignUpInfo";
import CreateAvatar from "../client/components/CreateAvatar";
import GenUsername from "../client/components/GenUsername";
import TellUsAbout from "../client/components/TellUsAbout";
import SignUpProgressBar from "../client/components/SignUpProgressBar";
import RegistrationCompleted from "../client/components/RegistrationCompleted";
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

const getStepText = stage => {
  switch (stage) {
    case 0: {
      return "Sign Up";
    }
    case 3: {
      return "Create Profile";
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
  const [stage, setStage] = React.useState(0);
  const [values, setPureValues] = React.useState({
    username: "",
    email: "",
    password: "",
    invCode: "",
    avatar: 0,
    avatarColor: 0,
    age: "",
    grade: "",
    selectedTopics: [],
  });

  const setValues = newObj => {
    setPureValues(oldObject => ({
      ...oldObject,
      ...newObj,
    }));

    console.log("values", values);
  };

  const goToNext = async () => {
    if (stage + 1 <= 4) {
      setStage(prevState => prevState + 1);
    } else if (stage + 1 === 4) {
      await signUp(values)
        .then(() => {
          setStage(prevState => prevState + 1);
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          window.alert("Failed to create account!");
        });
    } else if (stage + 1 === 5) {
      await router.replace(urls.pages.index);
    }
  };

  return (
    <>
      <SignUpProgressBar stage={stage} setStage={setStage} />
      <CurrentStep stage={stage} values={values} setValues={setValues} />
      <Button
        style={{
          WebkitTextFillColor: "#111111",
          fontWeight: "bold",
          color: "#4F4F4F",
        }}
        className="button"
        onClick={goToNext}
      >
        {getStepText(stage)}
      </Button>
    </>
  );
};

export default SignUp;
