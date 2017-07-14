
## DApp develop demo

### Component
1. [truffle--Ethereum development framework](https://github.com/trufflesuite/truffle)
2. [dva--React and redux based, lightweight and elm-style framework](https://github.com/dvajs/dva)
3. [web3.js--Ethereum JavaScript API](https://github.com/ethereum/web3.js)
4. [testrpc--Fast Ethereum RPC client for testing and development](https://github.com/ethereumjs/testrpc)

## Get Start
### 1. Testprc

```
npm install -g truffle
```
Then run testprc by docker or terminal.

```
testrpc -a 10 --debug --db /data/testrpc --mem 2048 -b 1
```
Or

```
docker run -d -p 8545:8545 -v /root/testrpc-db:/data/testrpc --name testrpc harshjv/testrpc:latest -a 10 --debug --db /data/testrpc --mem 2048 -b 1
```

### 2. Truffle

  ```
  npm install -g truffle
  ```

1. `cd truffle`, You could build and migrate your contracts to blockchain.
2. `npm run build`, Build and migrate contracts
4. `npm test`, use mocha to test contracts.

### 3 Network config

```
config/index.js
```

### 4. React framework

```
npm start
```


### 5. Config contracts
Config contract in file `config/index.js`

```
  contracts: {
    MetaCoin: true,
    OtherContract: true,
    OtherContract: false,  // not load
  },
```

### 6. Use contract
All of contract and web3 will be mount on `window.dapp`;

```
window.web3 = web3;
window.dapp = {
  web3,
  accounts,
  contracts,
};
```

#### Example 1

```
let MetaCoin = window.dapp.constracts.MetaCoin;
MetaCoin.sendCoin(xxxx)
```

#### Example 2

`./src/services/contract.js`

```
export async function testContract(dapp) {
  const accounts = dapp.accounts;
  const result = await dapp.contracts.MetaCoin.sendCoin(accounts[1], 10, { from: accounts[0] });
  console.log(result.valueOf());
  const balance = await dapp.contracts.MetaCoin.getBalance.call(accounts[0], { from: accounts[0] });
  console.log(balance.valueOf());
}
```

#### Eaxample 3

```
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
```