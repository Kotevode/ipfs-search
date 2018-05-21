import { takeLatest, select, call, apply, put } from 'redux-saga/effects'
import { types, actions } from '../actions'
// import { web3 as Web3, account } from '../selectors'
import getWeb3 from '../utils/getWeb3'

import Search from '../contracts/Search'

export function* addResource(action) {
  let { ipfsAddress } = action.payload
  let web3 = getWeb3()
  let search = yield call(Search, web3)
  let account = web3.eth.accounts[0]
  let result = yield apply(search, search.register,
    [ipfsAddress, { from: account }]
  )
  let { _id: id } = result.logs[0].args
  yield put(actions.resourceAdded(id.toNumber(), ipfsAddress))
}

export function* watchAddResource() {
  yield takeLatest(types.ADD_RESOURCE, addResource)
}
