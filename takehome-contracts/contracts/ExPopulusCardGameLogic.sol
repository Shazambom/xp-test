// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "./ExPopulusCards.sol";
import "./ExPopulusToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExPopulusCardGameLogic is Ownable {

	ExPopulusCards public cards;
	ExPopulusToken public token;
	struct State {
		bool abilityUsed;
		bool frozen;
		bool shielded;
		uint8 health;
		uint8 ability;
		uint256 index;
		uint8 length;
	}

	struct Record {
		uint256 wins;
		uint256 losses;
		uint256 draws;
	}

	mapping(address => Record) public records;

	constructor(address _cards, address _token) Ownable(msg.sender) {
		cards = ExPopulusCards(_cards);
		token = ExPopulusToken(_token);
	}
	struct CardData {
		uint8 attack;
		uint8 health;
		uint8 ability;
	}


	event BattleResult(
	// 0 - draw, 1 - win, 2 - lose
		CardData[3] playerDeck,
		CardData[3] enemyDeck,
		uint8 result
	);

	modifier onlyWallets() {
		require(tx.origin == msg.sender, "only wallets");
		_;
	}

	function battle(uint256[3] memory ids) external onlyWallets() {
		validate(ids);
		CardData[] memory playerDeck = getCards(ids);
		CardData[] memory enemyDeck = getCards(cards.pickEnemyDeck());
		State memory playerState = State(false, false, false, playerDeck[0].health, playerDeck[0].ability, 0, uint8(playerDeck.length));
		State memory enemyState = State(false, false, false, enemyDeck[0].health, playerDeck[0].ability, 0, uint8(enemyDeck.length));
		//TODO: Clean this up if possible
		CardData memory playerCard;
		CardData memory enemyCard;
		State memory first;
		State memory second;
		while (playerState.index < playerDeck.length && enemyState.index < enemyDeck.length) {
			playerCard = playerDeck[playerState.index];
			enemyCard = enemyDeck[enemyState.index];
			//We check abilities here and apply them to the states in the order they were placed in priority
			if (!playerState.abilityUsed && !enemyState.abilityUsed) {
				playerState.abilityUsed = true;
				enemyState.abilityUsed = true;
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
					enemyState.index = enemyDeck.length;
					break;
				}
			} else if (!enemyState.abilityUsed) {
				enemyState.abilityUsed = true;
				bool eWon = false;
				(enemyState.shielded, eWon, playerState.frozen) = processAbility(enemyCard.ability);
				if (eWon) {
					playerState.index = playerDeck.length;
					break;
				}
			}
			//Now the state has been set up with the abilities applied now the combat portion of the turn can begin

			if (playerState.frozen || enemyState.shielded) {
				if (!enemyState.frozen) {
					if (playerState.health <= enemyCard.attack) {
						playerState.index++;
						if (playerState.index == playerDeck.length) {
							break;
						}
						playerState.health = playerDeck[playerState.index].health;
						playerState.ability = playerDeck[playerState.index].ability;
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
						if (enemyState.index == enemyDeck.length) {
							break;
						}
						enemyState.health = enemyDeck[enemyState.index].health;
						enemyState.ability = enemyDeck[enemyState.index].ability;
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
					playerState.ability = playerDeck[playerState.index].ability;
					playerState.abilityUsed = false;
				} else {
					playerState.health -= enemyCard.attack;
				}
				if (enemyState.health <= playerCard.attack) {
					enemyState.health = enemyDeck[enemyState.index].health;
					enemyState.ability = enemyDeck[enemyState.index].ability;
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
		grantRewards(playerRecord.wins, result);
	}

	function grantRewards(uint256 wins, uint256 result) internal {
		if (result == 1) {
			uint256 amount = 100;
			if (wins % 5 == 0) {
				amount = 1000;
			}
			token.mintToken(msg.sender, amount);
		}
	}

	function processAbility(uint8 ability) internal view returns (bool, bool, bool) {
		if (ability == 0) {
			return (true, false, false);
		} else if (ability == 1) {
			if (rand(100) >= 90) {
				return (false, true, false);
			}
			return (false, false, false);
		} else if (ability == 2) {
			return (false, false, true);
		}
		revert("invalid ability");
	}

	function rand(uint256 _modulus) internal view returns (uint256) {
		//Again a better random function is probably needed for production but this will do
		return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender, tx.origin))) % _modulus;
	}

	function getCards(uint256[3] memory ids) internal view returns (CardData[] memory) {
		CardData[] memory deck = new CardData[](3);
		uint256 count = 0;
		for (uint256 i = 0; i < ids.length; i++) {
			if (ids[i] != 0) {
				CardData memory data;
				(data.attack, data.health, data.ability) = cards.cardDetails(ids[i]);
				deck[count] = data;
				count++;
			}
		}
		return deck;
	}

	function validate(uint256[3] memory ids) public view {
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

	function setCards(address _cards) external onlyOwner() {
		cards = ExPopulusCards(_cards);
	}

	function setToken(address _token) external onlyOwner() {
		token = ExPopulusToken(_token);
	}
}
