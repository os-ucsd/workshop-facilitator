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
            wsDescripForm: "",
            rooms: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/rooms/', {
            method: 'get',
        })
        .then((resp) => resp.json())
        // if success and data was sent back, log the data
        .then((data) => this.setState( {rooms: data} ))
        // if failure, log the error
        .catch((err) => console.log("Error", err));

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

        /*
        to check for uniqueness: will need to do a database query to get all rooms
        then loop through them and see if any of them contain joinCode

        Use a while loop:
        */
        const listOfRooms = this.state.rooms;

        for (let i = 0; i < listOfRooms.length; i++){
            if (joinCodeUser == listOfRooms[i].joinCode){
                // get new join code
                joinCodeUser = generateRandomCode();
                // reset the for loop to check for all rooms again
                i = 0;
            }

        }

        for( let i = 0; i < listOfRooms.length; i++){
            if(joinCodeHost == listOfRooms[i].hostCode){
                //get new host Code
                joinCodeHost = generateRandomCode();
                //reset for loop
                i = 0;
            }
        }

        console.log("Here are checked codes: Host, Join: " + joinCodeHost + " ," + joinCodeUser);



        let userData = { "nameForm" : this.state.nameForm,
                "wsTitleForm": this.state.wsTitleForm,
                "wsDescriptForm": this.state.wsDescripForm,
                "joinCodeHost": joinCodeHost,
                "joinCodeUser": joinCodeUser
            };

        console.log("User data: " + userData);







        fetch('http://localhost:5000/rooms/create', {
            // send as a POST request with new room information in body,
            //POST fetch("the API route that creates the room, like /rooms/create", {method: "POST", body:
            //{data to pass in, such as room name, description, etc.}})
            method: 'post',
            headers: {"Content-Type" : "application/json"}, //have to specify content type as json, or else server thinks its something else;
            body: JSON.stringify(userData)
        })
        //have to use .json instead of .text becuase we want to remain in json format/object not text
        .then((resp) => resp.json() )
        // if success and data was sent back, log the data
        .then((data) => this.props.history.push('/host', {roomID: data._id } ) )//will send ID of newly created room
        // if failure, log the error
        .catch((err) => console.log("Error", err));




    }

    render(){

        return(
            <div>
                <div className = "BackButton">
                    <Button variant="contained" color="primary" href="/" className = "BackButton">
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
    function handleSuccess(data){
        console.log("Success. here is the resp.() dump: ", data);
        //window.location.replace('http://localhost:3000/host'); this.props.history.push
    }




export default Create;
