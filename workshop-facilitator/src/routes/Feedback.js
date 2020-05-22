import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from "react-router-dom";

import "../styles/Feedback.css";

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      room: null,
      feedback: false,
      valid: false
    };
  }

    componentDidMount(){
        //get fetches the room by ID if the ID was sent,saves in state
        if(this.props.location.state != null){
            console.log("Here is the ID: " + this.props.location.state.roomID);
            //this.setState( {roomID: this.props.location.state.roomID} );
            //console.log("Here is the ID that was passed: " +  this.state.roomID);
            let getString = "http://localhost:5000/rooms/" + this.props.location.state.roomID;
            console.log("getString: " + getString);

            fetch(getString, {
                method: 'get',
            })
            .then((resp) => resp.json())
            // if success and data was sent back, log the data
            .then((data) => this.setState({ room: data}) )
            // if failure, log the error
            .catch((err) => console.log("Error", err));
      }
    }

    handleChange = (e) => { 
        this.setState({
            [e.target.id]: e.target.value
        })
        if(this.state.email!=="") {
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
        let emailData = {"email" : this.state.email}
        let getRoom = 'http://localhost:5000/rooms/' + this.state.room._id + '/feedback/add';
        console.log('getRoom: ' + getRoom);

        if(this.state.feedback) {
          fetch(getRoom, {
              // send as a POST request with new room information in body,
              //POST fetch("the API route that adds a new email, {method: "POST", body:
              //{email data to pass in}})
              method: 'post',
              headers: {"Content-Type" : "application/json"}, //have to specify content type as json, or else server thinks its something else;
              body: JSON.stringify(emailData)
          })
          //using .text() instead of .json to avoid errors
          .then((resp) => resp.json())
          // if success and data was sent back, log the data
          .then((data) => handleSuccess(data))
          // if failure, log the error
          .catch((err) => console.log("Error", err));
      }

        this.props.history.push(`/user`, {roomID: this.state.room._id});
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
                <h1>Enter your email if you would like feedback after the workshop!</h1>
                <form noValidate autoComplete="off" onSubmit={this.submitForm} onChange = {this.handleChange} className="FollowupForm">
                  <TextField
                    id="email"
                    label="e-mail"
                    defaultValue=""
                  />
                  <br />
                  <br />
                  <br />
                  <FormLabel>I would not like feedback</FormLabel>
                  <Checkbox id="feedback" color="primary" onClick={this.handleChange}></Checkbox>
                  <br />
                  <br />
                  <br />
                    <Button type="submit" onClick={this.submitForm} width="100%" variant="contained" color="secondary">
                      Join
                    </Button>                  
                </form>
            </div>
          </div>
        );
      }
  }

function handleSuccess(data){
  console.log("Success. here is the resp.() dump: ", data);
}

export default Feedback;
