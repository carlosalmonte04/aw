import React from 'react'

const ParserOptions = ({ selectedFormat, handleParserOptionChange }) => {
  const isSelectedOptionPdf = (selectedFormat === 'report')
  return (
    <div className="radios-container">
      <label id="report" className={`radio-label ${isSelectedOptionPdf ? 'checked' : ''}`} onClick={handleParserOptionChange}>to Report</label>
      <input className="radio" type="radio" name="parser-type" defaultChecked={isSelectedOptionPdf} />
      <label id="json" className={`radio-label ${!isSelectedOptionPdf ? 'checked' : ''}`} onClick={handleParserOptionChange}>to JSON</label>
      <input className="radio" type="radio" name="parser-type" defaultChecked={!isSelectedOptionPdf}/>
    </div>
  )
}

export default ParserOptions