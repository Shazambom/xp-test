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
	struct Record {
		uint256 wins;
		uint256 losses;
		uint256 draws;
	}

	mapping(address => Record) public records;

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
		State playerState = State(false, false, false, playerDeck[0], 0);
		State enemyState = State(false, false, false, enemyDeck[0], 0);
		//TODO: Clean this up if possible
		while (playerState.index < playerDeck.length && enemyState.index < enemyDeck.length) {
			NftData playerCard = playerDeck[playerState.index];
			NftData enemyCard = enemyDeck[enemyState.index];
			//We check abilities here and apply them to the states in the order they were placed in priority
			if (!playerState.abilityUsed && !enemyState.abilityUsed) {
				playerState.abilityUsed = true;
				enemyState.abilityUsed = true;
				State first;
				State second;
				if (cards.checkAbility(playerCard.ability, enemyCard.ability)) {
					first = playerState;
					second = enemyState;
				} else {
					first = enemyState;
					second = playerState;
				}
				bool fWon = false;
				bool sWon = false;
				bool shouldFreeze = false;
				(first.shielded, fWon, second.frozen) = processAbility(first.ability);
				if (fWon) {
					second.index = second.length;
					break;
				}
				if (!second.frozen) {
					(second.shielded, sWon, shouldFreeze) = processAbility(second.ability);
					if (sWon) {
						first.index = first.length;
						break;
					}
					if (shouldFreeze && !first.shielded) {
						first.frozen = true;
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
			//Now the state has been set up with the abilities applied now the combat portion of the turn can begin

			if (playerState.frozen || enemyState.shielded) {
				if (!enemyState.frozen) {
					if (playerState.health <= enemyCard.attack) {
						playerState.index++;
						if (pIdx == playerDeck.length) {
							break;
						}
						playerState.health = playerDeck[pIdx].health;
						playerState.abilityUsed = false;
					} else {
						playerState.health -= enemyCard.attack;
					}
				}
			} else if (enemyState.frozen || playerState.shielded) {
				//TODO: I don't think this state is actually reachable we can maybe remove this if check, validate with tests
				if (!playerState.frozen) {
					if (enemyState.health <= playerCard.attack) {
						enemyState.index++;
						if (eIdx == enemyDeck.length) {
							break;
						}
						enemyState.health = enemyDeck[eIdx].health;
						enemyState.abilityUsed = false;
					} else {
						enemyState.health -= playerCard.attack;
					}
				}
			} else {
				//It kinda looks weird but actually checking this state twice is cleaner than checking once while also
				//ensuring the "attacks" occur simultaneously.
				if (playerState.health <= enemyCard.attack) {
					playerState.index++;
				}
				if (enemyState.health <= playerCard.attack) {
					enemyState.index++;
				}
				if (playerState.index == playerDeck.length || enemyState.index == enemyDeck.length) {
					break;
				}
				if (playerState.health <= enemyCard.attack) {
					playerState.health = playerDeck[playerState.index].health;
				} else {
					playerState.health -= enemyCard.attack;
				}
				if (enemyState.health <= playerCard.attack) {
					enemyState.health = enemyDeck[enemyState.index].health;
				} else {
					enemyState.health -= playerCard.attack;
				}
			}
			playerState.frozen = false;
			playerState.shielded = false;
			enemyState.frozen = false;
			enemyState.shielded = false;
		}
		Record memory playerRecord = records[msg.sender];
		uint8 result = 0;
		if (playerState.index == playerDeck.length && enemyState.index == enemyDeck.length) {
			playerRecord.draws++;
			result = 0;
		} else if (playerState.index == playerDeck.length) {
			playerRecord.losses++;
			result = 2;
		} else {
			playerRecord.wins++;
			result = 1;
		}
		records[msg.sender] = playerRecord;
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

	function playerRecord(address player) external view returns (Record memory) {
		return records[player];
	}
}
