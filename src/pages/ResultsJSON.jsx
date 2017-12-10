import React from 'react'
import { connect } from 'react-redux'
import JSONPretty from 'react-json-pretty'
import ActionButton from '../components/ActionButton'
import copy from 'copy-to-clipboard'

const ResultsJSON = ({ json }) => {
  return (
    <div className="json-container">
      <JSONPretty id="json-pretty" json={json}></JSONPretty>
      <div className="download-btns-container">
        <ActionButton action="copy" onClick={() => copy(JSON.stringify(json, null, 2))} text="Copy to Clipboard" />
      </div>
    </div>
  )
}

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch: () => discopyToClipboard
//   }
// }

function mapStateToProps(state) {
  return {
    json: state.json
  }
}

export default connect(mapStateToProps)(ResultsJSON)
