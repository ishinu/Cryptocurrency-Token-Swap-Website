// SPDX-License-Identifier:MIT
pragma solidity >=0.5.0;

import "./IRICToken.sol";

contract IRICSwap{
    string public name = "IRIC Crypto Exchange";
    IRICToken public IRICtoken;
    uint public rate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate);

    constructor (IRICToken _token) public {
        IRICtoken = _token;
    }

    function buyTokens() public payable {
        uint tokenAmount = msg.value * rate;
        require(IRICtoken.balanceOf(address(this))>=tokenAmount);
        IRICtoken.transfer(msg.sender, tokenAmount);
        emit TokenPurchased(msg.sender,address(IRICtoken),tokenAmount, rate);
    }
}