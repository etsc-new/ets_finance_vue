const addresses = {
  // "19123": {
  //   ets: "0xA4EcbaC040707C881b16186d5cbd95BB1B9fB935",
  //   etsFinance: '0x6a795060119606f623d2EA3e8608f9d06246E16e',
  //   multiCall: '0xCb85365b5E38C8716F665F998cd83c2ACC3F46cd',
  // },
  // 正式
  "19123": {
    ets: "0xDcF33483636178F52245aC697ec6A4AfC79E298c",
    etsFinance: '0xF55a378943030422d47Ff3DA258a76650b5668b7',
    multiCall: '0xCb85365b5E38C8716F665F998cd83c2ACC3F46cd',
  },
}

export async function getAddress(name) {
  const chainId = await getChainId();
  return addresses[chainId][name];
}

export async function getChainId() {
  if (window?.ethereum?.platform == 'etsc') {
    return window?.ethereum?.chainId
  } else {
    let chainId = await window.ethereum.request({method: 'eth_chainId'});
    return parseInt(chainId, 16).toString()
  }
}


