import defaultAbi from '@/abis/multiCall';
import {getAddress} from "@/js/config";
import {getContract, getSelectedAddress} from "@/js/web3";
import {allowanceEncode, balanceOfEncode} from "@/js/contracts/erc20s";
import {etsFinanceFuncEncode} from "@/js/contracts/etsFinance";

export async function getDefaultContract() {
  let defaultAddress = await getAddress("multiCall");
  return await getContract(defaultAbi, defaultAddress)
}

export async function aggregate(calls) {
  let contract = await getDefaultContract();
  if (window?.ethereum?.platform == 'etsc') {
    return await contract.aggregate(calls);
  } else {
    const sendParam = {from: window.ethereum?.selectedAddress};
    return await contract?.methods?.aggregate(calls).call(sendParam);
  }
}

export async function getCalls(callIds = [], user = '') {
  if (user === '') user = getSelectedAddress();
  let calls = [];
  for (let id of callIds) {
    switch (id) {
      case 0:
        calls.push(await etsFinanceFuncEncode('finances', [0]));
        break;
      case 1:
        calls.push(await etsFinanceFuncEncode('finances', [1]));
        break;
      case 2:
        calls.push(await etsFinanceFuncEncode('finances', [2]));
        break;
      case 3:
        calls.push(await etsFinanceFuncEncode('finances', [3]));
        break;
      case 4:
        calls.push(await etsFinanceFuncEncode('finances', [4]));
        break;
      case 5:
        calls.push(await etsFinanceFuncEncode('financeInvested', [user, 0]));
        break;
      case 6:
        calls.push(await etsFinanceFuncEncode('financeInvested', [user, 1]));
        break;
      case 7:
        calls.push(await etsFinanceFuncEncode('financeInvested', [user, 2]));
        break;
      case 8:
        calls.push(await etsFinanceFuncEncode('financeInvested', [user, 3]));
        break;
      case 9:
        calls.push(await etsFinanceFuncEncode('financeInvested', [user, 4]));
        break;
      case 10:
        calls.push(await etsFinanceFuncEncode('getOrders', [user]));
        break;
      case 20:
        calls.push(await balanceOfEncode('ets', user));
        break;
      case 21:
        calls.push(await allowanceEncode('ets', await getAddress('etsFinance')));
        break;
    }
  }
  return calls;
}
