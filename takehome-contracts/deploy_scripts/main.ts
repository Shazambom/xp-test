import "../hardhat.config";
import {ethers} from "hardhat";
import {ExPopulusCardGameLogic, ExPopulusCards, ExPopulusToken} from "../typechain";

export interface IDeployContractsOutput {
	exPopulusToken: ExPopulusToken;
	exPopulusCards: ExPopulusCards;
	exPopulusCardGameLogic: ExPopulusCardGameLogic;
}

export async function deployContracts(): Promise<IDeployContractsOutput> {

	const creator = (await ethers.getSigners())[0];


	const exPopulusTokenFactory = await ethers.getContractFactory("ExPopulusToken", creator);
	const exPopulusTokenContract = await exPopulusTokenFactory.deploy();

	const exPopulusCardsFactory = await ethers.getContractFactory("ExPopulusCards", creator);
	const exPopulusCardsContract = await exPopulusCardsFactory.deploy();

	const exPopulusCardGameLogicFactory = await ethers.getContractFactory("ExPopulusCardGameLogic", creator);
	const exPopulusCardGameLogic = await exPopulusCardGameLogicFactory.deploy(exPopulusCardsContract.address, exPopulusTokenContract.address);
	return {
		exPopulusToken: exPopulusTokenContract as ExPopulusToken,
		exPopulusCards: exPopulusCardsContract as ExPopulusCards,
		exPopulusCardGameLogic: exPopulusCardGameLogic as ExPopulusCardGameLogic,
	};
}
