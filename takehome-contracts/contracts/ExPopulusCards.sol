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

	constructor() {
		_setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_setupRole(MINTER_ROLE, msg.sender);
	}

	function mintCard(address to, uint8 attack, uint8 health, uint8 ability) external onlyRole(MINTER_ROLE) {
		uint256 id = nftData.length;
		_mint(to, id);
		nftData.push(NftData(attack, health, ability));
		emit Mint(to, id, nftData[id]);
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
