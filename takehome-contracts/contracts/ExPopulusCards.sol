pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExPopulusCards {
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
		_setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_setupRole(MINTER_ROLE, msg.sender);
		maxAbility = 2;
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

	function setAbilityPriority(uint256 ability, uint256 priority) external onlyRole(MINTER_ROLE) abilityCheck(ability) {
		for (uint256 i = 0; i < abilityPriority.length; i++) {
			//TODO: For now I don't like this, loops are notoriously bad in solidity
			// I will live with it because it will work but there has got to be a better way.
			if (abilityPriority[i] == priority) {
				revert("Priority already exists");
			}
		}
		abilityPriority[ability] = priority;
	}

	function cardDetails(uint256 _id) public view returns (string memory) {
		if (_id >= nftData.length) {
			return "";
		}
		return string(abi.encodePacked(nftData[_id]));
	}

	function supportsInterface(bytes4 interfaceId)
	public
	view
	override(ERC1155, AccessControl, IERC165)
	returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}
}
