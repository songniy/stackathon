import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
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
      {/* {'serviceWorker' in navigator ? (
        console.log(
          'service worker test',
          'serviceWorker' in navigator
        )(
          <script>
            {
              // Use the window load event to keep the page load performant
              window.addEventListener('load', () => {
                navigator.serviceWorker
                  .register('../service-worker.js')
                  .then((reg) =>
                    console.log(
                      'service worker successfully registered',
                      reg.scope
                    )
                  )
              })
            }
          </script>
        )
      ) : (
        <script></script>
      )} */}
    </Router>
  </Provider>,
  document.getElementById('app')
)
