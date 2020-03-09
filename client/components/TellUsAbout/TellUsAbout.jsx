import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const topics = [
  "Music",
  "Movies",
  "Art",
  "Books",
  "Career",
  "Sports",
  "Science",
];

const TellUsAbout = ({ values, setValues }) => {
  const { username, age, grade, selectedTopics } = values;

  const renderAgeOptions = () => {
    const ages = [13, 14, 15, 16, 17, 18]; // TODO: hardcoded

    return ages.map(item => <option value={item}>{item}</option>);
  };

  const renderGradeOptions = () => {
    const grades = ["7th", "8th", "9th", "10th", "11th", "12th"]; // TODO: hardcoded

    return grades.map(item => <option value={item}>{item}</option>);
  };

  const renderTopics = () => {
    return topics.map(topic => {
      return (
        <Button
          className="btn"
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
    <div>
      <h3>Tell us more about you.</h3>
      <div className="text-center p-1">
        <img src="https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png" />
      </div>
      <p className="text-center p-2" style={{ WebkitTextFillColor: "#111111" }}>
        {username}
      </p>
      <Form>
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "flex-start",
          }}
        >
          <Label for="age">Age:</Label>
          <Input
            style={{ border: "none", width: 70, paddingLeft: 10 }}
            type="select"
            name="age"
            id="age"
            value={age}
            onChange={event => {
              const { value } = event.target;

              setValues({
                age: value,
              });
            }}
          >
            {renderAgeOptions()}
          </Input>
        </FormGroup>
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "flex-start",
          }}
        >
          <Label for="grade">School Year:</Label>
          <Input
            style={{ border: "none", width: 70, paddingLeft: 10 }}
            type="select"
            name="grade"
            id="grade"
            value={grade}
            onChange={event => {
              const { value } = event.target;

              setValues({
                grade: value,
              });
            }}
          >
            {renderGradeOptions()}
          </Input>
        </FormGroup>
        <h6 className="mb-4">Topics you are interested in:</h6>
        <div className="button-pills text-center">{renderTopics()}</div>
      </Form>
    </div>
  );
};

export default TellUsAbout;
