import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const GenUsername = props => {
  const { userid } = props;
  const [describe, setDescribe] = React.useState("");
  const [like, setLike] = React.useState("");
  const [lucky, setLucky] = React.useState("");
  var genUser = describe.substring(0, 2) + like.substring(0, 2) + lucky.substring(0, 2) + Math.floor(Math.random() * 10)
  const [generate, setGenerate] = React.useState(false);



  return (
    <div>
        <h5 style={{fontWeight:'bold'}}>Generate a username</h5>
        <Form>
        <FormGroup>
            <Label>Describe yourself in one word: </Label>
            <Input onChange={(event) => { setDescribe(event.target.value)}} style={{height:35}} name="email"/>
        </FormGroup>
        <FormGroup>
            <Label> One thing you like:</Label>
            <Input onChange={(event) => { setLike(event.target.value)}} style={{height:35}} name="password"/>
        </FormGroup>
        <FormGroup>
            <Label>Your lucky number: </Label>
            <Input onChange={(event) => { setLucky(event.target.value)}} style={{height:35}} name="select">
            </Input>
        </FormGroup>
        </Form>
        <Button onClick={() => {setGenerate(true)}} style={{height:30, WebkitBorderRadius:40, color:'black', paddingBottom:28}}> Generate! </Button>
        <br></br>
        <Label style={{marginTop:10}}>Pick your username: </Label> 
        <br></br>
        {generate &&
          <Button style={{WebkitBorderRadius: 30, color:'white'}}> {genUser} </Button>
        }
    </div>





    
  );
};


export default GenUsername;
