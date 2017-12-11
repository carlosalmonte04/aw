import React from 'react'
import RadioButton from '../components/RadioButton'

const ParserOptions = ({ selectedFormat, handleParserOptionChange }) => {
  const isSelectedOptionReport = (selectedFormat === 'report')
  return (
    <div className="radios-container">
      <RadioButton id="report" isSelected={isSelectedOptionReport} onClick={handleParserOptionChange} text="to Report" />
      <RadioButton id="json" isSelected={!isSelectedOptionReport} onClick={handleParserOptionChange} text="to JSON" />
    </div>
  )
}

export default ParserOptions