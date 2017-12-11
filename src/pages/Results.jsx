import React from 'react';
import { Route } from 'react-router-dom'

import ResultsJSON from '../pages/ResultsJSON'
import ResultsPDF from '../pages/ResultsPDF'

const Results = () => {
  return (
    <div className="Results">
      <Route path="/results/pdf" component={ResultsPDF} />
      <Route path="/results/json" component={ResultsJSON} />
    </div>
  )
}

export default Results