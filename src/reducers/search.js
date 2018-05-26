import { combineReducers } from 'redux'
import { types } from '../actions'

const initialState = {
  isLoading: false,
  keywords: {
    binded: [],
    suggested: [],
  }
}

const resource = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_RESOURCE_SUCCESS:
    case types.LOAD_RESOURCE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case types.LOAD_RESOURCE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case types.LOAD_RESOURCE:
      return {
        ...state,
        isLoading: true
      }
    case types.BIND_RESOURCE_SUCCESS:
      let { keyword } = action.payload
      return {
        ...state,
        keywords: {
          ...state.keywords,
          binded: [
            ...state.keywords.binded,
            keyword
          ]
        }
      }
    default:
      return state
  }
}

const resources = (state = {}, action) => {
  let { payload } = action
  if (typeof payload === 'undefined') {
    return state
  }
  switch (action.type) {
    case types.ADD_RESOURCE_SUCCESS:
      state[payload.id] = resource(undefined, action)
      return state
    default:
      let { id } = payload
      if (id) {
        return {
          ...state,
          [id]: resource(state[id], action)
        }
      }
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
