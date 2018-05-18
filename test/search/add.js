import { expectThrow } from "../helpers"

var Search = artifacts.require("./Search.sol")

const resource = "QmaWLb9MjfUxdhfXCth1A1Ueme8G4yyvv1hu3fyD9jgLcS"
let search, resourceId;

contract('Search', async (accounts) => {
  describe('#add', async () => {
    before(async () => {
      search = await Search.deployed()
      let result = await search.register(resource, {
        from: accounts[0]
      })
      resourceId = result.logs[0].args._id.toNumber()
    })

    it('allows to bind a ipfs resource to a keyword', async () => {
      await search.add(resourceId, "test")

      let result = await search.find.call("test")
      let resources = result.map(r => r.toNumber())
      assert.deepEqual(resources, [ resourceId ])
    })

    it('doesnt allow to bind a non-registered resource', async () => {
      await expectThrow(async () => {
        await search.add(1, "scam")
      })
    })

    it('doesnt allow to bind resource for a keyword twice', async () => {
      await expectThrow(async () => {
        await search.add(resourceId, "test")
      })
    })

    it('doesnt allow to bind for non-owners', async () => {
      await expectThrow(async () => {
        await search.add(resourceId, "scam", {
          from: accounts[1]
        })
      })
    })
  })
})
