import React from 'react'
import ActionButton from '../components/ActionButton'

const ActionButtonsContainer = (props) => {
  if (props.parsedFile) {
    return (
      <div className="btns-container">
        <ActionButton action="see" onClick={props.handleSeeReport} text="See Document" isDisabled={props.isLoading}/>
        <ActionButton action="download" onClick={props.handleDownloadFile} text="Download Document" isDisabled={props.isLoading}/>
      </div>
    )
  } else {
      return <ActionButton action="parse" onClick={props.handleParseCSV} text="Parse CSV" isDisabled={!props.CSVToParse || props.isLoading} />
  }
}

export default ActionButtonsContainer
