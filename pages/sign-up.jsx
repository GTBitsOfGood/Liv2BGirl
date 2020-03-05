import React from "react";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import { signUp } from "../client/actions/api";
import SignUpInfo from "../client/components/SignUpInfo";
import CreateAvatar from "../client/components/CreateAvatar";
import GenUsername from "../client/components/GenUsername";
import TellUsAbout from "../client/components/TellUsAbout";
import SignUpProgressBar from "../client/components/SignUpProgressBar";
import urls from "../utils/urls";

const getStep = stage => {
  switch (stage) {
    case 0: {
      return <SignUpInfo />;
    }
    case 1: {
      return <CreateAvatar />;
    }
    case 2: {
      return <GenUsername />;
    }
    case 3: {
      return <TellUsAbout />;
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
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invCode, setInvCode] = React.useState("");
  const [stage, setStage] = React.useState(0);

  const handleSignUp = async () => {
    await signUp(username, password, email);

    return router.push({
      pathname: urls.pages.index,
    });
  };

  const goToPrev = () => {
    if (stage - 1 >= 0) {
      setStage(prevState => prevState - 1);
    }
  };

  const goToNext = () => {
    if (stage + 1 <= 3) {
      setStage(prevState => prevState + 1);
    }
  };

  return (
    <>
      <SignUpProgressBar stage={stage} />
      {getStep(stage)}
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
