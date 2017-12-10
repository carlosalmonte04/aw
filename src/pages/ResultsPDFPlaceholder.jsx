import React, { Component } from 'react'
import ActionButton from '../components/ActionButton'
import downloadFile from '../actions/downloadFile'
import getJSON from '../actions/getJSON'


const ResultsPDFPlaceholder = ({ status }) => {
    return(
      <div className="Example loading">
        <div className="Example__container__document">
          <div className="placeholders-container">
            <div className="placeholder logo-placeholder" />
            <div className="placeholder title-placeholder" />
            <div className="line" />
            <div className="content-placeholder" />
          </div>
          {status === 'loading' ? null : <h1 style={{margin: '50px auto'}}>No data</h1>}

        </div>
        <div className="download-btns-container">
        </div>
      </div>
    )
}

export default ResultsPDFPlaceholder
