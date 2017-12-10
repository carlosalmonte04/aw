import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Loader from './Loader'

const DropZone = ({ onDrop, isLoading, error, className }) => {
  return (
    <Dropzone
      onDrop={onDrop}
      className={className}
      acceptClassName="accepted"
      rejectClassName="rejected"
      multiple={false}
    >
      {error ? <div className="error-container"><p>{error}</p></div> : null }
      <p>Try dropping a CSV file here, or click to select CSV to upload.</p>
    </Dropzone>
  )
}

const { func, bool, string } = PropTypes

DropZone.propTypes = {
  onDrop: func.isRequired,
  isLoading: bool.isRequired,
  error: string
}

export default DropZone
