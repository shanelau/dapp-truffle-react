export async function testContract(dapp) {
  const accounts = dapp.accounts;
  const result = await dapp.contracts.MetaCoin.sendCoin(accounts[1], 10, { from: accounts[0] });
  console.log(result.valueOf());
  const balance = await dapp.contracts.MetaCoin.getBalance
  .call(accounts[0], { from: accounts[0] });
  console.log(balance.valueOf());
}
