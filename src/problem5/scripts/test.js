const { ethers } = require("hardhat");
const { abi } = require("../artifacts/contracts/RetrieveBalance.sol/RetrieveBalance.json");

// Ropsten testnet 
const RETRIEVE_BALANCE_CONTRACT_ADDR = "0x14aa0EbB29abdB51F82430913D7d7EDc1C38E67b"; 

const ACCOUT_ADDR = "0x3d002404deee63697fbef95657dce57335bf561d";
const TOKEN_CONTRACT_ADDRS = ["0xAd44c8493dE3FE2B070f33927A315b50Da9a0e25", "0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108"];

const provider = ethers.providers.getDefaultProvider("ropsten");
const test = async () => {

  const contract = new ethers.Contract(RETRIEVE_BALANCE_CONTRACT_ADDR, abi, provider);
  const balances = await contract.getBalances(ACCOUT_ADDR, TOKEN_CONTRACT_ADDRS);
  console.log(Object.fromEntries(balances));
}

test();
