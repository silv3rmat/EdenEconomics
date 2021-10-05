const EdenToken = artifacts.require('EdenToken')

require('chai')
  .use(require('chai-as-promised'))
  .should()


let tokens = n => {
  return web3.utils.toWei(n, 'ether')
}



contract('EdenToken', accounts => {
  let edenToken

  before( async () => {
    edenToken = await EdenToken.new();
  })

  describe("EdenToken tests", async () =>{

    it("has a name", async () => {
      const name = await edenToken.name()
      assert.equal(name, "Eden Token")

    })

    it("has an address", async ()=> {
      const address = await edenToken.address
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    })

    it("deployer has all the coins", async() =>{
      const deployer = accounts[0]
      const balance = await edenToken.balanceOf(deployer);
      assert.equal(balance, tokens('1000000'));
    })

    it("updates both balances", async() => {
      const deployerBalanceBefore = await edenToken.balanceOf(accounts[0])
      const receiverBalanceBefore = await edenToken.balanceOf(accounts[1])
      const transferAmount = tokens('100')
      await edenToken.transfer(accounts[1],tokens('100'), {from: accounts[0]})
      const receiverBalanceAfter = await edenToken.balanceOf(accounts[1])
      const deployerBalanceAfter = await edenToken.balanceOf(accounts[0])
      assert.equal(deployerBalanceBefore - transferAmount, deployerBalanceAfter)
      assert.equal(receiverBalanceBefore, 0)
      assert.equal(receiverBalanceAfter, transferAmount)
    })
    
  })
})
