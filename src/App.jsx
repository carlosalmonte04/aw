import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import './App.css'

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
          <Route exact path="/" render={({ history }) => <Home history={history} handlePDFchange={this.handlePDFchange} />} />
          <Route path="/results" render={({ history }) => <Results history={history} PDFFile={this.state.PDFFile} />} />
        </div>
      </Router>
    )
  }
}

export default App
