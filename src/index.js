import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Register from './containers/Register'
import Resource from './containers/Resource'
import App from './App'

import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Router history={history}>
    <Route path="/">
      <Route path="/register" component={Register} />
      <Route path="/resources/:id" component={Resource} />
    </Route>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <App>
      { router }
    </App>
  </Provider>,
  document.getElementById('root')
);
