import React, { Component } from 'react'
import fileDownload from 'js-file-download'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import ParserOptions from '../components/ParserOptions'
import DropZoneResultsContainer from '../containers/DropZoneResultsContainer'
import ActionButtonsContainer from '../containers/ActionButtonsContainer'

import parseFile from '../actions/parseFile'
import downloadFile from '../actions/downloadFile'
import resetParser from '../actions/resetParser'
import setFileToParseOnState from '../actions/setFileToParseOnState'
import setParsedFileOnState from '../actions/setParsedFileOnState'

class Home extends Component {

  state = {
    selectedFormat: 'report',
    error: null,
    isLoading: false,
  }

  handleResetParser = () => {
    this.props.resetParser()
  }

  handleSeeReport = () => {
    this.props.history.push('/results/pdf')
  }

  handleParseReport = async () => {
    if (this.props.fileToParse) {
      this.setState({ isLoading: true })
      const parsedFile = await this.props.parseFile(this.props.fileToParse, this.state.selectedFormat)
      this.setState({ isLoading: false })
    } else {
      this.throwError('Upload CSV first')
      }
  }

  handleParserOptionChange = (e) => {
    const selectedFormat = e.target.id
    if (this.state.selectedFormat != selectedFormat && this.props.parsedFile) {
      this.setState({
        selectedFormat
      }, () => this.handleParseReport())
    } else {
      this.setState({ selectedFormat })
    }
  }

  handleFileDrop = (files, rejectedFiles) => {
    const reader = new FileReader()
    const fileName = files[0].name
    const that = this
    if (!fileName.toLowerCase().includes('.csv')) {
      this.handleResetParser()
      this.throwError('No .csv extension found in file name')
    } else {
      reader.onload = () => {
        const fileToParse = reader.result
        that.props.setFileToParseOnState(fileToParse, fileName)
        that.props.setParsedFileOnState(null)
      }

      reader.readAsBinaryString(files[0])
    }
  }

  throwError = (error) => {
    this.setState({ error })
    setTimeout(() => this.setState({ error: null }), 5000)
  }

  render() {
    const { error, isLoading } = this.state
    const { parsedFile, fileToParse } = this.props
    return (
      <div className="Home">
        <div className="logo-container" />
        <h1 className="title">CSV Parser</h1>
        {isLoading ? <Loader /> : null}
        <ParserOptions 
          selectedFormat={this.state.selectedFormat}
          handleParserOptionChange={this.handleParserOptionChange}
        />
        <DropZoneResultsContainer
          onDrop={this.handleFileDrop}
          isLoading={this.state.isLoading}
          error={this.state.error}
          frontSideAway={!!this.props.fileToParse}
          resetParser={this.handleResetParser}
          fileName={this.props.fileName}
          parsedFile={this.props.parsedFile}
        />
        <ActionButtonsContainer 
          parsedFile={parsedFile}
          fileToParse={fileToParse}
          handleParseReport={this.handleParseReport}
          handleSeeReport={this.handleSeeReport}
          handleDownloadFile={() => this.props.downloadFile(this.props.parsedFile)}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    parseFile: (file, selectedFormat) => dispatch(parseFile(file, selectedFormat)),
    resetParser: () => dispatch(resetParser()),
    setFileToParseOnState: (file, fileName) => dispatch(setFileToParseOnState(file, fileName)),
    setParsedFileOnState: file => dispatch(setParsedFileOnState(file)),
    downloadFile: (parsedFile) => dispatch(downloadFile(parsedFile))
  }
}

function mapStateToProps(state) {
  return {
    parsedFile: state.parsedFile,
    fileToParse: state.fileToParse,
    fileName: state.fileName
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
