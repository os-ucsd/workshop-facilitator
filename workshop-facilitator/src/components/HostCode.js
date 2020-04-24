import React from 'react';
import clsx from 'clsx';
//import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


class HostCode extends React.Component{
    constructor() {
        super();

        this.state = {
            showPassword: false
        };
    }


  handleClickShowPassword = () => {
      this.setState({showPassword: !this.state.showPassword});
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  //this.props.hostCode will contain nothing if there is no hostCode, aka if there is no room
  render() {

      return(

        <div>
          <InputLabel htmlFor="outlined-adornment-password">Host Code</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.props.hostCode}


            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  edge="end"
                  InputProps={{
                    readOnly: true,
                  }}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />

        </div>
        );
    }

}



export default HostCode;
