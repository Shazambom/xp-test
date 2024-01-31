// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ExPopulusToken is ERC20, AccessControl	{
	bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

	constructor() ERC20("ExPopulusToken", "EPT") {
		grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
		grantRole(MINTER_ROLE, msg.sender);
	}

	function mintToken(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
		_mint(to, amount);
	}

	function grantMinterRole(address minter) external onlyRole(DEFAULT_ADMIN_ROLE) {
		grantRole(MINTER_ROLE, minter);
	}
}
