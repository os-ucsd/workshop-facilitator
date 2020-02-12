import React from 'react';

import Button from '@material-ui/core/Button';

class Create extends React.Component{
    constructor(){
        super();

    }



    submitForm = (evt) => {
        console.log(evt.target);

    }

    render(){

        return(
            <div>
                <h1> Create page </h1>

                <form onSubmit={this.submitForm} >


                    <Button variant="contained" type="submit">Submit</Button>

                </form>
            </div>
        );

    }

}




export default Create;
