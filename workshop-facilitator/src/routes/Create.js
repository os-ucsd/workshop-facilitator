import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Create.css";

import {generateRandomCode} from '../utils';

class Create extends React.Component{
    constructor(){
        super();
        this.state = {
            nameForm: "",
            wsTitleForm: ""
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
        alert("Form Submitted: Name: " + this.state.nameForm + " Title: " + this.state.wsTitleForm);

        // generate random 4 digit code
        let joinCode = generateRandomCode();
        console.log(joinCode);
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
                <h1> Create page </h1>
                <NavLink to='/' >Back</NavLink>
                <form onSubmit={this.submitForm} onChange={this.changeForms} class = "CreateForm"  >
                    <TextField required id="nameForm" label="Required" defaultValue="" helperText = "Name: John Smith" />
                    <br/>
                    <br/>

                    <TextField required id="wsTitleForm" label="Required" defaultValue="" helperText = "Workshop Title: React Workshop" />
                    <br/>
                    <br/>

                    <Button variant="contained" type="submit" >Submit</Button>

                </form>
            </div>
        );

    }

}




export default Create;
