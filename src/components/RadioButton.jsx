import React from 'react'

const RadioButton = ({ id, isSelected, onClick, text }) => {
  return (
    <div>
      <label id={id} className={`radio-label ${isSelected ? 'checked' : ''}`} onClick={onClick} >{text}</label>
      <input className="radio" type="radio" name="parser-type" defaultChecked={isSelected} />
    </div>
  )
}

export default RadioButton
