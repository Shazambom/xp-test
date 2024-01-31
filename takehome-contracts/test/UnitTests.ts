import hre from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {Signers} from "../types";
import chai, {expect} from "chai";
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
			const ownsCard = await this.contracts.exPopulusCards.connect(this.signers.testAccount2).tokenOwner(1);
			console.log(ownsCard);
		});
	});

	describe("User Story #2 (Ability Configuration)", async function () {
	});

	describe("User Story #3 (Battles & Game Loop)", async function () {
	});

	describe("User Story #4 (Fungible Token & Battle Rewards)", async function () {
		const res = await this.contracts.exPopulusToken.connect(this.signers.creator).mintToken(this.signers.creator.address, 100);
	});

	describe("User Story #5 (Battle Logs & Historical Lookup)", async function () {
	});
});
