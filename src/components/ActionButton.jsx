import React from 'react'
import PropTypes from 'prop-types'

const ActionButton = ({ action, text, isDisabled, onClick }) => {
  return (
    <button className={`btn ${action} ${isDisabled ? 'disabled' : ''}`} onClick={onClick}>{text}</button> 
  )
}

const { string, bool, func } = PropTypes

ActionButton.propTypes = {
  action: string.isRequired,
  text: string.isRequired,
  isDisabled: bool,
  onClick: func.isRequired
}

export default ActionButton