import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Create.css";

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
        alert("Form Submitted: Name: " + this.state.nameForm + " Title: " + this.state.wsTitleForm);

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
