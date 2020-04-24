import React from 'react';
import clsx from 'clsx';
//import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


class JoinCode extends React.Component{
    constructor() {
        super();

    }



  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  //this.props.hostCode will contain nothing if there is no hostCode, aka if there is no room
  render() {

      return(

        <div>
          <InputLabel htmlFor="outlined-adornment-password">Join Code</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={this.props.joinCode}


            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={this.handleMouseDownPassword}
                  edge="end"
                  InputProps={{
                    readOnly: true,
                  }}
                >
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />

        </div>
        );
    }

}



export default JoinCode;
