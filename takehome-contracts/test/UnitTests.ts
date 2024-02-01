import hre from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {Signers} from "../types";
import chai, {assert, expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import {deployContracts} from "../deploy_scripts/main";
import {BigNumber} from "ethers";

describe("Unit tests", function () {

	beforeEach(async function () {
		chai.should();
		chai.use(chaiAsPromised);

		// Set up a signer for easy use
		this.signers = {} as Signers;
		const signers: SignerWithAddress[] = await hre.ethers.getSigners();
		this.signers.creator = signers[0];
		this.signers.testAccount2 = signers[1];
		this.signers.testAccount3 = signers[2];

		// Deploy the contracts
		this.contracts = await deployContracts();

		await this.contracts.exPopulusToken.connect(this.signers.creator).grantMinterRole(this.contracts.exPopulusCardGameLogic.address);
	});

	describe("User Story #1 (Minting)", async function () {
		it("Can mint a card to a specific player & verify ownership afterwards", async function () {
			const res = await this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 1);
			const ownsCard = await this.contracts.exPopulusCards.connect(this.signers.testAccount2).ownerOf(1);
			expect(ownsCard).to.equal(this.signers.testAccount2.address);
		});
		it("Can call a lookup function to find the minted card details by passing in an id", async function () {
			const res = await this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 3, 2);
			const cardDetails = await this.contracts.exPopulusCards.connect(this.signers.creator).cardDetails(1);
			expect(cardDetails[0]).to.equal(1);
			expect(cardDetails[1]).to.equal(3);
			expect(cardDetails[2]).to.equal(2);
		});
		it("Can only mint from valid minters", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.testAccount2).mintCard(this.signers.testAccount2.address, 1, 1, 1);
			await expect(res).to.be.rejectedWith("revert");
			const res2 = this.contracts.exPopulusCards.connect(this.signers.testAccount3).mintCard(this.signers.testAccount2.address, 1, 1, 1);
			await expect(res2).to.be.rejectedWith("revert");
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 1);
			await expect(res3).to.be.fulfilled;
		});
	});

	describe("User Story #2 (Ability Configuration)", async function () {
		it("Compare abilities will fail if the priority is not defined", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).checkAbility(1, 2);
			await expect(res).to.be.rejectedWith("revert");
		});
		it("Can only mint cards with valid abilities", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 3);
			await expect(res).to.be.rejectedWith("revert");
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(res2).to.be.fulfilled;
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 1);
			await expect(res3).to.be.fulfilled;
			const res4 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 2);
			await expect(res4).to.be.fulfilled;
		});
		it("Ability Priority definitions", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(0, 1);
			await expect(res).to.be.fulfilled;
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(1, 2);
			await expect(res2).to.be.fulfilled;

			const checkRes = this.contracts.exPopulusCards.connect(this.signers.creator).checkAbility(1, 2);
			await expect(checkRes).to.be.rejectedWith("revert");

			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 3);
			await expect(res3).to.be.fulfilled;
			const res4 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(3, 4);
			await expect(res4).to.be.rejectedWith("revert");
			const res5 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 4);
			await expect(res5).to.be.fulfilled;
			const res6 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 1);
			await expect(res6).to.be.rejectedWith("revert");
			const res7 = this.contracts.exPopulusCards.connect(this.signers.testAccount2).setAbilityPriority(2, 100);
			await expect(res7).to.be.rejectedWith("revert");
		});
	});

	describe("User Story #3 (Battles & Game Loop)", async function () {
		it("Can't start a battle unless the player owns the cards", async function () {
			const battleRes = this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount3).battle([1, 2, 3]);
			await expect(battleRes).to.be.rejectedWith("revert");
		});
		it("Can start a battle between two players", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(0, 30);
			await expect(res).to.be.fulfilled;
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(1, 10);
			await expect(res2).to.be.fulfilled;
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 20);
			await expect(res3).to.be.fulfilled;
			const mintRes = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes).to.be.fulfilled;
			const mintRes2 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes2).to.be.fulfilled;
			const mintRes3 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes3).to.be.fulfilled;
			const battleRes = this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount2).battle([1, 2, 3]);
			await expect(battleRes).to.be.fulfilled;
		});
		it("Can't start battle with the same card", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(0, 30);
			await expect(res).to.be.fulfilled;
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(1, 10);
			await expect(res2).to.be.fulfilled;
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 20);
			await expect(res3).to.be.fulfilled;
			const mintRes = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes).to.be.fulfilled;
			const mintRes2 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes2).to.be.fulfilled;
			const mintRes3 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes3).to.be.fulfilled;
			const battleRes = this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount2).battle([1, 2, 1]);
			await expect(battleRes).to.be.rejectedWith("revert");
		});
	});

	describe("User Story #4 (Fungible Token & Battle Rewards)", async function () {
		it("Can mint tokens to a specific player & verify balance afterwards", async function () {
			const res = await this.contracts.exPopulusToken.connect(this.signers.creator).mintToken(this.signers.testAccount3.address, 100);
			const balance = await this.contracts.exPopulusToken.connect(this.signers.testAccount3).balanceOf(this.signers.testAccount3.address);
			expect(balance).to.equal(100);
		});
		it("When game runs and player wins a battle, they should be rewarded with tokens", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(0, 30);
			await expect(res).to.be.fulfilled;
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(1, 10);
			await expect(res2).to.be.fulfilled;
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 20);
			await expect(res3).to.be.fulfilled;
			const mintRes = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 2);
			await expect(mintRes).to.be.fulfilled;
			const mintRes2 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 10, 0);
			await expect(mintRes2).to.be.fulfilled;
			const mintRes3 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 5, 10, 2);
			await expect(mintRes3).to.be.fulfilled;
			let battleResult;
			do {
				const battleRes = this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount2).battle([1, 2, 3]);
				await expect(battleRes).to.be.fulfilled;
				const response = await battleRes;
				const receipt = await response.wait();
				for (let i = 0; i < receipt.events.length; i++) {
					if (receipt.events[i].event == "BattleResult") {
						battleResult = receipt.events[i];
					}
				}
			} while (battleResult.args["result"] != 1);
			const balance = await this.contracts.exPopulusToken.connect(this.signers.testAccount2).balanceOf(this.signers.testAccount2.address);
			expect(balance).to.equal(100);
		});
		it("When game runs and player wins 5x in a row they get extra tokens", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(0, 30);
			await expect(res).to.be.fulfilled;
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(1, 10);
			await expect(res2).to.be.fulfilled;
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 20);
			await expect(res3).to.be.fulfilled;
			const mintRes = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 2);
			await expect(mintRes).to.be.fulfilled;
			const mintRes2 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 10, 0);
			await expect(mintRes2).to.be.fulfilled;
			const mintRes3 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 5, 10, 2);
			await expect(mintRes3).to.be.fulfilled;
			let winCount = 0;
			do {
				let battleResult;
				const battleRes = this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount2).battle([1, 2, 3]);
				await expect(battleRes).to.be.fulfilled;
				const response = await battleRes;
				const receipt = await response.wait();
				for (let i = 0; i < receipt.events.length; i++) {
					if (receipt.events[i].event == "BattleResult") {
						battleResult = receipt.events[i];
					}
				}
				const record = await this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount2).records(this.signers.testAccount2.address);
				winCount = record.wins.toNumber();
			} while (winCount < 5);
			const balance = await this.contracts.exPopulusToken.connect(this.signers.testAccount2).balanceOf(this.signers.testAccount2.address);
			expect(balance).to.equal(1400);
		});

	});

	describe("User Story #5 (Battle Logs & Historical Lookup)", async function () {
		before("setting up ability priority",async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(0, 31);
			await expect(res).to.be.fulfilled;
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(1, 11);
			await expect(res2).to.be.fulfilled;
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 21);
			await expect(res3).to.be.fulfilled;
		});
		it("Can lookup game result in contract", async function () {
			const res = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(0, 30);
			await expect(res).to.be.fulfilled;
			const res2 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(1, 10);
			await expect(res2).to.be.fulfilled;
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 20);
			await expect(res3).to.be.fulfilled;
			const mintRes = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes).to.be.fulfilled;
			const mintRes2 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes2).to.be.fulfilled;
			const mintRes3 = this.contracts.exPopulusCards.connect(this.signers.creator).mintCard(this.signers.testAccount2.address, 1, 1, 0);
			await expect(mintRes3).to.be.fulfilled;
			const battleRes = this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount2).battle([1, 2, 3]);
			await expect(battleRes).to.be.fulfilled;
			const response = await battleRes;
			const receipt = await response.wait();
			let battleResult;
			for (let i = 0; i < receipt.events.length; i++) {
				if (receipt.events[i].event == "BattleResult") {
					battleResult = receipt.events[i];
				}
			}
			expect(battleResult.args["player"]).to.equal(this.signers.testAccount2.address);
			const record = await this.contracts.exPopulusCardGameLogic.connect(this.signers.testAccount2).getGameTurns(battleResult.args["gameHash"]);
			console.log(record);
		});
	});
});
