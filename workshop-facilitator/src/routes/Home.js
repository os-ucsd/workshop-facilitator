import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

import Create from "./Create";
import Join from "./Join";

class Home extends React.Component {
  render() {
    return(
      <div className="Buttons">
        <Link to ="/Create">
          <Button variant="contained" color="primary">
            Create
          </Button>
        </Link>
        <br/>
        <Link to="/Join">
          <Button variant="contained" color="secondary">
            Join
          </Button>
        </Link>
      </div>      
    );
  }
}
