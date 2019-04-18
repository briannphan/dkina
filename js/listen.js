var ethers = require('ethers');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var request = require('request');

var utils = ethers.utils;

var dKinaContract;
var dKinaContractAddress = '0x6e5489Fcf6790318f2875b7d513443c57FceC5dB';
var dKinaABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

let provider = ethers.getDefaultProvider('rinkeby');

dKinaContract = new ethers.Contract(dKinaContractAddress, dKinaABI, provider);



let topic = ethers.utils.id("Transfer(address,address,uint256)");


const filter = {
        address: dKinaContractAddress,
        fromBlock: 4181900,
        toBlock: 4234850,
        topics: [topic]
      };



    provider.getLogs(filter).then(function(result){
        console.log(result.length)
        for (var i=0;i<result.length;i++){
          var from = (result[i].topics[1])
          var to = (result[i].topics[2])
          var amount = (result[i].data)
          var date;

          from = utils.hexStripZeros(from)
          to = utils.hexStripZeros(to)
          var amount = utils.formatUnits(result[i].data,8)
            var blockNo = result[i].blockNumber
          provider.getBlock(blockNo).then(function(result){
            var timeValue = result.timestamp;

            date = new Date(timeValue*1000);

            console.log("From: ")

            console.log(from)
            console.log("To: ")
            console.log(to)
            console.log("Amount: ")
            console.log(amount)
            console.log("Time: ")
            console.log(date.toString())

          })


        }
    });





//listenToTransfers();




// function listenToTransfers(){
//     dKinaContract.on("Transfer", (from, to, value, event) => {
//
//
//
//       console.log(event)
//       sendFBMessage(to, value);
//     });
// }
//
// function sendFBMessage(to, value){
//   console.log("Facebook notification to " + to + " has been sent")
// }
