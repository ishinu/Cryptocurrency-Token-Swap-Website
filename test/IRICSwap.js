const IRICSwap = artifacts.require("IRICSwap")
const IRICToken = artifacts.require("IRICToken")

require('chai')
.use(require('chai-as-promised'))
.should()

function tokens(n){
    return web3.utils.toWei(n,'ether');
}

contract('IRICSwap', ([deployer,investor]) => {
    
    let IRICtoken,IRICswap
    

    before(async () => {
        IRICtoken = await IRICToken.new()
        IRICswap = await IRICSwap.new(IRICtoken.address)
        await IRICtoken.transfer(IRICswap.address,tokens('1000000'))
    })

    describe('IRICToken deployment',async() => {
        it('contract has a name',async() => {
            const name = await IRICtoken.name()
            assert.equal(name,'IRIC Token')
        });
    });

    describe('IRICSwap deployment',async() => {
        it('contract has a name', async() => { 
            const name = await IRICswap.name()
            assert.equal(name,'IRIC Crypto Exchange')
        });
    });

    it('contract has tokens', async() => { 
        let balance = await IRICtoken.balanceOf(IRICswap.address)
        assert.equal(balance.toString(),tokens('1000000'))
    });

    describe('buyTokens()', async() => {
        let result 

        before(async () => {
            result = await IRICswap.buyTokens({ from:investor, value:web3.utils.toWei('1','ether')})
        })
        it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async() => {
            let investorBalance = await IRICtoken.balanceOf(investor)
            assert.equal(investorBalance.toString(),tokens('100'))

            let IRICswapBalance
            IRICswapBalance = await IRICtoken.balanceOf(IRICswap.address)
            assert.equal(IRICswapBalance.toString(),tokens('999900'))

            IRICswapBalance = await web3.eth.getBalance(IRICswap.address)
            assert.equal(IRICswapBalance.toString(),web3.utils.toWei('1','ether'))

            const event = result.logs[0].args
            assert.equal(event.account,investor)
            assert.equal(event.IRICtoken, IRICtoken.address)
            assert.equal(event.amount.toString(),tokens('100').toString())
            assert.equal(event.rate.toString(),'100')
        })
    })
})

