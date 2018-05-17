var Search = artifacts.require("./Search.sol")

contract('Search', async (accounts) => {
  describe('#add', async () => {
    it('allows to bind a ipfs resource to a keyword', async () => {
      let contract = await Search.deployed()
      const address = "QmaWLb9MjfUxdhfXCth1A1Ueme8G4yyvv1hu3fyD9jgLcS"

      await contract.add(address, "test")

      let resources = await contract.find.call("test")
      console.log(resources)
      assert.equal(address, resources)
    })
  })
})
