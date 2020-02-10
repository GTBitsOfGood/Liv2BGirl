import React from "react";
import { Button } from 'reactstrap';



const SignUp = () =>  {
    
    return (
        <div>
            <Button style = {{WebkitTextFillColor: "#111111", backgroundColor:"lightGray"}} className = "logo" disabled> Logo </Button> {' '}
            <form> 
                <input style = {{borderTop:0, borderLeft:0, borderRight:0}} className="form-control transparent-input" type = "text" placeholder = "Email"></input> <br></br>
                <input style = {{borderTop:0, borderLeft:0, borderRight:0}} className="form-control transparent-input" type = "text" placeholder = "Password"></input> <br></br>
                <input style = {{borderTop:0, borderLeft:0, borderRight:0}} className="form-control transparent-input" type = "text" placeholder = "Invitation Code"></input> <br></br>
            </form>
            <Button style = {{WebkitTextFillColor: "#111111"}} className = "button"> Sign Up </Button> {' '}
        </div>
    
    );
    
}; 
export default SignUp;