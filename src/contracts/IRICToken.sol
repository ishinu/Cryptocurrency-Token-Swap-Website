//SPDX-License-Identifier:MIT 
pragma solidity >=0.5.0;

contract IRICToken{
    string public name = "IRIC Token";
    string public symbol = "IRIC";
    string public standard = "IRIC Token v1.0.0";

    uint256 public totalSupply = 1000000000000000000000000; //1 Million
    uint8 public decimals = 18;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping (address=>uint256) public balanceOf;
    mapping (address=>mapping(address=>uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to,uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >=_value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    function approve(address _spender,uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    function transferFrom(address _from,address _to,uint _value) public returns (bool success) {
        require(allowance[_from][msg.sender]>=_value);
        require(balanceOf[_from]>=_value);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from,_to,_value);
        return true;
    }
}