import React from "react";
import { Button } from 'reactstrap';



const SignUp = () =>  {
    const [email, setEmail, password, setPassword, invCode, setInvCode] = React.useState("");
    // constructor(props) {
    //     super(props)
    //     this.state
    // }
    // changeEmail = event => {
    //     email = event.target.value;
    //     console.log(email);
    // }

    // changePassword = event => {
    //     password = event.target.value;
    // }
    // changeInvCode = event => {
    //     invCode = event.target.value;
    // }

    return (
        <div>
            <Button style = {{WebkitTextFillColor: "#111111", backgroundColor:"lightGray"}} className = "logo" disabled> Logo </Button> {' '}
            <form> 
                <input onClick={(event) => { setEmail(event.target.value)}} style = {{borderTop:0, borderLeft:0, borderRight:0}} className="form-control transparent-input" type = "text" placeholder = "Email"></input> <br></br>
                <input onClick={(event) => { setPassword(event.target.value)}} style = {{borderTop:0, borderLeft:0, borderRight:0}} className="form-control transparent-input" type = "text" placeholder = "Password"></input> <br></br>
                <input onClick={(event) => { setInvCode(event.target.value)}} style = {{borderTop:0, borderLeft:0, borderRight:0}} className="form-control transparent-input" type = "text" placeholder = "Invitation Code"></input> <br></br>
            </form>
            <Button style = {{WebkitTextFillColor: "#111111"}} className = "button"> Sign Up </Button> {' '}
        </div>
    
    );
    
}; 
export default SignUp;