import Web3 from 'web3';
import contract from 'truffle-contract';
import config from './config';

if (typeof web3 !== 'undefined') {
  window.web3 = new Web3(web3.currentProvider);
} else {
  const url = `http://${config.networks.host}:${config.networks.port}`;
  window.web3 = new Web3(new Web3.providers.HttpProvider(url));
}


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

  const keys = Object.keys(config.contracts);
  const contracts = {};
  for (const name of keys) {
    if (config.contracts[name]) {
      /* eslint-disable import/no-dynamic-require */
      config.contracts[name] = contract(require(`./assets/contracts/${name}.json`));
      config.contracts[name].setProvider(web3.currentProvider);
      contracts[name] = await config.contracts[name].deployed();
    }
  }
  // 注册合约 END
  window.dapp = {
    web3,
    accounts,
    contracts,
  };
  return Promise.resolve(window.dapp);
}

export default function (app, window) {
  /* eslint-disable no-unused-vars */
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      app.start('#root');
      resolve(doSomething(window));
    });
  });
}

