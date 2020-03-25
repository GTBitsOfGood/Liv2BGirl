import React from "react";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { avatarImg, colorArr } from "../../../utils/avatars";

const topics = [
  "Music",
  "Movies",
  "Art",
  "Books",
  "Career",
  "Sports",
  "Science",
];

const TellUsAbout = ({ values, setValues, setStageCompleted }) => {
  const {
    username,
    age,
    grade,
    selectedTopics,
    ageOpen,
    gradeOpen,
    avatar,
    avatarColor,
  } = values;

  React.useEffect(() => {
    if (age > 0 && grade.length > 0 && selectedTopics.length > 0) {
      setStageCompleted(true);
    }
  }, [age, grade, selectedTopics]);

  const toggleAge = () => setValues({ ageOpen: !ageOpen });
  const toggleGrade = () => setValues({ gradeOpen: !gradeOpen });

  const renderAgeOptions = () => {
    const ages = [13, 14, 15, 16, 17, 18]; // TODO: hardcoded

    return ages.map(item => (
      <div
        onClick={() => setValues({ age: item, ageOpen: !ageOpen })}
        onKeyDown={() => setValues({ age: item, ageOpen: !ageOpen })}
        role="button"
        tabIndex="0"
      >
        {item}
      </div>
    ));
  };

  const renderGradeOptions = () => {
    const grades = ["7th", "8th", "9th", "10th", "11th", "12th"]; // TODO: hardcoded

    return grades.map(item => (
      <div
        onClick={() => setValues({ grade: item, gradeOpen: !gradeOpen })}
        onKeyDown={() => setValues({ grade: item, gradeOpen: !gradeOpen })}
        role="button"
        tabIndex="0"
      >
        {item}
      </div>
    ));
  };

  const renderTopics = () => {
    return topics.map(topic => {
      return (
        <Button
          className="about-topic-btn"
          active={selectedTopics.includes(topic)}
          onClick={() => {
            const newTopics = [...selectedTopics];
            const index = newTopics.indexOf(topic);

            if (index < 0) {
              newTopics.push(topic);
            } else {
              newTopics.splice(index, 1);
            }

            setValues({
              selectedTopics: newTopics,
            });
          }}
        >
          {topic}
        </Button>
      );
    });
  };

  return (
    <div className="about-pg page">
      <h1 className="about-head">Tell us more about you.</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            backgroundColor: colorArr[avatarColor],
          }}
          className="about-avatar avatar-logo"
        >
          <img
            src={avatarImg[avatar]}
            alt="CreateAvatar"
            className="avatar-img"
          />
        </div>
        <p className="about-username">{username}</p>
      </div>
      <Form>
        <FormGroup style={{ display: "flex" }}>
          <Label className="about-label" for="age">
            Age:
          </Label>
          <Dropdown isOpen={ageOpen} toggle={toggleAge}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={ageOpen}
              caret
            >
              {age}
            </DropdownToggle>
            <DropdownMenu>{renderAgeOptions()}</DropdownMenu>
          </Dropdown>
        </FormGroup>

        <FormGroup style={{ display: "flex" }}>
          <Label className="about-label" for="grade">
            School Year:
          </Label>
          <Dropdown isOpen={gradeOpen} toggle={toggleGrade}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={gradeOpen}
              caret
            >
              {grade}
            </DropdownToggle>
            <DropdownMenu>{renderGradeOptions()}</DropdownMenu>
          </Dropdown>
        </FormGroup>

        <Label className="about-label">Topics you are interested in:</Label>
        <div className="about-topics">{renderTopics()}</div>
      </Form>
    </div>
  );
};

export default TellUsAbout;
