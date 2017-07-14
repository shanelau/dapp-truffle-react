export async function testContract(dapp) {
  const accounts = dapp.accounts;
  const result = await dapp.constracts.MetaCoin.sendCoin(accounts[1], 10, { from: accounts[0] });
  console.log(result.valueOf());
  const balance = await dapp.constracts.MetaCoin.getBalance
  .call(accounts[0], { from: accounts[0] });
  console.log(balance.valueOf());
}
