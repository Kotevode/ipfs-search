import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import { Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Web3Provider } from 'react-web3'
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
      <Route path="/resources/:id" component={Resource} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <Web3Provider>
    <Provider store={store}>
      <App>
        { router }
      </App>
    </Provider>
  </Web3Provider>,
  document.getElementById('root')
);
