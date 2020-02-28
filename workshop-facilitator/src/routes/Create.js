import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "../styles/Create.css";

import {generateRandomCode} from '../utils';


class Create extends React.Component{
    constructor(){
        super();
        this.state = {
            nameForm: "",
            wsTitleForm: "",
            wsDescripForm: ""
        }

    }


    changeForms = (evt) => {
        this.setState({
            [evt.target.id]: evt.target.value
        })
    }

    submitForm = (evt) => {
        // prevents default action of form submit (which is a page refresh)
        evt.preventDefault();
        alert("Form Submitted: Name: " + this.state.nameForm + " Title: " + this.state.wsTitleForm
        + "Description: " + this.state.wsDescripForm);

        // generate random 4 digit code
        let joinCodeHost = generateRandomCode();
        console.log("joinCodeHost: " + joinCodeHost);
        let joinCodeUser = generateRandomCode();
        console.log("joinCodeUser: " + joinCodeUser);

        //Make sure they aren't equal, keep generating untill not equal
        while(joinCodeHost === joinCodeUser){
            joinCodeUser = new generateRandomCode();
        }

        let userData = { "nameForm" : this.state.nameForm,
                "wsTitleForm": this.state.wsTitleForm,
                "wsDescriptForm": this.state.wsDescripForm,
                "joinCodeHost": joinCodeHost,
                "joinCodeUser": joinCodeUser
            };

        console.log(userData);

        fetch('http://localhost:5000/rooms/create', {
            // send as a POST request with new room information in body,
            //POST fetch("the API route that creates the room, like /rooms/create", {method: "POST", body:
            //{data to pass in, such as room name, description, etc.}})
            method: 'post',
            headers: {"Content-Type" : "application/json"}, //have to specify content type as json, or else server thinks its something else;
            body: JSON.stringify(userData)
        })
        //using .text() instead of .json to avoid errors
        .then((resp) => resp.text())
        // if success and data was sent back, log the data
        .then((data) => console.log("Success", data))
        // if failure, log the error
        .catch((err) => console.log("Error", err));

        /*
        to check for uniqueness: will need to do a database query to get all rooms
        then loop through them and see if any of them contain joinCode

        Use a while loop:
        let joinCode = generateRandomCode();
        const listOfRooms = some query to get all rooms

        for (let i = 0; i < listOfRooms.length; i++){
            if (joinCode == listOfRooms[i].joinCode){
                // get new join code
                joinCode = generateRandomCode();
                // reset the for loop to check for all rooms again
                i = 0;
            }
        }
        */
    }

    render(){

        return(
            <div>
                <div className = "BackButton">
                    <Button variant="contained" color="primary" href="/">
                      Home
                    </Button>
                </div>
                <h1 className = "Title"> Create your workshop </h1>
                <form onSubmit={this.submitForm} onChange={this.changeForms} className = "CreateForm"  >
                    <TextField required multiline fullWidth id="nameForm" label="Name: John Smith" defaultValue="" helperText = "Required" />
                    <br/>
                    <br/>

                    <TextField required multiline fullWidth id="wsTitleForm" label="Workshop Title: React Workshop" defaultValue="" helperText = "Required" />
                    <br/>
                    <br/>

                    <TextField required multiline fullWidth id="wsDescripForm" label="Description: Learn some React!" defaultValue="" helperText = "Requried" />
                    <br/>
                    <br/>

                    <div className = "SubmitButton" > <Button variant="contained" type="submit" >Submit</Button> </div>

                </form>
            </div>
        );

    }

}




export default Create;
