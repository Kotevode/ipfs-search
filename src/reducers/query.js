import { combineReducers } from 'redux'
import { types } from '../actions'

const text = (state = "", action) => {
  switch (action.type) {
    case types.SEARCH_QUERY:
      let { text } = action.payload
      return text
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.SEARCH_QUERY:
      return true
    case types.SEARCH_QUERY_FAIL:
    case types.SEARCH_QUERY_SUCCESS:
      return false
    default:
      return state
  }
}

const results = (state = [], action) => {
  switch (action.type) {
    case types.SEARCH_QUERY:
      return []
    case types.SEARCH_QUERY_SUCCESS:
      let { results } = action.payload
      return results
    default:
      return state
  }
}

export default combineReducers({
  // text,
  isLoading,
  results
})
