const IRICToken = artifacts.require("IRICToken");
const IRICSwap = artifacts.require("IRICSwap");

module.exports = async function(deployer){

    await deployer.deploy(IRICToken);
    const IRICtoken = await IRICToken.deployed()

    await deployer.deploy(IRICSwap,IRICtoken.address);
    const IRICswap = await IRICSwap.deployed()

    await IRICtoken.transfer(IRICswap.address,'1000000000000000000000000')
};