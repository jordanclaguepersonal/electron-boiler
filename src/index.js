import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './redux/reducers'
import App from './components/App/App.jsx'
import initialState from './redux/initialState'

ReactDOM.render(
  <Provider store={createStore(reducers, initialState)}>
    <App />
  </Provider>,
  document.getElementById('app')
)
