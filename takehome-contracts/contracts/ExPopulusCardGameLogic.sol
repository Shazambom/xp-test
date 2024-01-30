pragma solidity ^0.8.12;


import "./ExPopulusCards.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./structs.sol";

contract ExPopulusCardGameLogic is Ownable {

	IExPopulusCards public cards;
	struct State {
		bool abilityUsed;
		bool frozen;
		bool shielded;
		uint8 health;
		uint256 index;
	}

	constructor(address _cards) Ownable() {
		cards = IExPopulusCards(_cards);
	}

	event BattleResult(
	// 0 - draw, 1 - win, 2 - lose
		NftData[3] playerDeck,
		NftData[3] enemyDeck,
		uint8 result
	);

	modifier onlyWallets() {
		require(tx.origin == msg.sender, "only wallets");
		_;
	}

	function battle(uint256[3] calldata ids) external onlyWallets() {
		validate(ids);
		NftData[] memory playerDeck = getCards(ids);
		NftData[] memory enemyDeck = getCards(cards.pickEnemyDeck());
		State memory playerState = State(false, false, false, playerDeck[0], 0);
		State memory enemyState = State(false, false, false, enemyDeck[0], 0);
		//TODO: Clean this up if possible
		while (pIdx < playerDeck.length && eIdx < enemyDeck.length) {
			NftData playerCard = playerDeck[playerState.index];
			NftData enemyCard = enemyDeck[enemyState.index];
			//We check abilities here and apply them to the states in the order they were placed in priority
			if (!playerState.abilityUsed && !enemyState.abilityUsed) {
				playerState.abilityUsed = true;
				enemyState.abilityUsed = true;
				if (cards.checkAbility(playerCard.ability, enemyCard.ability)) {
					bool pWon = false;
					(playerState.shielded, pWon, enemyState.frozen) = processAbility(playerCard.ability);
					if (pWon) {
						eIdx = enemyDeck.length;
						break;
					}
					bool eWon = false;
					bool pShouldFreeze = false;
					if (!enemyState.frozen) {
						(enemyState.shielded, eWon, pShouldFreeze) = processAbility(enemyCard.ability);
						if (eWon) {
							pIdx = playerDeck.length;
							break;
						}
						if (pShouldFreeze && !pSheilded) {
							playerState.frozen = true;
						}
					}
				} else {
					bool eWon = false;
					(enemyState.shielded, eWon, playerState.frozen) = processAbility(enemyCard.ability);
					if (eWon) {
						pIdx = playerDeck.length;
						break;
					}
					bool pWon = false;
					bool eShouldFreeze = false;
					if (!playerState.frozen) {
						(playerState.shielded, pWon, eShouldFreeze) = processAbility(playerCard.ability);
						if (pWon) {
							eIdx = enemyDeck.length;
							break;
						}
						if (eShouldFreeze && !enemyState.shielded) {
							enemyState.frozen = true;
						}
					}
				}
			} else if (!playerState.abilityUsed) {
				playerState.abilityUsed = true;
				bool pWon = false;
				(playerState.shielded, pWon, enemyState.frozen) = processAbility(playerCard.ability);
				if (pWon) {
					eIdx = enemyDeck.length;
					break;
				}
			} else if (!enemyState.abilityUsed) {
				enemyState.abilityUsed = true;
				bool eWon = false;
				(enemyState.shielded, eWon, playerState.frozen) = processAbility(enemyCard.ability);
				if (eWon) {
					pIdx = playerDeck.length;
					break;
				}
			}
			//Now the state has been set up with the abilities applied now the battle can begin

			//TODO: Apply the frozen and shielded states to this logic
			if (playerState.health <= enemyCard.attack && enemyState.health <= playerCard.attack) {
				pIdx++;
				eIdx++;
				if (pIdx == playerDeck.length || eIdx == enemyDeck.length) {
					break;
				}
				playerState.health = playerDeck[pIdx].health;
				enemyState.health = enemyDeck[eIdx].health;
				playerState.abilityUsed = false;
				enemyState.abilityUsed = false;
			} else {
				if (playerState.health <= enemyCard.attack) {
					pIdx++;
					if (pIdx == playerDeck.length) {
						break;
					}
					playerState.health = playerDeck[pIdx].health;
					playerState.abilityUsed = false;
				} else {
					playerState.health -= enemyCard.attack;
				}
				if (enemyState.health <= playerCard.attack) {
					eIdx++;
					if (eIdx == enemyDeck.length) {
						break;
					}
					enemyState.health = enemyDeck[eIdx].health;
					enemyState.abilityUsed = false;
				} else {
					enemyState.health -= playerCard.attack;
				}
			}

			playerState.frozen = false;
			playerState.shielded = false;
			enemyState.frozen = false;
			enemyState.shielded = false;
		}
		uint8 result = 0;
		if (pIdx == playerDeck.length && eIdx == enemyDeck.length) {
			result = 0;
		} else if (pIdx == playerDeck.length) {
			result = 2;
		} else {
			result = 1;
		}
		emit BattleResult(playerDeck, enemyDeck, result);
		//TODO: assign rewards
	}

	function processAbility(uint8 ability) internal pure returns (bool, bool, bool) {
		if (playerCard.ability == 0) {
			return (true, false, false);
		} else if (playerCard.ability == 1) {
			if (rand(100) >= 90) {
				return (false, true, false);
			}
			return (false, false, false);
		} else if (playerCard.ability == 2) {
			return (false, false, true);
		}
		revert("invalid ability");
	}

	function rand(uint256 _modulus) internal view returns (uint256) {
		return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, tx.origin))) % _modulus;
	}

	function getCards(uint256[3] calldata ids) external returns (NftData[] memory) {
		NftData[] memory deck;
		for (uint256 i = 0; i < 3; i++) {
			if (ids[i] != 0) {
				deck.push(cards.cardDetails(ids[i]));
			}
		}
		return deck;
	}

	function validate(uint256[3] calldata ids) public view {
		if ((cards.ownerOf(ids[0]) != msg.sender && ids[0] != 0) ||
			(cards.ownerOf(ids[1]) != msg.sender && ids[1] != 0) ||
			(cards.ownerOf(ids[2]) != msg.sender && ids[2] != 0)) {
			revert("you must own all cards");
		}
		if (((ids[0] == ids[1] || ids[0] == ids[2]) && ids[0] != 0) ||
			(ids[1] == ids[2]) && ids[1] != 0) {
			revert("ids must be unique");
		}
	}

	function setCards(address _cards) external OnlyOwner() {
		cards = IExPopulusCards(_cards);
	}
}
