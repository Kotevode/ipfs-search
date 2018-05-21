import { all, call } from 'redux-saga/effects'
import { watchAddResource } from './search'
import { initializeWeb3 } from './web3'

export default function* rootSaga() {
  // yield initializeWeb3()
  yield all([
    watchAddResource()
  ])
}
