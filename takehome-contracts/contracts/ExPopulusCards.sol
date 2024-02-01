// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ExPopulusCards is ERC721, AccessControl {
	bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

	struct NftData {
		uint8 attack;
		uint8 health;
		uint8 ability;
	}

	event Mint(
		address to,
		uint256 id,
		NftData data
	);

	NftData[] public nftData;
	uint256[] public abilityPriority = [0, 0, 0];
	//This is the default for now but ideally this would be set up to be configurable along with the abilityPriority
	// list. The list would grow with the changes to maxAbility.
	uint256 maxAbility = 2;

	constructor() ERC721("ExPopulusCards", "EPC") AccessControl() {
		_grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_grantRole(MINTER_ROLE, msg.sender);
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
		if (_maxAbility <= maxAbility) {
			revert("Max ability must be greater than the current max ability");
		}
		uint256 diff = _maxAbility - maxAbility;
		for (uint256 i = 0; i < diff; i++) {
			abilityPriority.push(0);
		}
		maxAbility = _maxAbility;
	}

	function mintCard(address to, uint8 attack, uint8 health, uint8 ability) external onlyRole(MINTER_ROLE) abilityCheck(ability) {
		uint256 id = nftData.length;
		_mint(to, id);
		nftData.push(NftData(attack, health, ability));
		emit Mint(to, id, nftData[id]);
	}

	function setAbilityPriority(uint256 ability, uint256 priority) external onlyRole(DEFAULT_ADMIN_ROLE) abilityCheck(ability) {
		//add 1 to the priority because 0 is the null case
		uint256 _priority = priority+1;
		for (uint256 i = 0; i <= maxAbility; i++) {
			//For now I don't like this, loops are notoriously bad in solidity I will live with it because it will work but
			// there has got to be a better way. At least the number of abilities will likely not get very large.
			if (abilityPriority[i] == _priority) {
				revert("Priority already exists");
			}
		}
		abilityPriority[ability] = _priority;
	}

	function cardDetails(uint256 _id) public view returns (uint8, uint8, uint8) {
		if (_id >= nftData.length) {
			return (0, 0, 0);
		}
		NftData memory card = nftData[_id];
		return (card.attack, card.health, card.ability);
	}

	function pickEnemyDeck() external view returns (uint256[3] memory) {
		uint256[3] memory enemyDeck;
		for (uint256 i = 0; i < 3; i++) {
			//RNG should be replaced with a more secure method but this will do for now
			enemyDeck[i] = (uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender, tx.origin))) % (nftData.length-1))+1;
		}
		return enemyDeck;
	}

	function checkAbility(uint256 alpha, uint256 beta) public view returns (bool) {
		if (alpha >= abilityPriority.length || beta >= abilityPriority.length) {
			revert("Ability must be within the range of the ability priority array");
		}
		uint256 alphaPriority = abilityPriority[alpha];
		uint256 betaPriority = abilityPriority[beta];
		if (alphaPriority == 0 || betaPriority == 0) {
			revert("Ability must have a priority");
		}
		return alphaPriority >= betaPriority;
	}

	function supportsInterface(bytes4 interfaceId)
	public
	view
	override(ERC721, AccessControl)
	returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}
}
