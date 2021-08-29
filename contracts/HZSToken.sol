//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HZSToken is ERC20 {

    address public minter;

    mapping(address => uint) public balances;

    constructor() payable ERC20("Hizashi", "HZS") {
        _mint(msg.sender, 1000000*10**18); //initial supply of 1 000 000 tokens
        minter = msg.sender;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == minter, "you are not the owner!");
        _mint(to, amount*10**18);
    }

    function burn(uint amount) external {
        require(amount > balances[msg.sender]);
        _burn(msg.sender, amount*10**18);
    }

}