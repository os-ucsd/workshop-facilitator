import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "../styles/Join.css";

class Join extends React.Component {
  constructor() {
    super();
    this.state = {
      roomCode: "",
      valid: false
    };
  }

  submitForm = e => {
    e.preventDefault();
    console.log(e.target);
    this.setState({roomCode: e.target.value})
    console.log("State of roomCode: " + this.state.roomCode);
    this.setState({
        valid: true //Handle code validation here

    });
    // make axios call to a route that checks if there's a room with the given 4 digit code
    // if so, send the room's info (could just send the id) to the user view page

    fetch('http://localhost:5000/rooms/', {
        method: 'get',
    })
    .then((resp) => resp.json())
    // if success and data was sent back, log the data
    .then((data) => console.log("Success", data))
    // if failure, log the error
    .catch((err) => console.log("Error", err));


    /* send props to user view page (change to /user when component created)
    this.props.history.push({
      pathname: "/host",
      state: {

      }
    })
    */
  };

  render() {
    return (
      <div className="Join">
        <Link to="/" className="back">
          <Button width="100%" variant="contained" color="primary">
            Home
          </Button>
        </Link>
        <div className="vertical-center">
            <h1>Enter the workshop code!</h1>
            <form noValidate autoComplete="off" onSubmit={this.submitForm}>
              <TextField
                required
                id="roomCode"
                label="4-Digit Code"
                defaultValue=""
                helperText="example: 1234"
              />
              <br />
              <br />
              <br />
        //    <Link to="/user" className="userLink" color="secondary"> , Need to verify first
                <Button width="100%" variant="contained" color="secondary" type = "submit">
                  Join
                </Button>
         //     </Link>
            </form>
        </div>
      </div>
    );
  }
}

export default Join;
