import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
                {console.log("Rendered")}

                <form onSubmit={this.submitForm} onChange={this.changeForms} >
                    <TextField required id="nameForm" label="Required" defaultValue="John Smith" helperText = "Name" />
                    <br/>
                    <br/>

                    <TextField required id="wsTitleForm" label="Required" defaultValue="React Workshop" helperText = "Workshop Title" />
                    <br/>
                    <br/>

                    <Button variant="contained" type="submit" >Submit</Button>

                </form>
            </div>
        );

    }

}




export default Create;
