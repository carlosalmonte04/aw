import React from 'react'
import DropZone from '../components/DropZone'
import DropZoneResults from '../components/DropZoneResults'

const DropZoneResultsContainer = (props) => {
  const { frontSideAway } = props
  return (
    <div>
      <div className="box3d-container" >
        <div className="animated fadeIn">
          <DropZone { ...props } className={`dropzone ${frontSideAway ? 'away' : ''}`} />
          <DropZoneResults { ...props } className={`dropzone results ${!frontSideAway ? 'away' : ''}`} />
        </div>
      </div>
    </div>
  )
}

export default DropZoneResultsContainer
