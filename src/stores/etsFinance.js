import {defineStore} from 'pinia'
import {aggregate, getCalls} from "@/js/contracts/multiCall";
import {allowanceDecode, balanceOfDecode} from "@/js/contracts/erc20s";
import {etsFinanceFuncDecode} from "@/js/contracts/etsFinance";
import BigNumber from "bignumber.js";
import {nowTimestamp} from "@/js/time";

export const useEtsFinanceStore = defineStore('etsFinance', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => ({
    ets: {
      balance: 0,
      allowance: 0
    },
    finances: financeInit,
    financeInvested: [
      false, false, false, false, false
    ],
    pendingOrders: [],
    redeemedOrders: [],
    total: 0,
  }),
  getters: {

  },
  actions: {
    async setState(callIds = []) {
      let res = await aggregate(await getCalls(callIds));
      res.forEach((data, index) => {
        switch (callIds[index]) {
          case 0:
            this.finances[0] = etsFinanceFuncDecode('finances', data);
            break;
          case 1:
            this.finances[1] = etsFinanceFuncDecode('finances', data)
            break
          case 2:
            this.finances[2] = etsFinanceFuncDecode('finances', data);
            break;
          case 3:
            this.finances[3] = etsFinanceFuncDecode('finances', data);
            break;
          case 4:
            this.finances[4] = etsFinanceFuncDecode('finances', data);
            break;
          case 5:
            this.financeInvested[0] = etsFinanceFuncDecode('financeInvested', data);
            break;
          case 6:
            this.financeInvested[1] = etsFinanceFuncDecode('financeInvested', data);
            break;
          case 7:
            this.financeInvested[2] = etsFinanceFuncDecode('financeInvested', data);
            break;
          case 8:
            this.financeInvested[3] = etsFinanceFuncDecode('financeInvested', data);
            break;
          case 9:
            this.financeInvested[4] = etsFinanceFuncDecode('financeInvested', data);
            break;
          case 10:
            [this.pendingOrders, this.redeemedOrders] = etsFinanceFuncDecode('getOrders', data);
            break;
          case 20:
            this.ets.balance = balanceOfDecode(data);
            break;
          case 21:
            this.ets.allowance = allowanceDecode(data);
            break;
        }
      })
    },
  },
})

let financeInit = [{
  period: 86400 * 7,
  interestRate: 50,
  miniInvest: 1,
  quotaTotal: 1000,
  quotaUsed: 0,
  quota: 1000
}, {
  period: 86400 * 30,
  interestRate: 100,
  miniInvest: 1,
  quotaTotal: 1000,
  quotaUsed: 0,
  quota: 1000
}, {
  period: 86400 * 90,
  interestRate: 150,
  miniInvest: 1,
  quotaTotal: 1000,
  quotaUsed: 0,
  quota: 1000
}, {
  period: 86400 * 180,
  interestRate: 200,
  miniInvest: 1,
  quotaTotal: 1000,
  quotaUsed: 0,
  quota: 1000
}, {
  period: 86400 * 360,
  interestRate: 250,
  miniInvest: 1,
  quotaTotal: 1000,
  quotaUsed: 0,
  quota: 1000
}]
