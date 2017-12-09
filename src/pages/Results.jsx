import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'

class Results extends Component {

  state = {
    numPages: 1,
    pageNumber: 1
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file={this.props.parsedFile}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parsedFile: state.parsedFile
  }
}
export default connect(mapStateToProps)(Results)