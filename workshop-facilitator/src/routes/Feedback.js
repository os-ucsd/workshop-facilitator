import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import { BrowserRouter as Router, Link } from "react-router-dom";

import "../styles/Feedback.css";

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      roomCode: "",
      feedback: false,
      valid: false
    };
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
    if(this.state.email!="") {
      this.setState({
        feedback: true
      })
    }
}

  submitForm = e => {
    e.preventDefault();
    console.log(e.target);
    console.log(this.state.feedback);
    this.setState({
      valid: true //Handle code validation here
    });
  };

  render() {
    return (
      <div>
        <Link to="/join" className="back">
          <Button width="100%" variant="contained" color="primary">
            Back
          </Button>
        </Link>
        <div className="vertical-center">
            <h1>Enter your name and email if you would like feedback after the workshop!</h1>
            <form noValidate autoComplete="off" onSubmit={this.submitForm} class="FollowupForm">
              <TextField
                required
                id="name"
                label="Name"
                defaultValue=""
              />
              <br />
              <br />
              <br />
              <TextField
                required
                id="email"
                label="e-mail"
                defaultValue=""
              />
              <br />
              <br />
              <br />
              <FormLabel>I would not like feedback</FormLabel>
              <Checkbox></Checkbox>
              <br />
              <br />
              <br />
              <Link to="/user" className="userLink" color="secondary">
                <Button width="100%" variant="contained" color="secondary">
                  Join
                </Button>
              </Link>
              
            </form>
        </div>
      </div>
    );
  }
}

export default Feedback;
