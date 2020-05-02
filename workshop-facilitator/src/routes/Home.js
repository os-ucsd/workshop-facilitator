import React from 'react';
import Button from '@material-ui/core/Button';
import "../styles/Home.css";

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
