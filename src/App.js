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

  state = {
    PDFFile: null
  }

  handlePDFchange = (PDFFile, callback) => {
    this.setState({ PDFFile }, callback)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={({ history }) => <Home history={history} handlePDFchange={this.handlePDFchange}/>} />
          <Route path="/results" render={({ history }) => <Results history={history} PDFFile={this.state.PDFFile} />} />
        </div>
      </Router>
    );
  }
}

export default App;
