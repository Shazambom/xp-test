import "../hardhat.config";
import {ethers} from "hardhat";
import {ExPopulusCardGameLogic, ExPopulusCards, ExPopulusToken} from "../typechain";

export interface IDeployContractsOutput {
	exPopulusToken: ExPopulusToken;
	exPopulusCards: ExPopulusCards;
	exPopulusCardGameLogic: ExPopulusCardGameLogic;
}

export async function deployContracts(): Promise<IDeployContractsOutput> {
	console.log("Deploying contracts...");

	const creator = (await ethers.getSigners())[0];


	const exPopulusTokenFactory = await ethers.getContractFactory("ExPopulusToken", creator);
	const exPopulusTokenContract = await exPopulusTokenFactory.deploy();
	console.log("Token address: ", exPopulusTokenContract.address);

	const exPopulusCardsFactory = await ethers.getContractFactory("ExPopulusCards", creator);
	const exPopulusCardsContract = await exPopulusCardsFactory.deploy();
	console.log("Cards address: ", exPopulusCardsContract.address);

	const exPopulusCardGameLogicFactory = await ethers.getContractFactory("ExPopulusCardGameLogic", creator);
	const exPopulusCardGameLogic = await exPopulusCardGameLogicFactory.deploy(exPopulusCardsContract.address, exPopulusTokenContract.address);
	return {
		exPopulusToken: exPopulusTokenContract as ExPopulusToken,
		exPopulusCards: exPopulusCardsContract as ExPopulusCards,
		exPopulusCardGameLogic: exPopulusCardGameLogic as ExPopulusCardGameLogic,
	};
}
