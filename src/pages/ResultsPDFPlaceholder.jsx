import React from 'react'


const ResultsPDFPlaceholder = ({ status, history }) => {

  if (status === 'no data') history.push('/')
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
      </div>
    )
}

export default ResultsPDFPlaceholder
