import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import "../styles/Join.css";

class Join extends React.Component {
    constructor() {
        super();
        this.state = {
          roomCode: "",
          valid: true,
          onlyNums: true,
          fourNums: true,
        };

        this.checkRooms = this.checkRooms.bind(this);
    }


    changeForms = (evt) => {
        this.setState({
            [evt.target.id]: evt.target.value
        })
    }



    submitForm = e => {
        e.preventDefault();
        //reset for evaluation
        this.setState({onlyNums: true});
        this.setState({fourNums: true});

        //need to check to see if they even entered all integers, could be text as well.
        let code  = this.state.roomCode;

        let isnum = /^\d+$/.test(code); //is it all numbers?

        if(isnum && code.length == 4){
            // make axios call to a route that checks if there's a room with the given 4 digit code
            // if so, send the room's info (could just send the id) to the user view page

            fetch('http://localhost:5000/rooms/', {
                method: 'get',
            })
            .then((resp) => resp.json())
            // if success and data was sent back, log the data
            .then((data) => this.checkRooms(data, this.state.roomCode))
            // if failure, log the error
            .catch((err) => console.log("Error", err));



        }else{
            if(!isnum){
                alert("code is not a number");
                this.setState({onlyNums: false});
                this.setState({valid: false});
            }else if(code.length != 4){
                alert("code is 4 digits!");
                this.setState({fourNums: false});
                this.setState({valid: false});

            }
        }






        /* send props to user view page (change to /user when component created)
        this.props.history.push({
          pathname: "/host",
          state: {

          }
        })
        */
    };

  /* old style for button
        <Link to="/" className="back">
          <Button width="100%" variant="contained" color="primary">
            Home
          </Button>
        </Link>


  */

checkRooms(rooms, code){
    //host code 9485 works
    //join code 7317 works
    let flagValid = false;
    console.log("Here are all the rooms", rooms);
    for(const room of rooms){
        if(code == room.hostCode){ //don't type check as well, cuz code is a string
            console.log("This is a host code!");
            //resolve host code
            flagValid = true;
            //this.props.history.push(`/customers/${customer.id}`);/
            this.props.history.push(`/host`, {roomID: room._id});//now just sends the room ID instead of obj
            //window.location.replace('http://localhost:3000/host');
            break;
        }else if(code == room.joinCode){
            console.log("This is a join code!");
            //resolve join code
            flagValid = true;
            this.props.history.push(`/user`, {roomID: room._id}); //now just sends the room ID instead of obj

            break;
        }
  }
  if(!flagValid){
      alert("code is not valid");
      //setOpen(true);
  }
}



    render() {
        //const { history } = this.props;

        return (
          <div className="Join">
            <div className="backButton">
              <Button width="100%" variant="contained" color="primary" href="/">
                Home
              </Button>
            </div>
            <div className="vertical-center">
                <h1>Enter the workshop code!</h1>
                <form noValidate autoComplete="off" onSubmit={this.submitForm} onChange={this.changeForms}>
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
                    <Button width="100%" variant="contained" color="secondary" type = "submit">
                      Join
                    </Button>
                </form>
                {incorrectCode(this.state.onlyNums, this.state.fourNums)}

            </div>
          </div>
        );
      }







}




function incorrectCode( onlyNums, fourNums){
    if(!onlyNums){
        return (<h3> The code only has numbers! </h3>);
    }else if (!fourNums){
        return (<h3> The code is 4 digits long! </h3>);
    }

}


/*
function checkRooms(rooms, code){
    //host code 9485 works
    //join code 7317 works
    let flagValid = false;
    console.log("Here are all the rooms", rooms);
    for(const room of rooms){
        if(code == room.hostCode){ //don't type check as well, cuz code is a string
            console.log("This is a host code!");
            //resolve host code
            flagValid = true;
            //this.props.history.push(`/customers/${customer.id}`);/
            //this.props.history.push(`http://localhost:3000/host/${room}`);
            window.location.replace('http://localhost:3000/host');
            break;
        }else if(code == room.joinCode){
            console.log("This ia a join code!");
            //resolve join code
            flagValid = true;
            window.location.replace('http://localhost:3000/user');
            break;
        }
  }
  if(!flagValid){
      alert("code is not valid");
      //setOpen(true);
  }
}

*/



export default Join;
