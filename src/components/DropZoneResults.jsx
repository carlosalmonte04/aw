import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Loader from './Loader'
import ActionButton from './ActionButton'

const DropZone = ({ fileName, className, resetParser, isLoading, parsedFile }) => {
  return (
    <Dropzone
      className={className}
      disabled
    >
      <ActionButton action="reset" onClick={resetParser} text="Upload New File"/>
      {isLoading 
        ? <p>Parsing file...</p> 
        : parsedFile 
          ? <p>Report succesfully parsed!</p>
          : <p>{fileName} ready to be parsed</p>}
    </Dropzone>
  )
}

const { func, bool, string } = PropTypes

DropZone.propTypes = {
  onDrop: func.isRequired,
  isLoading: bool.isRequired,
  error: string,
  fileName: string
}

export default DropZone
