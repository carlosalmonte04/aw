import React, { Component } from 'react';
import Home from './pages/Home'
import Results from './pages/Results'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/results" component={Results} />
        </div>
      </Router>
    );
  }
}

export default App;
