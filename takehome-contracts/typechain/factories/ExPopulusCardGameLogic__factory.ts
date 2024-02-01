/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ExPopulusCardGameLogic,
  ExPopulusCardGameLogicInterface,
} from "../ExPopulusCardGameLogic";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_cards",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameHash",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "attack",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "health",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "ability",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct ExPopulusCardGameLogic.CardData[]",
        name: "playerDeck",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "attack",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "health",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "ability",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct ExPopulusCardGameLogic.CardData[]",
        name: "enemyDeck",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "result",
        type: "uint8",
      },
    ],
    name: "BattleResult",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[3]",
        name: "ids",
        type: "uint256[3]",
      },
    ],
    name: "battle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cards",
    outputs: [
      {
        internalType: "contract ExPopulusCards",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameTurns",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "abilityUsed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "frozen",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "shielded",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "health",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "ability",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "attack",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "index",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "length",
            type: "uint8",
          },
        ],
        internalType: "struct ExPopulusCardGameLogic.State",
        name: "playerState",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "abilityUsed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "frozen",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "shielded",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "health",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "ability",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "attack",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "index",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "length",
            type: "uint8",
          },
        ],
        internalType: "struct ExPopulusCardGameLogic.State",
        name: "enemyState",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameHash",
        type: "uint256",
      },
    ],
    name: "getGameTurns",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bool",
                name: "abilityUsed",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "frozen",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "shielded",
                type: "bool",
              },
              {
                internalType: "uint8",
                name: "health",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "ability",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "attack",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "index",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "length",
                type: "uint8",
              },
            ],
            internalType: "struct ExPopulusCardGameLogic.State",
            name: "playerState",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "abilityUsed",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "frozen",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "shielded",
                type: "bool",
              },
              {
                internalType: "uint8",
                name: "health",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "ability",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "attack",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "index",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "length",
                type: "uint8",
              },
            ],
            internalType: "struct ExPopulusCardGameLogic.State",
            name: "enemyState",
            type: "tuple",
          },
        ],
        internalType: "struct ExPopulusCardGameLogic.Turn[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "records",
    outputs: [
      {
        internalType: "uint256",
        name: "wins",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "losses",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "draws",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "streak",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_cards",
        type: "address",
      },
    ],
    name: "setCards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "setToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract ExPopulusToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[3]",
        name: "ids",
        type: "uint256[3]",
      },
    ],
    name: "validate",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000196001553480156200001757600080fd5b506040516200316a3803806200316a8339810160408190526200003a916200010c565b33806200006157604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6200006c816200009f565b50600280546001600160a01b039384166001600160a01b0319918216179091556003805492909316911617905562000144565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200010757600080fd5b919050565b600080604083850312156200012057600080fd5b6200012b83620000ef565b91506200013b60208401620000ef565b90509250929050565b61301680620001546000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638da5cb5b11610081578063e350e5c91161005b578063e350e5c9146101f3578063f2fde38b14610206578063fc0c546a1461021957600080fd5b80638da5cb5b146101a1578063bec8f3c2146101b2578063e1beb977146101d257600080fd5b806358a4903f116100b257806358a4903f1461015b57806363c5633e14610186578063715018a61461019957600080fd5b8063144fa6d7146100d95780632a74b2e0146100ee578063469e906714610101575b600080fd5b6100ec6100e7366004612bba565b61022c565b005b6100ec6100fc366004612c15565b610263565b61013661010f366004612bba565b60046020526000908152604090208054600182015460028301546003909301549192909184565b6040805194855260208501939093529183015260608201526080015b60405180910390f35b60025461016e906001600160a01b031681565b6040516001600160a01b039091168152602001610152565b6100ec610194366004612c15565b612017565b6100ec6122a4565b6000546001600160a01b031661016e565b6101c56101c0366004612c75565b6122b8565b6040516101529190612d09565b6101e56101e0366004612d6c565b612518565b604051610152929190612d8e565b6100ec610201366004612bba565b612733565b6100ec610214366004612bba565b61276a565b60035461016e906001600160a01b031681565b6102346127be565b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b3233146102b75760405162461bcd60e51b815260206004820152600c60248201527f6f6e6c792077616c6c657473000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6102c081612017565b60006102cd600154612804565b60008181526005602052604081209192506102e78461286a565b9050600061036a600260009054906101000a90046001600160a01b03166001600160a01b031663d8fc7a626040518163ffffffff1660e01b8152600401606060405180830381865afa158015610341573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103659190612dab565b61286a565b90506000604051806101000160405280600015158152602001600015158152602001600015158152602001846000815181106103a8576103a8612e00565b60200260200101516020015160ff168152602001846000815181106103cf576103cf612e00565b60200260200101516040015160ff168152602001846000815181106103f6576103f6612e00565b60200260200101516000015160ff168152602001600060ff168152602001845160ff16815250905060006040518061010001604052806000151581526020016000151581526020016000151581526020018460008151811061045a5761045a612e00565b60200260200101516020015160ff1681526020018460008151811061048157610481612e00565b60200260200101516040015160ff168152602001846000815181106104a8576104a8612e00565b6020908102919091018101515160ff908116835260008383018190528751909116604093840152825161010080820185528282528184018390528185018390526060808301849052608080840185905260a080850186905260c080860187905260e080870188905289519586018a5287865297850187905297840186905291830185905282018490528101839052938401829052918301529192505b85518460c0015160ff16108015610562575084518360c0015160ff16105b15611ead57835115801561057557508251155b15610ba35760018085528352600254608080860151908501516040517f6887eee800000000000000000000000000000000000000000000000000000000815260ff9283166004820152911660248201526001600160a01b0390911690636887eee890604401602060405180830381865afa1580156105f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061b9190612e16565b1561062a575082905081610630565b50819050825b600080600061064285608001516129e3565b151560208701529015156040870152925082156108d8578360e001518460c0019060ff16908160ff168152505089604051806040016040528089815260200188815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050505050611ead565b8360200151610b9b576108ee84608001516129e3565b9115156040870152925090508115610b7f578460e001518560c0019060ff16908160ff168152505089604051806040016040528089815260200188815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050505050611ead565b808015610b8e57508460400151155b15610b9b57600160208601525b505050611109565b8351610e5857600184526080840151600090610bbe906129e3565b15156020870152901515604087015290508015610e52578360e001518460c0019060ff16908160ff168152505087604051806040016040528087815260200186815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff1602179055505050505050611ead565b50611109565b825161110957600183526080830151600090610e73906129e3565b15156020880152901515604086015290508015611107578460e001518560c0019060ff16908160ff168152505087604051806040016040528087815260200186815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff1602179055505050505050611ead565b505b83602001518061111a575082604001515b15611486578260a0015160ff16846060015160ff16116114655760c0840180519061114482612e4e565b60ff1660ff168152505085518460c0015160ff16036113c35786604051806040016040528086815260200185815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050611ead565b858460c0015160ff16815181106113dc576113dc612e00565b602002602001015160200151846060019060ff16908160ff1681525050858460c0015160ff168151811061141257611412612e00565b602002602001015160400151846080019060ff16908160ff1681525050858460c0015160ff168151811061144857611448612e00565b60209081029190910101515160ff1660a085015260008452611c03565b8260a001518460600181815161147b9190612e6d565b60ff16905250611c03565b826020015180611497575083604001515b156117fe578360a0015160ff16836060015160ff16116117e85760c083018051906114c182612e4e565b60ff1660ff16815250508260e0015160ff168360c0015160ff16036117465786604051806040016040528086815260200185815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050611ead565b848360c0015160ff168151811061175f5761175f612e00565b602002602001015160200151836060019060ff16908160ff1681525050848360c0015160ff168151811061179557611795612e00565b602002602001015160400151836080019060ff16908160ff1681525050848360c0015160ff16815181106117cb576117cb612e00565b60209081029190910101515160ff1660a084015260008352611c03565b8360a001518360600181815161147b9190612e6d565b8260a0015160ff16846060015160ff161161182a5760c0840180519061182382612e4e565b60ff169052505b8360a0015160ff16836060015160ff16116118565760c0830180519061184f82612e4e565b60ff169052505b85518460c0015160ff16148061187957508260e0015160ff168360c0015160ff16145b15611ae45786604051806040016040528086815260200185815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050611ead565b8260a0015160ff16846060015160ff1611611b9b57858460c0015160ff1681518110611b1257611b12612e00565b602002602001015160200151846060019060ff16908160ff1681525050858460c0015160ff1681518110611b4857611b48612e00565b602002602001015160400151846080019060ff16908160ff1681525050858460c0015160ff1681518110611b7e57611b7e612e00565b60209081029190910101515160ff1660a085015260008452611bb8565b8260a0015184606001818151611bb19190612e6d565b60ff169052505b8360a0015160ff16836060015160ff1611611be657848360c0015160ff168151811061175f5761175f612e00565b8360a0015183606001818151611bfc9190612e6d565b60ff169052505b86604051806040016040528086815260200185815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505050506000846020019015159081151581525050600084604001901515908115158152505060008360200190151590811515815250506000836040019015159081151581525050610544565b336000908152600460209081526040808320815160808101835281548152600182015493810193909352600281015491830191909152600301546060820152875160c087015191929160ff16148015611f0d575086518560c0015160ff16145b15611f2e5760408201805190611f2282612e86565b90525060009050611f86565b87518660c0015160ff1603611f5f5760208201805190611f4d82612e86565b90525050600060608201526002611f86565b815182611f6b82612e86565b90525060608201805190611f7e82612e86565b905250600190505b3360009081526004602090815260409182902084518082559185015160018201559184015160028301556060840151600390920191909155611fcb9060ff8316612aa4565b7f6aeaa88470c08aa431fe4452b98ae2afdd6dc449509ae67ba2487e570951abbd338b8a8a85604051612002959493929190612ef8565b60405180910390a15050505050505050505050565b60025481516040516331a9108f60e11b8152600481019190915233916001600160a01b031690636352211e90602401602060405180830381865afa158015612063573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120879190612f48565b6001600160a01b03161415801561209e5750805115155b80612131575060025460208201516040516331a9108f60e11b8152600481019190915233916001600160a01b031690636352211e90602401602060405180830381865afa1580156120f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121179190612f48565b6001600160a01b0316141580156121315750602081015115155b806121c4575060025460408083015190516331a9108f60e11b8152600481019190915233916001600160a01b031690636352211e90602401602060405180830381865afa158015612186573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121aa9190612f48565b6001600160a01b0316141580156121c45750604081015115155b156122115760405162461bcd60e51b815260206004820152601660248201527f796f75206d757374206f776e20616c6c2063617264730000000000000000000060448201526064016102ae565b602081015181511480612228575060408101518151145b80156122345750805115155b806122545750604081015160208201511480156122545750602081015115155b156122a15760405162461bcd60e51b815260206004820152601260248201527f696473206d75737420626520756e69717565000000000000000000000000000060448201526064016102ae565b50565b6122ac6127be565b6122b66000612b48565b565b606060056000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561250d578382906000526020600020906002020160405180604001604052908160008201604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff1681525050815260200160018201604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff168152505081525050815260200190600101906122ed565b505050509050919050565b6005602052816000526040600020818154811061253457600080fd5b90600052602060002090600202016000915091505080600001604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff16815250509080600101604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff1681525050905082565b61273b6127be565b6002805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6127726127be565b6001600160a01b0381166127b5576040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600060048201526024016102ae565b6122a181612b48565b6000546001600160a01b031633146122b6576040517f118cdaa70000000000000000000000000000000000000000000000000000000081523360048201526024016102ae565b6040805142602082015244918101919091526bffffffffffffffffffffffff1933606090811b82168184015232901b16607482015260009082906088016040516020818303038152906040528051906020012060001c6128649190612f65565b92915050565b6040805160038082526080820190925260609160009190816020015b60408051606081018252600080825260208083018290529282015282526000199092019101816128865790505090506000805b60038110156129da578481600381106128d4576128d4612e00565b6020020151156129c85760408051606081018252600080825260208201819052918101919091526002546001600160a01b031663ef7c895987846003811061291e5761291e612e00565b60200201516040518263ffffffff1660e01b815260040161294191815260200190565b606060405180830381865afa15801561295e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129829190612f9d565b60ff90811660408501529081166020840152168152835181908590859081106129ad576129ad612e00565b602002602001018190525082806129c390612e86565b935050505b806129d281612e86565b9150506128b9565b50909392505050565b60008060008360ff16600003612a025750600191506000905080612a9d565b8360ff16600103612a3b57605a612a196064612804565b10612a2d5750600091506001905081612a9d565b506000915081905080612a9d565b8360ff16600203612a555750600091508190506001612a9d565b60405162461bcd60e51b815260206004820152600f60248201527f696e76616c6964206162696c697479000000000000000000000000000000000060448201526064016102ae565b9193909250565b80600103612b44576064612ab9600584612f65565b600003612ac557506103e85b6003546040517f79c65068000000000000000000000000000000000000000000000000000000008152336004820152602481018390526001600160a01b03909116906379c6506890604401600060405180830381600087803b158015612b2a57600080fd5b505af1158015612b3e573d6000803e3d6000fd5b50505050505b5050565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146122a157600080fd5b600060208284031215612bcc57600080fd5b8135612bd781612ba5565b9392505050565b6040516060810167ffffffffffffffff81118282101715612c0f57634e487b7160e01b600052604160045260246000fd5b60405290565b600060608284031215612c2757600080fd5b82601f830112612c3657600080fd5b612c3e612bde565b806060840185811115612c5057600080fd5b845b81811015612c6a578035845260209384019301612c52565b509095945050505050565b600060208284031215612c8757600080fd5b5035919050565b80511515825260208101511515602083015260408101511515604083015260ff606082015116606083015260ff608082015116608083015260a0810151612cda60a084018260ff169052565b5060c0810151612cef60c084018260ff169052565b5060e0810151612d0460e084018260ff169052565b505050565b6020808252825182820181905260009190848201906040850190845b81811015612d60578351612d3a848251612c8e565b850151612d4b610100850182612c8e565b50928401926102009290920191600101612d25565b50909695505050505050565b60008060408385031215612d7f57600080fd5b50508035926020909101359150565b6102008101612d9d8285612c8e565b612bd7610100830184612c8e565b600060608284031215612dbd57600080fd5b82601f830112612dcc57600080fd5b612dd4612bde565b806060840185811115612de657600080fd5b845b81811015612c6a578051845260209384019301612de8565b634e487b7160e01b600052603260045260246000fd5b600060208284031215612e2857600080fd5b81518015158114612bd757600080fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff8103612e6457612e64612e38565b60010192915050565b60ff828116828216039081111561286457612864612e38565b600060018201612e9857612e98612e38565b5060010190565b600081518084526020808501945080840160005b83811015612eed578151805160ff9081168952848201518116858a0152604091820151169088015260609096019590820190600101612eb3565b509495945050505050565b6001600160a01b038616815284602082015260a060408201526000612f2060a0830186612e9f565b8281036060840152612f328186612e9f565b91505060ff831660808301529695505050505050565b600060208284031215612f5a57600080fd5b8151612bd781612ba5565b600082612f8257634e487b7160e01b600052601260045260246000fd5b500690565b805160ff81168114612f9857600080fd5b919050565b600080600060608486031215612fb257600080fd5b612fbb84612f87565b9250612fc960208501612f87565b9150612fd760408501612f87565b9050925092509256fea2646970667358221220bb46f2de780b0d2403f49ac785fb480cab324ed1049367311c52e021e9ee556d64736f6c63430008140033";

export class ExPopulusCardGameLogic__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _cards: string,
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ExPopulusCardGameLogic> {
    return super.deploy(
      _cards,
      _token,
      overrides || {}
    ) as Promise<ExPopulusCardGameLogic>;
  }
  getDeployTransaction(
    _cards: string,
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_cards, _token, overrides || {});
  }
  attach(address: string): ExPopulusCardGameLogic {
    return super.attach(address) as ExPopulusCardGameLogic;
  }
  connect(signer: Signer): ExPopulusCardGameLogic__factory {
    return super.connect(signer) as ExPopulusCardGameLogic__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExPopulusCardGameLogicInterface {
    return new utils.Interface(_abi) as ExPopulusCardGameLogicInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExPopulusCardGameLogic {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ExPopulusCardGameLogic;
  }
}
