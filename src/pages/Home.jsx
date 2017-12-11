import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from '../components/Loader'

import ParserOptionsContainer from '../containers/ParserOptionsContainer'
import DropZoneResultsContainer from '../containers/DropZoneResultsContainer'
import ActionButtonsContainer from '../containers/ActionButtonsContainer'
import changeSelectedFormat from '../actions/changeSelectedFormat'
import parseCSV from '../actions/parseCSV'
import downloadFile from '../actions/downloadFile'
import resetParser from '../actions/resetParser'
import setCSVToParseOnState from '../actions/setCSVToParseOnState'
import setParsedFileOnState from '../actions/setParsedFileOnState'

class Home extends Component {

  state = {
    error: null,
    isLoading: false
  }

  handleResetParser = () => {
    this.props.resetParser()
  }

  handleSeeReport = () => {
    this.props.history.push('/results/pdf')
  }

  handleParseCSV = async (dispatch, forcedFormat) => {
    const { CSVToParse, selectedFormat, parseCSV } = this.props

    if (CSVToParse) {
      this.setState({ isLoading: true })
      await parseCSV(CSVToParse, (forcedFormat || selectedFormat))
      this.setState({ isLoading: false })
    }
    else {
      this.throwError('Select CSV to parse first')
    }
  }

  handleParserOptionChange = (e) => {
    const newSelectedFormat = e.target.id
    const { selectedFormat, parsedFile, changeSelectedFormat } = this.props

    if (newSelectedFormat !== selectedFormat && parsedFile) {
      changeSelectedFormat(newSelectedFormat)
      this.handleParseCSV(null, newSelectedFormat) // Allows users to parse existing CSV to another format
    }
    else {
      changeSelectedFormat(newSelectedFormat)
    }
  }

  handleFileDrop = (files, rejectedFiles) => {
    const reader = new FileReader()
    const fileName = files[0].name
    const that = this
    if (!fileName.toLowerCase().includes('.csv')) {
      this.handleResetParser()
      this.throwError('No .csv extension found in file name')
    }
    else {
      reader.onload = () => {
        const CSVToParse = reader.result
        that.props.setCSVToParseOnState(CSVToParse, fileName) // unparsed needed file for raw json
    }

      reader.readAsBinaryString(files[0])
    }
  }

  throwError = (error) => {
    this.setState({ error })
    setTimeout(() => this.setState({ error: null }), 5000)
  }

  render() {
    return (
      <div className="Home">
        <div className="logo-container" />
        <h1 className="title">CSV Parser</h1>
        {this.state.isLoading ? <Loader /> : null}
        <ParserOptionsContainer
          selectedFormat={this.props.selectedFormat}
          handleParserOptionChange={this.handleParserOptionChange}
        />
        <DropZoneResultsContainer
          onDrop={this.handleFileDrop}
          isLoading={this.state.isLoading}
          error={this.state.error}
          frontSideAway={!!this.props.CSVToParse}
          resetParser={this.handleResetParser}
          fileName={this.props.fileName}
          parsedFile={this.props.parsedFile}
        />
        <ActionButtonsContainer
          parsedFile={this.props.parsedFile}
          CSVToParse={this.props.CSVToParse}
          isLoading={this.state.isLoading}
          handleParseCSV={this.handleParseCSV}
          handleSeeReport={this.handleSeeReport}
          handleDownloadFile={() => this.props.downloadFile(this.props.parsedFile)}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelectedFormat: selectedFormat => dispatch(changeSelectedFormat(selectedFormat)),
    parseCSV: (file, selectedFormat) => dispatch(parseCSV(file, selectedFormat)),
    resetParser: () => dispatch(resetParser()),
    setCSVToParseOnState: (CSV, fileName) => dispatch(setCSVToParseOnState(CSV, fileName)),
    setParsedFileOnState: file => dispatch(setParsedFileOnState(file)),
    downloadFile: parsedFile => dispatch(downloadFile(parsedFile))
  }
}

function mapStateToProps(state) {
  return {
    selectedFormat: state.selectedFormat,
    parsedFile: state.parsedFile,
    CSVToParse: state.CSVToParse,
    fileName: state.fileName
  }
}

const {
  string,
  func,
  instanceOf
} = PropTypes

Home.defaultProps = {
  parsedFile: new Blob(),
  fileName: 'no name'
}

Home.propTypes = {
  selectedFormat: string.isRequired,
  parsedFile: instanceOf(Blob),
  CSVToParse: string, // is actually a file but csv gives files as comma separated 'strings'
  fileName: string,
  changeSelectedFormat: func.isRequired,
  parseCSV: func.isRequired,
  resetParser: func.isRequired,
  setCSVToParseOnState: func.isRequired,
  setParsedFileOnState: func.isRequired,
  downloadFile: func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
