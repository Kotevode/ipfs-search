import { combineReducers } from 'redux'
import { types } from '../actions'

const resources = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_RESOURCE_SUCCESS:
      debugger
      let { id, ipfsAddress } = action.payload
      state[id] = ipfsAddress
      return state
    default:
      return state
  }
}

const results = (state = [], action) => {
  return state
}

export default combineReducers({
  resources,
  results
})
