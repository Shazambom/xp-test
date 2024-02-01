import hre from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {Signers} from "../types";
import chai, {assert, expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import {deployContracts} from "../deploy_scripts/main";

describe("Unit tests", function () {

	before(async function () {
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
			const cardDetails = await this.contracts.exPopulusCards.connect(this.signers.creator).cardDetails(2);
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
			const res3 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 3);
			await expect(res3).to.be.fulfilled;
			const res4 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(3, 4);
			await expect(res4).to.be.rejectedWith("revert");
			const res5 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 4);
			await expect(res5).to.be.fulfilled;
			const res6 = this.contracts.exPopulusCards.connect(this.signers.creator).setAbilityPriority(2, 1);
			await expect(res6).to.be.rejectedWith("revert");
		});
	});

	describe("User Story #3 (Battles & Game Loop)", async function () {
	});

	describe("User Story #4 (Fungible Token & Battle Rewards)", async function () {
		it("Can mint tokens to a specific player & verify balance afterwards", async function () {
			const res = await this.contracts.exPopulusToken.connect(this.signers.creator).mintToken(this.signers.testAccount2.address, 100);
			const balance = await this.contracts.exPopulusToken.connect(this.signers.testAccount2).balanceOf(this.signers.testAccount2.address);
			expect(balance).to.equal(100);
		});
	});

	describe("User Story #5 (Battle Logs & Historical Lookup)", async function () {
	});
});
