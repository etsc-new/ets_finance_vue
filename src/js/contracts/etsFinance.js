import defaultAbi from '@/abis/etsFinance';
import {getAddress} from "@/js/config";
import {getContract, getSelectedAddress, getSendPram} from "@/js/web3";
import {Interface} from "ethers";
import BigNumber from "bignumber.js";
import {postMessage} from "@/js/transaction";

export async function getDefaultContract() {
  let defaultAddress = await getAddress('etsFinance');
  return await getContract(defaultAbi, defaultAddress)
}

export async function invest(financeId, amount) {
  let etsFinance = await getDefaultContract();
  console.log(financeId, amount);
  amount = new BigNumber(amount).multipliedBy(1e6).toFixed();

  if (window?.ethereum?.platform == 'etsc') {
    await postMessage({
      name: 'sendTx',
      target: etsFinance.target,
      data: etsFinance.interface.encodeFunctionData("invest", [financeId, amount])
    })
  } else {
    await etsFinance?.methods?.invest(financeId, amount).send(await getSendPram());
  }
}

export async function claim(id) {
  let etsFinance = await getDefaultContract();

  if (window?.ethereum?.platform == 'etsc') {
    await postMessage({
      name: 'sendTx',
      target: etsFinance.target,
      data: etsFinance.interface.encodeFunctionData("claim", [id])
    })
  } else {
    await etsFinance?.methods?.claim(id).send(await getSendPram());
  }
}

export async function etsFinanceFuncEncode(func, args = []) {
  let imp = new Interface(defaultAbi);
  return [
    await getAddress('etsFinance'),
    args.length === 0 ?
      imp.encodeFunctionData(func) : imp.encodeFunctionData(func, args),
  ]
}

export function etsFinanceFuncDecode(func, result) {
  let imp = new Interface(defaultAbi);
  let res = imp.decodeFunctionResult(func, result);
  if (func === 'finances') {
    return {
      period: new BigNumber(res[0]).toNumber(),
      interestRate: new BigNumber(res[1]).dividedBy(1e3).toNumber(),
      miniInvest: new BigNumber(res[2]).dividedBy(1e6).toNumber(),
      quotaTotal: new BigNumber(res[3]).dividedBy(1e6).toNumber(),
      quotaUsed: new BigNumber(res[4]).dividedBy(1e6).toNumber(),
      quota: new BigNumber(res[3]).minus(res[4]).dividedBy(1e6).toNumber(),
    }
  } else if (func === 'getOrders') {
    return parseOrders(res[0]);
  }
  return res[0];
}

function parseOrders(list) {
  // list是proxy对象无法直接倒叙
  let orders = [];
  list.forEach((item, index) => {
    orders.push({
      id: parseInt(index),
      loading: false,
      financeId: new BigNumber(item[0]).toNumber(),
      investTime: new BigNumber(item[1]).toNumber(),
      claimTime: new BigNumber(item[2]).toNumber(),
      investAmount: new BigNumber(item[3]).dividedBy(1e6).toNumber(),
      claimAmount: new BigNumber(item[4]).dividedBy(1e6).toNumber(),
    });
  })

  orders.sort((a, b) => b.investTime - a.investTime);

  let pendingList = [];
  let redeemList = [];
  orders.forEach(order => {
    if (order.claimAmount > 0) redeemList.push(order);
    else pendingList.push(order);
  })

  return [pendingList, redeemList];
}
