import axios from "axios";
const ethers = require('ethers');

const tokenAddress: string = "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c";
const accountAddress: string[] = ['0x123d475e13aa54a43a7421d94caa4459da021c77', '0x0020c5222a24e4a96b720c06b803fb8d34adc0af', '0xfe808b079187cc460f47374580f5fb47c82b87a5'];

async function retrieveBalance () {

  try {
    accountAddress.forEach(async(element) => {
      const url: string = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${element}&tag=latest&apikey=YZNRP1BAID11P1YA6XXK7UYIK7Y6TKMZA2`;
      const response = await axios.get(url);
      console.log(element + " " + ethers.utils.commify(response.data['result'] / 10 ** 9));
    });  
  } catch (exception) {
      process.stderr.write(`ERROR received: ${exception}\n`);
  }
}

retrieveBalance();

