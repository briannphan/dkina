/*
Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
.*/


pragma solidity ^0.4.21;

import "./EIP20Interface.sol";


contract EIP20 is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    // maps facebook user ID to wallet address
    mapping (uint => address) public fbToAddress;
    // maps facebook user ID to balance
    mapping (uint => uint) public idToBalance;

    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name ="Digital Kina";                   //fancy name: eg Simon Bucks
    uint8 public decimals = 18;                //How many decimals to show.
    string public symbol = "DGK";                 //An identifier: eg SBX

    address admin;

    constructor(
    ) public {
        totalSupply = 10**18*10**6;                        // Update total supply
        balances[msg.sender] = totalSupply;               // Give the creator all initial tokens
        admin = msg.sender;
    }

    function createAccount(uint facebookID) public {
        require(admin == msg.sender);
        fbToAddress[facebookID] = msg.sender;
        balances[msg.sender] = idToBalance[facebookID];
        idToBalance[facebookID] = 0;

    }

    function transferToFB(uint facebookID, uint _value) public returns (bool success) {
        address _to = fbToAddress[facebookID];

        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;


        emit TransferBalToFB(msg.sender, facebookID, _value);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
