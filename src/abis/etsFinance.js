export default [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "beacon",
        "type": "address"
      }
    ],
    "name": "BeaconUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "financeId",
            "type": "uint8"
          },
          {
            "internalType": "uint32",
            "name": "investTime",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "claimTime",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "investAmount",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "claimAmount",
            "type": "uint64"
          }
        ],
        "indexed": false,
        "internalType": "struct EtsFinance.Order",
        "name": "order",
        "type": "tuple"
      }
    ],
    "name": "Claimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "financeId",
            "type": "uint8"
          },
          {
            "internalType": "uint32",
            "name": "investTime",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "claimTime",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "investAmount",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "claimAmount",
            "type": "uint64"
          }
        ],
        "indexed": false,
        "internalType": "struct EtsFinance.Order",
        "name": "order",
        "type": "tuple"
      }
    ],
    "name": "Invested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "financeInvested",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "finances",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "period",
        "type": "uint32"
      },
      {
        "internalType": "uint24",
        "name": "interestRate",
        "type": "uint24"
      },
      {
        "internalType": "uint64",
        "name": "miniInvest",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "quotaTotal",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "quotaUsed",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "closed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getOrders",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "financeId",
            "type": "uint8"
          },
          {
            "internalType": "uint32",
            "name": "investTime",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "claimTime",
            "type": "uint32"
          },
          {
            "internalType": "uint64",
            "name": "investAmount",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "claimAmount",
            "type": "uint64"
          }
        ],
        "internalType": "struct EtsFinance.Order[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IManager",
        "name": "_manager",
        "type": "address"
      },
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "financeId",
        "type": "uint8"
      },
      {
        "internalType": "uint64",
        "name": "amount",
        "type": "uint64"
      }
    ],
    "name": "invest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "internalType": "contract IManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "financeId",
        "type": "uint8"
      },
      {
        "internalType": "uint32",
        "name": "investTime",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "claimTime",
        "type": "uint32"
      },
      {
        "internalType": "uint64",
        "name": "investAmount",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "claimAmount",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "financeId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "period",
            "type": "uint32"
          },
          {
            "internalType": "uint24",
            "name": "interestRate",
            "type": "uint24"
          },
          {
            "internalType": "uint64",
            "name": "miniInvest",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "quotaTotal",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "quotaUsed",
            "type": "uint64"
          },
          {
            "internalType": "bool",
            "name": "closed",
            "type": "bool"
          }
        ],
        "internalType": "struct EtsFinance.Finance",
        "name": "finance",
        "type": "tuple"
      }
    ],
    "name": "setFinance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      }
    ],
    "name": "upgradeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
