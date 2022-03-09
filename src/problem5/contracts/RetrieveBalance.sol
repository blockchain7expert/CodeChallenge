//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract RetrieveBalance {
    struct balances {
        address token;
        uint balance;
    }
    constructor() {
    }
    function getBalances(address _addr, address[] memory _tokens) public view  returns (balances[] memory) {
        balances[] memory bal = new balances[](_tokens.length);
        for(uint i; i < _tokens.length; i++) {
            IERC20 tokenContract = IERC20(_tokens[i]);
            bal[i].token = _tokens[i];
            bal[i].balance = tokenContract.balanceOf(_addr);
        }
        return bal;
    }
}
