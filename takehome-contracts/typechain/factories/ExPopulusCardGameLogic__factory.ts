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
  "0x60806040526000196001553480156200001757600080fd5b5060405162003189380380620031898339810160408190526200003a916200010c565b33806200006157604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6200006c816200009f565b50600280546001600160a01b039384166001600160a01b0319918216179091556003805492909316911617905562000144565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200010757600080fd5b919050565b600080604083850312156200012057600080fd5b6200012b83620000ef565b91506200013b60208401620000ef565b90509250929050565b61303580620001546000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638da5cb5b11610081578063e350e5c91161005b578063e350e5c9146101f3578063f2fde38b14610206578063fc0c546a1461021957600080fd5b80638da5cb5b146101a1578063bec8f3c2146101b2578063e1beb977146101d257600080fd5b806358a4903f116100b257806358a4903f1461015b57806363c5633e14610186578063715018a61461019957600080fd5b8063144fa6d7146100d95780632a74b2e0146100ee578063469e906714610101575b600080fd5b6100ec6100e7366004612bd9565b61022c565b005b6100ec6100fc366004612c34565b610263565b61013661010f366004612bd9565b60046020526000908152604090208054600182015460028301546003909301549192909184565b6040805194855260208501939093529183015260608201526080015b60405180910390f35b60025461016e906001600160a01b031681565b6040516001600160a01b039091168152602001610152565b6100ec610194366004612c34565b612036565b6100ec6122c3565b6000546001600160a01b031661016e565b6101c56101c0366004612c94565b6122d7565b6040516101529190612d28565b6101e56101e0366004612d8b565b612537565b604051610152929190612dad565b6100ec610201366004612bd9565b612752565b6100ec610214366004612bd9565b612789565b60035461016e906001600160a01b031681565b6102346127dd565b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b3233146102b75760405162461bcd60e51b815260206004820152600c60248201527f6f6e6c792077616c6c657473000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6102c081612036565b60006102cd600154612823565b60008181526005602052604081209192506102e784612889565b9050600061036a600260009054906101000a90046001600160a01b03166001600160a01b031663d8fc7a626040518163ffffffff1660e01b8152600401606060405180830381865afa158015610341573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103659190612dca565b612889565b90506000604051806101000160405280600015158152602001600015158152602001600015158152602001846000815181106103a8576103a8612e1f565b60200260200101516020015160ff168152602001846000815181106103cf576103cf612e1f565b60200260200101516040015160ff168152602001846000815181106103f6576103f6612e1f565b60200260200101516000015160ff168152602001600060ff168152602001845160ff16815250905060006040518061010001604052806000151581526020016000151581526020016000151581526020018460008151811061045a5761045a612e1f565b60200260200101516020015160ff1681526020018460008151811061048157610481612e1f565b60200260200101516040015160ff168152602001846000815181106104a8576104a8612e1f565b6020908102919091018101515160ff908116835260008383018190528751909116604093840152825161010081018452818152918201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101919091529091506040805161010081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081019190915260005b86518560c0015160ff16108015610570575085518460c0015160ff16105b15611ecb57845115801561058357508351155b15610bb35760018086528452600254608080870151908601516040517f6887eee800000000000000000000000000000000000000000000000000000000815260ff9283166004820152911660248201526001600160a01b0390911690636887eee890604401602060405180830381865afa158015610605573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106299190612e35565b1561063957849250839150610640565b8392508491505b60008060006106528660800151612a02565b151560208801529015156040880152925082156108e8578460e001518560c0019060ff16908160ff16815250508a60405180604001604052808a815260200189815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050505050611ecb565b8460200151610bab576108fe8560800151612a02565b9115156040880152925090508115610b8f578560e001518660c0019060ff16908160ff16815250508a60405180604001604052808a815260200189815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050505050611ecb565b808015610b9e57508560400151155b15610bab57600160208701525b505050611119565b8451610e6857600185526080850151600090610bce90612a02565b15156020880152901515604088015290508015610e62578460e001518560c0019060ff16908160ff168152505088604051806040016040528088815260200187815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff1602179055505050505050611ecb565b50611119565b835161111957600184526080840151600090610e8390612a02565b15156020890152901515604087015290508015611117578560e001518660c0019060ff16908160ff168152505088604051806040016040528088815260200187815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff1602179055505050505050611ecb565b505b84602001518061112a575083604001515b15611496578360a0015160ff16856060015160ff16116114755760c0850180519061115482612e6d565b60ff1660ff168152505086518560c0015160ff16036113d35787604051806040016040528087815260200186815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050611ecb565b868560c0015160ff16815181106113ec576113ec612e1f565b602002602001015160200151856060019060ff16908160ff1681525050868560c0015160ff168151811061142257611422612e1f565b602002602001015160400151856080019060ff16908160ff1681525050868560c0015160ff168151811061145857611458612e1f565b60209081029190910101515160ff1660a086015260008552611c13565b8360a001518560600181815161148b9190612e8c565b60ff16905250611c13565b8360200151806114a7575084604001515b1561180e578460a0015160ff16846060015160ff16116117f85760c084018051906114d182612e6d565b60ff1660ff16815250508360e0015160ff168460c0015160ff16036117565787604051806040016040528087815260200186815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050611ecb565b858460c0015160ff168151811061176f5761176f612e1f565b602002602001015160200151846060019060ff16908160ff1681525050858460c0015160ff16815181106117a5576117a5612e1f565b602002602001015160400151846080019060ff16908160ff1681525050858460c0015160ff16815181106117db576117db612e1f565b60209081029190910101515160ff1660a085015260008452611c13565b8460a001518460600181815161148b9190612e8c565b8360a0015160ff16856060015160ff161161183a5760c0850180519061183382612e6d565b60ff169052505b8460a0015160ff16846060015160ff16116118665760c0840180519061185f82612e6d565b60ff169052505b86518560c0015160ff16148061188957508360e0015160ff168460c0015160ff16145b15611af45787604051806040016040528087815260200186815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff16021790555050505050611ecb565b8360a0015160ff16856060015160ff1611611bab57868560c0015160ff1681518110611b2257611b22612e1f565b602002602001015160200151856060019060ff16908160ff1681525050868560c0015160ff1681518110611b5857611b58612e1f565b602002602001015160400151856080019060ff16908160ff1681525050868560c0015160ff1681518110611b8e57611b8e612e1f565b60209081029190910101515160ff1660a086015260008552611bc8565b8360a0015185606001818151611bc19190612e8c565b60ff169052505b8460a0015160ff16846060015160ff1611611bf657858460c0015160ff168151811061176f5761176f612e1f565b8460a0015184606001818151611c0c9190612e8c565b60ff169052505b87604051806040016040528087815260200186815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff160217905550505060208201518160010160008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff02191690831515021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff16021790555060c08201518160000160066101000a81548160ff021916908360ff16021790555060e08201518160000160076101000a81548160ff021916908360ff1602179055505050505060008560200190151590811515815250506000856040019015159081151581525050600084602001901515908115158152505060008460400190151590811515815250508080611ec390612ea5565b915050610552565b336000908152600460209081526040808320815160808101835281548152600182015493810193909352600281015491830191909152600301546060820152885160c088015191929160ff16148015611f2b575087518660c0015160ff16145b15611f4c5760408201805190611f4082612ea5565b90525060009050611fa4565b88518760c0015160ff1603611f7d5760208201805190611f6b82612ea5565b90525050600060608201526002611fa4565b815182611f8982612ea5565b90525060608201805190611f9c82612ea5565b905250600190505b3360009081526004602090815260409182902084518082559185015160018201559184015160028301556060840151600390920191909155611fe99060ff8316612ac3565b7f6aeaa88470c08aa431fe4452b98ae2afdd6dc449509ae67ba2487e570951abbd338c8b8b85604051612020959493929190612f17565b60405180910390a1505050505050505050505050565b60025481516040516331a9108f60e11b8152600481019190915233916001600160a01b031690636352211e90602401602060405180830381865afa158015612082573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120a69190612f67565b6001600160a01b0316141580156120bd5750805115155b80612150575060025460208201516040516331a9108f60e11b8152600481019190915233916001600160a01b031690636352211e90602401602060405180830381865afa158015612112573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121369190612f67565b6001600160a01b0316141580156121505750602081015115155b806121e3575060025460408083015190516331a9108f60e11b8152600481019190915233916001600160a01b031690636352211e90602401602060405180830381865afa1580156121a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121c99190612f67565b6001600160a01b0316141580156121e35750604081015115155b156122305760405162461bcd60e51b815260206004820152601660248201527f796f75206d757374206f776e20616c6c2063617264730000000000000000000060448201526064016102ae565b602081015181511480612247575060408101518151145b80156122535750805115155b806122735750604081015160208201511480156122735750602081015115155b156122c05760405162461bcd60e51b815260206004820152601260248201527f696473206d75737420626520756e69717565000000000000000000000000000060448201526064016102ae565b50565b6122cb6127dd565b6122d56000612b67565b565b606060056000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561252c578382906000526020600020906002020160405180604001604052908160008201604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff1681525050815260200160018201604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff1681525050815250508152602001906001019061230c565b505050509050919050565b6005602052816000526040600020818154811061255357600080fd5b90600052602060002090600202016000915091505080600001604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff16815250509080600101604051806101000160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900460ff161515151581526020016000820160029054906101000a900460ff161515151581526020016000820160039054906101000a900460ff1660ff1660ff1681526020016000820160049054906101000a900460ff1660ff1660ff1681526020016000820160059054906101000a900460ff1660ff1660ff1681526020016000820160069054906101000a900460ff1660ff1660ff1681526020016000820160079054906101000a900460ff1660ff1660ff1681525050905082565b61275a6127dd565b6002805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6127916127dd565b6001600160a01b0381166127d4576040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600060048201526024016102ae565b6122c081612b67565b6000546001600160a01b031633146122d5576040517f118cdaa70000000000000000000000000000000000000000000000000000000081523360048201526024016102ae565b6040805142602082015244918101919091526bffffffffffffffffffffffff1933606090811b82168184015232901b16607482015260009082906088016040516020818303038152906040528051906020012060001c6128839190612f84565b92915050565b6040805160038082526080820190925260609160009190816020015b60408051606081018252600080825260208083018290529282015282526000199092019101816128a55790505090506000805b60038110156129f9578481600381106128f3576128f3612e1f565b6020020151156129e75760408051606081018252600080825260208201819052918101919091526002546001600160a01b031663ef7c895987846003811061293d5761293d612e1f565b60200201516040518263ffffffff1660e01b815260040161296091815260200190565b606060405180830381865afa15801561297d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129a19190612fbc565b60ff90811660408501529081166020840152168152835181908590859081106129cc576129cc612e1f565b602002602001018190525082806129e290612ea5565b935050505b806129f181612ea5565b9150506128d8565b50909392505050565b60008060008360ff16600003612a215750600191506000905080612abc565b8360ff16600103612a5a57605a612a386064612823565b10612a4c5750600091506001905081612abc565b506000915081905080612abc565b8360ff16600203612a745750600091508190506001612abc565b60405162461bcd60e51b815260206004820152600f60248201527f696e76616c6964206162696c697479000000000000000000000000000000000060448201526064016102ae565b9193909250565b80600103612b63576064612ad8600584612f84565b600003612ae457506103e85b6003546040517f79c65068000000000000000000000000000000000000000000000000000000008152336004820152602481018390526001600160a01b03909116906379c6506890604401600060405180830381600087803b158015612b4957600080fd5b505af1158015612b5d573d6000803e3d6000fd5b50505050505b5050565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146122c057600080fd5b600060208284031215612beb57600080fd5b8135612bf681612bc4565b9392505050565b6040516060810167ffffffffffffffff81118282101715612c2e57634e487b7160e01b600052604160045260246000fd5b60405290565b600060608284031215612c4657600080fd5b82601f830112612c5557600080fd5b612c5d612bfd565b806060840185811115612c6f57600080fd5b845b81811015612c89578035845260209384019301612c71565b509095945050505050565b600060208284031215612ca657600080fd5b5035919050565b80511515825260208101511515602083015260408101511515604083015260ff606082015116606083015260ff608082015116608083015260a0810151612cf960a084018260ff169052565b5060c0810151612d0e60c084018260ff169052565b5060e0810151612d2360e084018260ff169052565b505050565b6020808252825182820181905260009190848201906040850190845b81811015612d7f578351612d59848251612cad565b850151612d6a610100850182612cad565b50928401926102009290920191600101612d44565b50909695505050505050565b60008060408385031215612d9e57600080fd5b50508035926020909101359150565b6102008101612dbc8285612cad565b612bf6610100830184612cad565b600060608284031215612ddc57600080fd5b82601f830112612deb57600080fd5b612df3612bfd565b806060840185811115612e0557600080fd5b845b81811015612c89578051845260209384019301612e07565b634e487b7160e01b600052603260045260246000fd5b600060208284031215612e4757600080fd5b81518015158114612bf657600080fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff8103612e8357612e83612e57565b60010192915050565b60ff828116828216039081111561288357612883612e57565b600060018201612eb757612eb7612e57565b5060010190565b600081518084526020808501945080840160005b83811015612f0c578151805160ff9081168952848201518116858a0152604091820151169088015260609096019590820190600101612ed2565b509495945050505050565b6001600160a01b038616815284602082015260a060408201526000612f3f60a0830186612ebe565b8281036060840152612f518186612ebe565b91505060ff831660808301529695505050505050565b600060208284031215612f7957600080fd5b8151612bf681612bc4565b600082612fa157634e487b7160e01b600052601260045260246000fd5b500690565b805160ff81168114612fb757600080fd5b919050565b600080600060608486031215612fd157600080fd5b612fda84612fa6565b9250612fe860208501612fa6565b9150612ff660408501612fa6565b9050925092509256fea26469706673582212206e3ad724ac684ff74ef5e1a3a9e2340b2d905f0bfe48c8cb9331145bc49ba37164736f6c63430008140033";

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
