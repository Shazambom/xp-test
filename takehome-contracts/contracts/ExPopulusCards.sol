// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IExPopulusCards is ERC721 {
	function cardDetails(uint256 _id) external view returns (uint8, uint8, uint8);
	function pickEnemyDeck() public view returns (uint256[] memory);
	function checkAbility(uint256 alpha, uint256 beta) public view returns (bool);
}


contract ExPopulusCards is ERC721, AccessControl, Ownable, IExPopulusCards {
	bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

	struct NftData {
		uint8 attack;
		uint8 health;
		uint8 ability;
	}

	event Mint(
		address to,
		uint256 id,
		uint256 amount,
		NftData data
	);

	NftData[] public nftData;
	uint256[] public abilityPriority;
	uint256 maxAbility;

	constructor() {
		grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
		grantRole(MINTER_ROLE, msg.sender);
		maxAbility = 2;
		//This isn't guaranteed to actually have priorities for each ability
		//abilityPriority = [2, 0, 1];

		// this is a hack to make the first card id 1 but we could just add 1 to each id when we use it
		// this is likely more gas efficient but I don't know for sure
		// Need this because having 0 as the null case is useful.
		nftData.push(NftData(0, 0, 0));
	}

	modifier abilityCheck(uint256 ability) {
		if (ability > maxAbility) {
			revert("Ability must be less than the max ability");
		}
		_;
	}

	function updateMaxAbility(uint256 _maxAbility) external onlyRole(DEFAULT_ADMIN_ROLE) {
		maxAbility = _maxAbility;
	}

	function mintCard(address to, uint8 attack, uint8 health, uint8 ability) external onlyRole(MINTER_ROLE) abilityCheck(ability) {
		uint256 id = nftData.length;
		_mint(to, id);
		nftData.push(NftData(attack, health, ability));
		emit Mint(to, id, nftData[id]);
	}

	function setAbilityPriority(uint256 ability, uint256 priority) external onlyRole(DEFAULT_ADMIN_ROLE) abilityCheck(ability) {
		if (ability > maxAbility) {
			revert("Ability must be less than the max ability");
		}
		//add 1 to the priority because 0 is the null case
		uint256 memory _priority = priority+1;
		for (uint256 i = 0; i < abilityPriority.length; i++) {
			//TODO: For now I don't like this, loops are notoriously bad in solidity
			// I will live with it because it will work but there has got to be a better way.
			if (abilityPriority[i] == _priority) {
				revert("Priority already exists");
			}
		}
		//TODO: Figure out how not to get index out of bounds error and expand the array if needed
		abilityPriority[ability] = _priority;
	}

	function cardDetails(uint256 _id) public view returns (uint8, uint8, uint8) {
		if (_id >= nftData.length) {
			return "";
		}
		NftData memory card = nftData[_id];
		return (card.attack, card.health, card.ability);
	}

	function pickEnemyDeck() public view returns (uint256[] memory) {
		uint256[] memory enemyDeck = new uint256[](3);
		for (uint256 i = 0; i < 3; i++) {
			//RNG should be replaced with a more secure method but this will do for now
			enemyDeck[i] = (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, tx.origin))) % (nftData.length-1))+1;
		}
		return enemyDeck;
	}

	function checkAbility(uint256 alpha, uint256 beta) public view returns (bool) {
		if (alpha >= abilityPriority.length || beta >= abilityPriority.length) {
			revert("Ability must be within the range of the ability priority array");
		}
		uint256 memory alphaPriority = abilityPriority[alpha];
		uint256 memory betaPriority = abilityPriority[beta];
		if (alphaPriority == 0 || betaPriority == 0) {
			revert("Ability must have a priority");
		}
		return alphaPriority >= betaPriority;
	}

	function supportsInterface(bytes4 interfaceId)
	public
	view
	override(ERC721, AccessControl, IERC165)
	returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}
}
