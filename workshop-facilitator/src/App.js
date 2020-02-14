import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Host from "./routes/Host";
import Create from "./routes/Create";
import Home from "./routes/Home";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/host" component={Host}/>
        <Route exact path="/create" component={Create}/>
      </Router>
    </div>
  );
}

export default App;
