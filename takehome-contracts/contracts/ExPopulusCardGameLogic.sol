// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "./ExPopulusCards.sol";
import "./ExPopulusToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExPopulusCardGameLogic is Ownable {
	uint256 MAX_INT = 2**256 - 1;
	ExPopulusCards public cards;
	ExPopulusToken public token;
	struct State {
		//This packed into a uint256 where the first 8-16 bits could be bools for certain states
		// the next 5 bytes could be the health, ability, attack, index, and length. We This would still leave 25-26 bytes for
		// future expansion. The current way I have it implemented we combine the two states into a single uint256.
		// This will only leave 12-13 bytes for future expansion. But its much more efficient to store the two states
		// in a single uint256. In total each state has 16 bytes of data to work with.
		bool abilityUsed;
		bool frozen;
		bool shielded;
		uint8 health;
		uint8 ability;
		uint8 attack;
		uint8 index;
		uint8 length;
	}

	//Returned to the client
	struct Turn {
		State playerState;
		State enemyState;
	}

	struct Record {
		uint256 wins;
		uint256 losses;
		uint256 draws;
		uint256 streak;
	}

	struct CardData {
		uint8 attack;
		uint8 health;
		uint8 ability;
	}

	event BattleResult(
	// 0 - draw, 1 - win, 2 - lose
		address player,
		uint256 gameHash,
		CardData[] playerDeck,
		CardData[] enemyDeck,
		uint8 result
	);

	mapping(address => Record) public records;
	mapping(uint256 => uint256[]) public gameTurns;

	constructor(address _cards, address _token) Ownable(msg.sender) {
		cards = ExPopulusCards(_cards);
		token = ExPopulusToken(_token);
	}

	modifier onlyWallets() {
		require(tx.origin == msg.sender, "only wallets");
		_;
	}

	function battle(uint256[3] memory ids) external onlyWallets() {
		validate(ids);
		uint256 gameHash = rand(MAX_INT, 0);
		uint256[] storage playerTurns = gameTurns[gameHash];

		CardData[] memory playerDeck = getCards(ids);
		CardData[] memory enemyDeck = getCards(cards.pickEnemyDeck());
		State memory playerState = State(false, false, false, playerDeck[0].health, playerDeck[0].ability, playerDeck[0].attack, 0, uint8(playerDeck.length));
		State memory enemyState = State(false, false, false, enemyDeck[0].health, enemyDeck[0].ability, enemyDeck[0].attack, 0, uint8(enemyDeck.length));
		State memory first;
		State memory second;
		uint256 index;
		while (playerState.index < playerDeck.length && enemyState.index < enemyDeck.length) {
			//We check abilities here and apply them to the states in the order they were placed in priority
			if (!playerState.abilityUsed && !enemyState.abilityUsed) {
				playerState.abilityUsed = true;
				enemyState.abilityUsed = true;
				if (cards.checkAbility(playerState.ability, enemyState.ability)) {
					first = playerState;
					second = enemyState;
				} else {
					first = enemyState;
					second = playerState;
				}
				bool fWon = false;
				bool sWon = false;
				bool shouldFreeze = false;
				(first.shielded, fWon, second.frozen) = processAbility(first.ability, index);
				if (fWon) {
					second.index = second.length;
					playerTurns.push(getTurn(playerState, enemyState));
					break;
				}
				if (!second.frozen) {
					(second.shielded, sWon, shouldFreeze) = processAbility(second.ability, index);
					if (sWon) {
						first.index = first.length;
						playerTurns.push(getTurn(playerState, enemyState));
						break;
					}
					if (shouldFreeze && !first.shielded) {
						first.frozen = true;
					}
				}
			} else if (!playerState.abilityUsed) {
				playerState.abilityUsed = true;
				bool pWon = false;
				(playerState.shielded, pWon, enemyState.frozen) = processAbility(playerState.ability, index);
				if (pWon) {
					enemyState.index = enemyState.length;
					playerTurns.push(getTurn(playerState, enemyState));
					break;
				}
			} else if (!enemyState.abilityUsed) {
				enemyState.abilityUsed = true;
				bool eWon = false;
				(enemyState.shielded, eWon, playerState.frozen) = processAbility(enemyState.ability, index);
				if (eWon) {
					playerState.index = playerState.length;
					playerTurns.push(getTurn(playerState, enemyState));
					break;
				}
			}
			//Now the state has been set up with the abilities applied now the combat portion of the turn can begin

			if (playerState.frozen || enemyState.shielded) {
				if (playerState.health <= enemyState.attack) {
					playerState.index++;
					if (playerState.index == playerDeck.length) {
						playerTurns.push(getTurn(playerState, enemyState));
						break;
					}
					setNextCard(playerState, playerDeck[playerState.index]);
				} else {
					playerState.health -= enemyState.attack;
				}
			} else if (enemyState.frozen || playerState.shielded) {
				if (enemyState.health <= playerState.attack) {
					enemyState.index++;
					if (enemyState.index == enemyState.length) {
						playerTurns.push(getTurn(playerState, enemyState));
						break;
					}
					setNextCard(enemyState, enemyDeck[enemyState.index]);
				} else {
					enemyState.health -= playerState.attack;
				}
			} else {
				//It kinda looks weird but actually checking this state twice is cleaner than checking once while also
				//ensuring the "attacks" occur simultaneously.
				if (playerState.health <= enemyState.attack) {
					playerState.index++;
				}
				if (enemyState.health <= playerState.attack) {
					enemyState.index++;
				}
				if (playerState.index == playerDeck.length || enemyState.index == enemyState.length) {
					playerTurns.push(getTurn(playerState, enemyState));
					break;
				}
				if (playerState.health <= enemyState.attack) {
					setNextCard(playerState, playerDeck[playerState.index]);
				} else {
					playerState.health -= enemyState.attack;
				}
				if (enemyState.health <= playerState.attack) {
					setNextCard(enemyState, enemyDeck[enemyState.index]);
				} else {
					enemyState.health -= playerState.attack;
				}
			}
			playerTurns.push(getTurn(playerState, enemyState));
			resetStatus(playerState);
			resetStatus(enemyState);
			index++;
		}
		Record memory playerRecord = records[msg.sender];
		uint8 result = 0;
		if (playerState.index == playerDeck.length && enemyState.index == enemyDeck.length) {
			playerRecord.draws++;
			result = 0;
		} else if (playerState.index == playerDeck.length) {
			playerRecord.losses++;
			playerRecord.streak = 0;
			result = 2;
		} else {
			playerRecord.wins++;
			playerRecord.streak++;
			result = 1;
		}
		records[msg.sender] = playerRecord;
		grantRewards(playerRecord.wins, result);
		emit BattleResult(msg.sender, gameHash, playerDeck, enemyDeck, result);
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

	function resetStatus(State memory state) internal pure {
		state.frozen = false;
		state.shielded = false;
	}

	function setNextCard(State memory state, CardData memory data) internal pure {
		state.health = data.health;
		state.ability = data.ability;
		state.attack = data.attack;
		state.abilityUsed = false;
	}

	function processAbility(uint8 ability, uint256 index) internal view returns (bool, bool, bool) {
		if (ability == 0) {
			return (true, false, false);
		} else if (ability == 1) {
			if (rand(100, index) >= 90) {
				return (false, true, false);
			}
			return (false, false, false);
		} else if (ability == 2) {
			return (false, false, true);
		}
		revert("invalid ability");
	}

	function rand(uint256 _modulus, uint256 salt) internal view returns (uint256) {
		//Again a better random function is probably needed for production but this will do
		return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender, tx.origin, salt))) % _modulus;
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

	function getGameTurns(uint256 gameHash) external view returns (Turn[] memory) {
		uint256[] memory turns = gameTurns[gameHash];
		Turn[] memory clientTurns = new Turn[](turns.length);
		for (uint256 i = 0; i < turns.length; i++) {
			clientTurns[i] = Turn(decodeState(turns[i]), decodeState(turns[i]<<128));
		}
		return clientTurns;
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


	function encodeState(State memory state) public pure returns (uint256) {
		uint256 encoded;
		uint256 _abilityUsed;
		bool _bAbilityUsed = state.abilityUsed;
		uint256 _frozen;
		bool _bFrozen = state.frozen;
		uint256 _shielded;
		bool _bShielded = state.shielded;
		assembly {
			_abilityUsed := _bAbilityUsed
			_frozen := _bFrozen
			_shielded := _bShielded
		}
		encoded = _abilityUsed << 248;
		encoded |= _frozen << 247;
		encoded |= _shielded << 246;
		encoded |= uint256(state.health) << 238;
		encoded |= uint256(state.ability) << 230;
		encoded |= uint256(state.attack) << 222;
		encoded |= uint256(state.index) << 214;
		encoded |= uint256(state.length) << 206;
		return encoded;
	}

	function decodeState(uint256 data) public pure returns (State memory) {
		State memory state;
		state.abilityUsed = data >> 248 & 1 == 1;
		state.frozen = data >> 247 & 1 == 1;
		state.shielded = data >> 246 & 1 == 1;
		state.health = uint8(data >> 238 & 255);
		state.ability = uint8(data >> 230 & 255);
		state.attack = uint8(data >> 222 & 255);
		state.index = uint8(data >> 214 & 255);
		state.length = uint8(data >> 206 & 255);
		return state;
	}

	function getTurn(State memory playerState, State memory enemyState) public pure returns (uint256) {
		uint256 _playerState = encodeState(playerState);
		uint256 _enemyState = encodeState(enemyState);
		return _playerState | _enemyState >> 128;
	}
}
