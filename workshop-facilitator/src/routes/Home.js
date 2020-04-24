import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
          <h1>WORKSHOP FACILITATOR</h1> <br/>
          <div className="Buttons">
            <div className="createBtnContainer">
              <Button fullWidth={true} variant="contained" color="primary" href="/create">
                Create
              </Button>
            </div>
            <div className="joinBtnContainer">
              <Button fullWidth={true} variant="contained" color="secondary" href="/join">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
