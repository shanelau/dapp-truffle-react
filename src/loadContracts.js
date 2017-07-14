import Web3 from 'web3';
import contract from 'truffle-contract';
import metacoinArtifacts from '../truffle/build/contracts/MetaCoin.json';
import config from './config';

if (typeof web3 !== 'undefined') {
  window.web3 = new Web3(web3.currentProvider);
} else {
  window.web3 = new Web3(new Web3.providers.HttpProvider(config.network.url));
}
const MetaCoin = contract(metacoinArtifacts);
MetaCoin.setProvider(web3.currentProvider);


async function doSomething() {
  const accounts = await new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, result) => {
      if (err) {
        return reject(new Error('There was an error fetching your accounts.'));
      }

      if (!result.length) {
        return reject(new Error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly."));
      }
      resolve(result);
    });
  });

  // 注册合约
  const meta = await MetaCoin.deployed();

  return Promise.resolve({
    accounts,
    meta,
  });
}

export default function (app, window) {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      app.start('#root');
      resolve(doSomething(window));
    });
  });
}

