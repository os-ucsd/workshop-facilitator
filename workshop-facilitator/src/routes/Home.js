import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { sizing } from '@material-ui/system';
import Create from "./Create";
import Join from "./Join";

import "../styles/Home.css";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

class Home extends React.Component {
  render() {
    return(
      <div className="Home">
        <div className="vertical-center">
          <h1>Are you creating or joining?</h1> <br/>
          <div className="Buttons">
            <Link to ="/create" className="createLink">
              <Button width="10%" variant="contained" color="primary">
                Create
              </Button>
            </Link>
            <Link to="/join" className="joinLink">
              <Button width="100%"variant="contained" color="secondary">
                Join
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
