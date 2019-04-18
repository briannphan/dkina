let overrides = {
  gasLimit:200000
}
async function mint() {

  let _to = document.getElementById("mintAddress").value
  let amount = document.getElementById("mintAmount").value

  amount = ethers.utils.parseUnits(amount,2);
  await dKinaContract.mint(_to,amount,overrides);

}

async function configureMinter() {

  let minter = document.getElementById("newminterAddress").value
  let minterAllowedAmount = document.getElementById("newminterAmount").value


  await dKinaContract.configureMinter(minter,minterAllowedAmount,overrides);

}

async function blackList(){
  let address = document.getElementById("unblacklistAddress").value
  await dKinaContract.blacklist(address,overrides)
}

async function unBlackList(){
  let address = document.getElementById("unblacklistAddress").value
  await dKinaContract.unBlacklist(address,overrides)
}

async function pause(){
  await dKinaContract.pause(overrides);
}

async function unpause(){
  await dKinaContract.unpause(overrides);

}

async function burn(){
  let burnAmount = document.getElementById("burnAmount").value
  burnAmount = ethers.utils.parseUnits(burnAmount,2);

  await dKinaContract.burn(burnAmount,overrides);
}

async function getBalance(){
  let balance = await dKinaContract.balanceOf(signer._address)
  balance = ethers.utils.formatUnits(balance,2);
  return balance
}
