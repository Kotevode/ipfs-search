import { call, put } from 'redux-saga/effects'
import { actions } from '../actions'

export function* initializeWeb3() {
  let { web3 } = window
  if (typeof web3 === 'undefined') {
    alert('Metamask is required')
  } else {
    yield put(actions.web3Initialized(web3))
  }
}
