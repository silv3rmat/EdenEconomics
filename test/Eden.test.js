const Eden = artifacts.require('Eden')

require('chai')
  .use(require('chai-as-promised'))
  .should()


let tokens = n => {
  return web3.utils.toWei(n, 'ether')
}


contract('Eden', accounts => {
  let eden

  before( async () => {
    eden = await Eden.new();
  })

  describe("Eden tests", async () =>{

    it("has a name", async () => {
      const name = await eden.name()
      assert.equal(name, "Eden")

    })
    it("has an owner of sender", async() => {
      const owner = await eden.owner()
      assert.equal(owner, accounts[0])
    })

    it("has 0 originees", async() => {
      const origineeCount = await eden.origineeCount()
      assert.equal(origineeCount, 0)
    })

    it("creates originee", async() => {
      // Creating first originee
      await eden.createOriginee(accounts[0], {from: accounts[0]})
      const ownerOrigineesCount = await eden.getOrigineesCount(accounts[0])
      assert.equal(ownerOrigineesCount, 1)
      const origineeId = await eden.getOwnerOriginee(accounts[0], 0)
      assert.equal(origineeId, 0)
      const originee = await eden.originees(origineeId)
      assert.equal(originee.id, 0)
      assert.equal(originee.owner, accounts[0])
      // Creating second originee
      await eden.createOriginee(accounts[0], {from: accounts[0]})
      const ownerOrigineesCountAfter = await eden.getOrigineesCount(accounts[0])
      assert.equal(ownerOrigineesCountAfter, 2)
      const secondOrigineeId = await eden.origineeOwners(accounts[0], 1)
      assert.equal(secondOrigineeId, 1)
      const secondOriginee = await eden.originees(secondOrigineeId)
      assert.equal(secondOriginee.id, 1)
      assert.equal(secondOriginee.owner, accounts[0])
    })

    it("denies other users to create originee", async() =>{
      await eden.createOriginee(accounts[0], {from: accounts[1]}).should.be.rejected
    })


  })
})
