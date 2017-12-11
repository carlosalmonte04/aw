import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page, setOptions } from 'react-pdf';
import ActionButton from '../components/ActionButton'
import ResultsPDFPlaceholder from './ResultsPDFPlaceholder'
import downloadFile from '../actions/downloadFile'
import getJSON from '../actions/getJSON'

setOptions({
  cMapUrl: 'cmaps/',
  cMapPacked: true,
});

class ResultsPDF extends Component {

  state = {
    file: this.props.parsedFile,
    numPages: null,
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    })
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages,
    })
  }

  handleGetJSON = async () => {
    this.props.getJSON(this.props.CSV)
    .then(() => this.props.history.push('/results/json'))
  }

  render() {
    const { file, numPages } = this.state;
    return(
      <div className="Example">
        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess}
            loading={<ResultsPDFPlaceholder status="loading"/>}
            noData={<ResultsPDFPlaceholder status="no data" history={this.props.history}/>}
          >
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
          </Document>
        </div>
        <div className="download-btns-container">
          <ActionButton action="download" onClick={() => this.props.downloadFile(this.props.parsedFile)} text="Download Report" />
          <ActionButton action="see-raw-json" onClick={this.handleGetJSON} text="Raw Json" />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downloadFile: parsedFile => dispatch(downloadFile(parsedFile)),
    getJSON: fileToParse => dispatch(getJSON(fileToParse))
  }
}

function mapStateToProps(state) {
  return {
    parsedFile: state.parsedFile,
    CSV: state.CSVToParse,
    jsonFile: state.jsonFile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPDF)