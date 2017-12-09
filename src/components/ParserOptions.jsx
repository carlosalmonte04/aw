import React from 'react'

const ParserOptions = ({ isToPDFChecked, handleParserOptionChange }) => {
  console.log("IST", isToPDFChecked)
  return (
    <div className="radios-container">
      <label className={`radio-label ${isToPDFChecked ? 'checked' : ''}`} onClick={handleParserOptionChange}>to PDF</label>
      <input className="radio" type="radio" name="parser-type" defaultChecked={isToPDFChecked} />
      <label className={`radio-label ${!isToPDFChecked ? 'checked' : ''}`} onClick={handleParserOptionChange}>to Hashtable</label>
      <input className="radio" type="radio" name="parser-type" defaultChecked={!isToPDFChecked}/>
    </div>
  )
}

export default ParserOptions