import contract from 'truffle-contract'
import Search from '../../build/contracts/Search.json'

export default async (web3) => {
  let search = contract(Search)
  search.setProvider(web3.currentProvider)
  let result = await search.deployed()
  return result
}
