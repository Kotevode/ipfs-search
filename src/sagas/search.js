import { takeLatest, takeEvery, select, call, apply, all, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import nlp from 'compromise'

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

export function* getBindedKeywords(search, resourceId) {
  let hashes = yield apply(
    search.keywordsForResource,
    search.keywordsForResource.call,
    [resourceId]
  )
  return yield all(hashes.map(hash => apply(
    search.keywords,
    search.keywords.call,
    [hash]
  )))
}

export function* getKeywords(search, resourceId) {
  return yield all({
    suggested: [],
    binded: call(getBindedKeywords, search, resourceId)
  })
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
  let keywords = yield call(getKeywords, search, id)
  yield put({
    type: types.LOAD_RESOURCE_SUCCESS,
    payload: {
      id,
      ipfsAddress,
      owner,
      keywords,
      isOwnedByUser: web3.eth.accounts[0] === owner
    }
  })
}

export function* bindResource({ payload: { id, keyword } }) {
  try {
    let web3 = getWeb3()
    let search = yield call(Search, web3)
    yield apply(
      search, search.add, [
        id,
        keyword,
        {
          from: web3.eth.accounts[0]
        }
      ]
    )
    yield put(actions.resourceBinded(
      id, keyword
    ))
  } catch (e) {
    yield put({
      type: types.BIND_RESOURCE_FAIL
    })
    console.log(e)
  }
}

const extractKeywords = (query) => {
  return nlp(query).out('tags')
    .map(tag => tag.normal)
}

export function *resourcesForKeywords(keywords, search) {
  let keywordsToResources = yield all(
    keywords.reduce((result, keyword) => ({
      ...result,
      [keyword]: apply(
        search.find,
        search.find.call,
        [ keyword ]
      )
    }), {})
  )
  let resources = Object.keys(keywordsToResources)
  .reduce((result, keyword) => {
    for (let resource in keywordsToResources[keyword]) {
      if (!result[resource]) {
        result[resource] = 1
      } else {
        result[resource] += 1
      }
    }
    return result
  }, {})
  return Object.entries(resources)
    .sort((a, b) => a[1] < b[1])
    .reverse()
    .map(a => a[0])
}

export function *find({ payload: { query }}) {
  try {
    let web3 = getWeb3()
    let search = yield call(Search, web3)
    let keywords = extractKeywords(query)
    let results = yield* resourcesForKeywords(keywords, search)
    yield put(actions.queryFetched(results))
  } catch (error) {
    yield put({
      type: types.SEARCH_QUERY_FAIL,
      error
    })
    console.log(error)
  }
}

export function* watchAddResource() {
  yield takeLatest(types.ADD_RESOURCE, addResource)
}

export function* watchLoadResource() {
  yield takeEvery(types.LOAD_RESOURCE, loadResource)
}

export function *watchBindResource() {
  yield takeLatest(types.BIND_RESOURCE, bindResource)
}

export function *watchSearchQuery() {
  yield takeLatest(types.SEARCH_QUERY, find)
}

export function *watchAll() {
  yield all([
    watchAddResource(),
    watchLoadResource(),
    watchBindResource(),
    watchSearchQuery()
  ])
}
