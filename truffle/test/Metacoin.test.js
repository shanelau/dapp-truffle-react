const Web3 = require('web3');
const contract = require('truffle-contract');
const MetaCoin = contract(require('../build/contracts/MetaCoin.json'));

const providerUrl = 'http://121.196.203.34:8545/';
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);
MetaCoin.setProvider(web3.currentProvider);

// 两种办法引入合约
// const MetaCoin = artifacts.require('MetaCoin');
contract('10000', (accounts) => {
  it('Shoul put 100 MetaCoin in first account', () => {
    return MetaCoin.deployed().then((instance) => {
      return instance.getBalance.call(accounts[0]);
    }).then((balance) => {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });

  it.only('TestMeta senCoin to B', async () => {
    const instance = await MetaCoin.deployed(); // 获取合约对象
    const A = accounts[0];  // 创世账号
    const B = accounts[1];  // 第二个账号
    await instance.sendCoin(B, 1000, { from: A }); // 交易
    const ABalance = await instance.getBalance.call(A);  // 获取余额
    const BBalance = await instance.getBalance.call(B);
    assert.equal(ABalance.valueOf(), 9000, "10000 wasn't in the A account");
    assert.equal(BBalance.valueOf(), 1000, "0 wasn't in the B account");
  });
});
