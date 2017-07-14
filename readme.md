
## DApp develop demo

### component
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
2. `npm run migrate`, build and migrate contracts
3. `truffle/contracts`, all of contracts
4. `truffle/test`, mocha test contracts. Command `npm test`.

#### 3 Netwokd config

```
config/index.js
```

### 4. React framework

```
npm start
```


### 5. loadContracts
1. config contract `config/index.js`
    ```
      contracts: {
        MetaCoin: true,
        OtherContract: true,
        OtherContract: false,  // not load
      },
    ```
2. Load contract `./src/loadContracts.js`

  ```
    const keys = Object.keys(config.contracts);
    const constracts = {};
    for (const name of keys) {
      if (config.contracts[name]) {
        config.contracts[name] = contract(require(`./assets/contracts/${name}.json`));  // load file
        config.contracts[name].setProvider(web3.currentProvider); // set Provider
        constracts[name] = await config.contracts[name].deployed(); // get an instance
      }
    }
  ```
3. Use contract

`./src/services/contract.js`

#### Example 1:

```
let MetaCoin = window.dapp.constracts.MetaCoin;
MetaCoin.sendCoin(xxxx)
```

#### Example 1:

```
export async function testContract(dapp) {
  const accounts = dapp.accounts;
  const result = await dapp.constracts.MetaCoin.sendCoin(accounts[1], 10, { from: accounts[0] });
  console.log(result.valueOf());
  const balance = await dapp.constracts.MetaCoin.getBalance.call(accounts[0], { from: accounts[0] });
  console.log(balance.valueOf());
}
```