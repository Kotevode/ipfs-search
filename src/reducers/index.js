import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import search from './search'
// import web3 from './web3'
import accounts from './accounts'

export const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // web3,
  search,
  accounts
})
