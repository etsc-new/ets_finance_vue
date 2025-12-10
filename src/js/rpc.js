import {JsonRpcProvider} from "ethers";

export function getRpcProvider() {
  if (window?.ethereum?.chainId == "19123") {
    return new JsonRpcProvider(etscRpc())
  } else {
    return new JsonRpcProvider(testRpc())
  }
}

function etscRpc() {
  return 'https://rpc.etscscan.site';
}

function testRpc() {
  return 'https://opbnb-testnet-rpc.bnbchain.org';
}
