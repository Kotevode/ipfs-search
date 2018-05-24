import { takeLatest, select, call, apply, all, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
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
  yield put(push(`/resources/${id.toNumber()}`))
}

export function* loadResource(action) {
  let { id } = action.payload
  let web3 = getWeb3()
  let search = yield call(Search, web3)
  let [ ipfsAddress, owner ] = yield apply(
    search.resources,
    search.resources.call,
    [ id ]
  );
  yield put( {
    type: types.LOAD_RESOURCE_SUCCESS,
    payload: {
      id,
      ipfsAddress,
      owner
    }
  })
}

export function* watchAddResource() {
  yield takeLatest(types.ADD_RESOURCE, addResource)
}

export function* watchLoadResource() {
  yield takeLatest(types.LOAD_RESOURCE, loadResource)
}
