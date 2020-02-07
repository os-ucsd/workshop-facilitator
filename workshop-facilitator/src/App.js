import React from 'react';
import {BrowserRouter as Router} from 'react-router';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/host" component={Host}/>
      </Router>
    </div>
  );
}

export default App;
