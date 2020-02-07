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
      <div className="Buttons">
        <div class="vertical-center">
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
      </div>
    );
  }
}

export default Home;
