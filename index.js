// JavaScript source code
var dKinaContract
var dKinaContractAddress = '0xc1825b88c169eb94e53d83325e3a032d16443887'
var signer
var provider
//var ethers = require('ethers');
var utils = ethers.utils;

var dKinaABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "blacklist",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "minter",
                "type": "address"
            },
            {
                "name": "minterAllowedAmount",
                "type": "uint256"
            }
        ],
        "name": "configureMinter",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_pauser",
                "type": "address"
            },
            {
                "name": "_blacklister",
                "type": "address"
            },
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "minter",
                "type": "address"
            }
        ],
        "name": "removeMinter",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "unBlacklist",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newBlacklister",
                "type": "address"
            }
        ],
        "name": "updateBlacklister",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newMasterMinter",
                "type": "address"
            }
        ],
        "name": "updateMasterMinter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newPauser",
                "type": "address"
            }
        ],
        "name": "updatePauser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "minter",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "burner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "minter",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "minterAllowedAmount",
                "type": "uint256"
            }
        ],
        "name": "MinterConfigured",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "oldMinter",
                "type": "address"
            }
        ],
        "name": "MinterRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "newMasterMinter",
                "type": "address"
            }
        ],
        "name": "MasterMinterChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "Blacklisted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "UnBlacklisted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "newBlacklister",
                "type": "address"
            }
        ],
        "name": "BlacklisterChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Pause",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Unpause",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "PauserChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "blacklister",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "currency",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "isBlacklisted",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isMinter",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isOwner",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "masterMinter",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "minter",
                "type": "address"
            }
        ],
        "name": "minterAllowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "pauser",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
    ;
function initialize(_ethers) {
    dKinaContract = new _ethers.Contract(dKinaContractAddress, dKinaABI, signer)
}

async function Mint() {
    var ValueToMint = document.getElementById("MintAmount").value;
    var MintToAddress = document.getElementById("MintToAddress").value;
    await dKinaContract.mint(MintToAddress, ValueToMint);
}

async function Transfer() {
    var ValueToTransfer = document.getElementById("TransferAmount").value;
    var TransferToAddress = document.getElementById("TransferToAddress").value;
    await dKinaContract.transfer(TransferToAddress, ValueToTransfer);
}

async function CheckBalance() {
    var WalletAddress = document.getElementById("WalletAddress").value;
    var dKinaBalance = await dKinaContract.balanceOf(WalletAddress);
    document.getElementById("WalletBalance").value = dKinaBalance;
}

let topic = ethers.utils.id("Transfer(address,address,uint256)");


const filter = {
    address: dKinaContractAddress,
    fromBlock: 5422321,
    toBlock: 6000000,
    topics: [topic]
};

var provider = new ethers.providers.Web3Provider(web3.currentProvider, 'ropsten');
    provider.listAccounts().then(function (accounts) {
    signer = provider.getSigner(accounts[0]);

    initialize(ethers)
}
)

async function GetTrans()
{
    var QueryResult = provider.getLogs(filter);
    QueryResult.then(function (result) {
        document.getElementById("txtTransaction").value = result.length

        document.write("<table BORDER=1 CELLPADDING=0 CELLSPACING=0 WIDTH=100%>"
            + "<tr><th>Date</th><th>From</th><th>To</th><th>Amount</th></tr>");
        for (var i = 0; i < result.length; i++) {
            var from = (result[i].topics[1])
            var to = (result[i].topics[2])
            var amount = (result[i].data)
            var date;

            from = utils.hexStripZeros(from)
            to = utils.hexStripZeros(to)
            amount = utils.formatUnits(result[i].data, 2)

            var blockNo = result[i].blockNumber
            provider.getBlock(blockNo).then(function (result) {
                var timeValue = result.timestamp;

                date = new Date(timeValue * 1000);
            }
                )

            document.write("<tr><td><center>" + date + "</center></td>"
                + "<td><center>" + from + "</center></td>"
                + "<td><center>" + to + "</center></td>"
                + "<td><center>" + amount + "</center></td></tr>");
        }
        document.write("</table>");

    })
}


provider.getLogs(filter).then(function (result) {
    console.log(result.length)
    for (var i = 0; i < result.length; i++) {
   
        var from = (result[i].topics[1])
        var to = (result[i].topics[2])
        var amount = (result[i].data)


        from = utils.hexStripZeros(from)
        to = utils.hexStripZeros(to)
        var amount = utils.formatUnits(result[i].data, 8)
        console.log("From: ")
        console.log(from)
        console.log("To: ")
        console.log(to)
        console.log("Amount: ")
        console.log(amount)

    }
    
}

);

//async function get() {
//    var ValueToGet = await dKinaContract.get();
//    document.getElementById("outputValue").innerHTML = ValueToGet;

//