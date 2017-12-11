import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './index.css'
import filesReducer from './reducers/filesReducer'
import App from './App.jsx'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(filesReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker()
