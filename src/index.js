import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import { Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Register from './containers/Register'
import Resource from './containers/Resource'
import Search from './containers/Search'
import NotFound from './components/NotFound'
import App from './App'

import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/register" component={Register} />
      <Route path="/:id" component={Resource} />
      <Route component={NotFound} />
    </Switch>
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
