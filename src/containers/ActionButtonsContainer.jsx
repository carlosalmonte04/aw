import React from 'react'
import ActionButton from '../components/ActionButton'

const ActionButtonsContainer = (props) => {
  if (props.parsedFile) {
    return (
      <div className="btns-container">
        <ActionButton action="see" onClick={props.handleSeeReport} text="See Document" />
        <ActionButton action="download" onClick={props.handleDownloadFile} text="Download Document" />
      </div>
    )
  } else {
      return <ActionButton action="parse" onClick={props.handleParseReport} text="Parse CSV" isDisabled={!props.fileToParse} />
  }
}

export default ActionButtonsContainer
