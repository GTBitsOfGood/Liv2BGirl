import React, { useState } from "react";
import {Button, Col, Form, FormGroup, Label, Input} from "reactstrap";

const CreateProfile = (props) => {
    const [username, setUsername] = useState('omuna'); //TODO: hardcoded
    const [age, setAge] = useState(13); //TODO: default values?
    const [grade, setGrade] = useState('7th');
    const [topics, setTopics] = useState(['Music', 'Movies', 'Art', 'Books', 'Career', 'Sports', 'Science']); // TODO: hardcoded
    const [selectedTopics, setSelectedTopics] = useState([]);

    const renderAgeOptions = () => {
        let ages = [13,14,15,16,17,18]; // TODO: hardcoded
        return ages.map(age => {
            return <option value={age}>{age}</option>;
        });
    };

    const renderGradeOptions = () => {
        let grades = ['7th','8th','9th','10th','11th','12th']; // TODO: hardcoded
        return grades.map(grade => {
            return <option value={grade}>{grade}</option>;
        });
    };

    const renderTopics = () => {
        return topics.map(topic => {
            return (
                <Button
                    className="btn"
                    active={selectedTopics.includes(topic)}
                    onClick={() => {
                        const index = selectedTopics.indexOf(topic);
                        if (index < 0) {
                            selectedTopics.push(topic)
                        } else {
                            selectedTopics.splice(index, 1)
                        }
                        setSelectedTopics([...selectedTopics]);
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
                <img src={'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'} />
            </div>
            <p className="text-center p-2" style={{WebkitTextFillColor: "#111111"}}>{username}</p>
            <Form>
                <FormGroup style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-start'}}>
                    <Label for="age">Age:</Label>
                    <Input
                        style={{border: 'none', width: 70, paddingLeft: 10}}
                        type="select"
                        name="age"
                        id="age"
                        value={age}
                        onChange={(event) => {
                            const value = event.target.value;
                            setAge(value);
                        }}
                    >
                        {renderAgeOptions()}
                    </Input>
                </FormGroup>
                <FormGroup style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-start'}}>
                    <Label for="grade">School Year:</Label>
                    <Input
                        style={{border: 'none', width: 70, paddingLeft: 10}}
                        type="select"
                        name="grade"
                        id="grade"
                        value={grade}
                        onChange={(event) => {
                            const value = event.target.value;
                            setGrade(value);
                        }}
                    >
                        {renderGradeOptions()}
                    </Input>
                </FormGroup>
                <h6 className="mb-4">Topics you are interested in:</h6>
                <div className="button-pills text-center">
                    {renderTopics()}
                </div>
            </Form>
            <div className="text-center">
                <Button style={{WebkitTextFillColor: "#111111"}} className="button mx-0">Create Profile</Button>
            </div>
        </div>
    );
};

export default CreateProfile;
