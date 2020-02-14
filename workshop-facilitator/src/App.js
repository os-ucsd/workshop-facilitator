import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Host from "./routes/Host"
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
