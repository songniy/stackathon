import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
//import * as serviceWorkerRegistration from '../public/sw.js'
import history from './history'
import store from './store'
import App from './app'
import _ from 'lodash'
// establishes socket connection
import './socket'

console.log('at index.js-the start')

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

//serviceWorkerRegistration.register()
