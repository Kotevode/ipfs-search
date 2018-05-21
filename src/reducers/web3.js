import { types } from '../actions'

export default (state = null, action) => {
  switch(action.type) {
    case types.INITIALIZE_WEB3_SUCCESS:
      return action.payload.web3
    default:
      return state
  }
}
