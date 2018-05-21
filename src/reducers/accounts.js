import { types } from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case types.LOAD_ACCOUNTS_SUCCESS:
      return action.payload.accounts
    default:
      return state
  }
}
