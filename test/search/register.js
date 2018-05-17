var Search = artifacts.require('./Search.sol')

contract('Search', async (accounts) => {
  describe('#register', async () => {
    it('allows to register ipfs resource in contract', async () => {
      let contract = await Search.deployed()
      const address = "QmaWLb9MjfUxdhfXCth1A1Ueme8G4yyvv1hu3fyD9jgLcS"

      let result = await contract.register(address, { from: accounts[0] })

      let { _id, _address } = result.logs[0].args
      assert.equal(_id, 0)
      assert.equal(_address, address)

      let owner = await contract.resourceToOwner.call(_id)
      assert.equal(owner, accounts[0])
    })
  })
})
