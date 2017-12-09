import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import fileDownload from 'js-file-download'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import ParserOptions from '../components/ParserOptions'

import parseFile from '../actions/parseFile'
import setFileToParseOnState from '../actions/setFileToParseOnState'
import setParsedFileOnState from '../actions/setParsedFileOnState'

class Home extends Component {

  state = {
    isToPDFChecked: true, // parse to pdf
    isToHashtableChecked: false, // parse to hashtable
    error: null,
    isLoading: false
  }

  handleDownloadReport = () => {
    fileDownload(this.state.file, 'new name.pdf')
  }

  handleSeeReport = () => {
    this.props.history.push('/results')
  }

  handleParse = async () => {
    if (this.props.fileToParse) {
      this.setState({ isLoading: true })
      const parsedFile = await this.props.parseFile(this.state.fileToParse)
      this.setState({ isLoading: false })
      } else {
        this.setState({error: 'Upload CSV first'})
        setTimeout(() => this.setState({error: null}), 2000)
      }
  }

  handleParserOptionChange = () => {
    this.setState({
      isToPDFChecked: !this.state.isToPDFChecked,
      isToHashtableChecked: !this.state.isToHashtableChecked,
    })
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const reader = new FileReader()
    const that = this

    reader.onload = () => {
      const fileToParse = reader.result
      that.props.setFileToParseOnState(fileToParse)
      that.props.setParsedFileOnState(null)
    }

    reader.readAsBinaryString(acceptedFiles[0])
  }

  render() {
    const { error, isLoading } = this.state
    const { parsedFile, fileToParse } = this.props
    return (
      <div className="Home">
        <div className="logo-container" />
        <h1 className="title">CSV Parser</h1>
        <ParserOptions isToPDFChecked={this.state.isToPDFChecked} handleParserOptionChange={this.handleParserOptionChange} />
        <Dropzone
          onDrop={this.onDrop}
          className="dropzone"
          acceptClassName="accepted"
          rejectClassName="rejected"
          multiple={false}
        >
          {isLoading ? <Loader /> : null}
          {error ? <div className="error-container"><p>{error}</p></div> : null }
          <p>Try dropping a CSV file here, or click to select CSV to upload.</p>
        </Dropzone>
        {parsedFile 
          ? <div className="btns-container">
              <button className="btn see" onClick={this.handleSeeReport}>See Report</button> 
              <button className="btn download" onClick={this.handleDownloadReport}>Download Report</button> 
            </div>
          : <button className={`btn parse ${!fileToParse ? 'disabled' : '' }`} onClick={this.handleParse}>Parse CSV</button>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    parseFile: file => dispatch(parseFile(file)),
    setFileToParseOnState: file => dispatch(setFileToParseOnState(file)),
    setParsedFileOnState: file => dispatch(setParsedFileOnState(file))
  }
}

function mapStateToProps(state) {
  return {
    parsedFile: state.parsedFile,
    fileToParse: state.fileToParse
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
