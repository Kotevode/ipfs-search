import { createTypes, async, actionCreator } from 'redux-action-creator'

export const types = createTypes([
  ...async('ADD_RESOURCE'),
  ...async('INITIALIZE_WEB3'),
  ...async('LOAD_ACCOUNTS'),
  ...async('LOAD_RESOURCE'),
  ...async('BIND_RESOURCE'),
  ...async('SEARCH_QUERY')
])

export const actions = {
  addResource: actionCreator(types.ADD_RESOURCE, 'ipfsAddress'),
  resourceAdded: actionCreator(types.ADD_RESOURCE_SUCCESS, 'id', 'ipfsAddress'),
  web3Initialized: actionCreator(types.INITIALIZE_WEB3_SUCCESS, 'web3'),
  accountsLoaded: actionCreator(types.LOAD_ACCOUNTS_SUCCESS, 'accounts'),
  loadResource: actionCreator(types.LOAD_RESOURCE, 'id'),
  bind: actionCreator(types.BIND_RESOURCE, 'id', 'keyword'),
  resourceBinded: actionCreator(types.BIND_RESOURCE_SUCCESS, 'id', 'keyword'),
  queryFetched: actionCreator(types.SEARCH_QUERY_SUCCESS, 'results')
}
