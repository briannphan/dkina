let overrides = {
  gasLimit:200000
}
async function mint() {

  let _to
  let amount
  await dKinaContract.mint(_to,amount,overrides);
}

async function configureMinter() {

  let minter
  let minterAllowedAmount
  await dKinaContract.configureMinter(minter,minterAllowedAmount,overrides);

}

async function blackList(){
  let address
  await dKinaContract.blacklist(address,overrides)
}

async function unBlackList(){
  let address
  await dKinaContract.unBlacklist(address,overrides)
}

async function pause(){
  await dKinaContract.pause(overrides);
}

async function unpause(){
  await dKinaContract.unpause(overrides);

}

async function burn(){
  let burnAmount
  await dKinaContract.burn(burnAmount,overrides);
}

async function getBalance(){
  let balance = await dKinaContract.balanceOf(signer._address)
  return balance
}
