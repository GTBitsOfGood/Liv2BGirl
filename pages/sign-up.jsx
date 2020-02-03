import React from "react";

const SignUp = () =>  {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: '',
    //         email: '',
    //         password: ''
    //     }
        
    // }
    
    return (
        <div>
            <h1>
                Sign Up
            </h1>
            <form> 
                <label style = {{marginRight:10}}>Username:</label>   <input type = "text" value = "Username"></input> <br></br>
                <label style = {{marginRight:43}}>Email:</label>      <input type = "text" value = "Email" style = {{align:"right"}}></input> <br></br>
                <label style = {{marginRight:12}}>Password: </label>  <input type = "text" value = "Password"></input> <br></br>
                <label style = {{marginRight:32}}>Submit:</label>     <input type = "submit" value = "Submit"></input> 
            </form>
        </div>
    
    );
    
}; 
export default SignUp;