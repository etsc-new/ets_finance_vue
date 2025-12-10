<script setup>
import {inject, onMounted, onUnmounted, ref} from "vue";
import List from '@/components/List/List.vue';
import StakeModal from '@/components/Modal/StakeModal.vue';
import Alert from '@/components/Alert/Alert.vue';
import NumberFlow from '@number-flow/vue'
// 显示警告框
import {useEtsFinanceStore} from "@/stores/etsFinance";
import {replaceMiddleWithAsterisks, toFixed} from "@/js/utils";
import {getSelectedAddress} from "@/js/web3";
import BigNumber from "bignumber.js";
import {nowTimestamp} from "@/js/time";

const active = ref('投资列表')
const store = useEtsFinanceStore();

const stakingModalShow = ref(false);
const totalBalance = ref('0');
const it = ref(0)

onMounted(async () => {
  await init();
  it.value = setInterval(async () => {
    await init()
  }, 8000);
})

onUnmounted(() => {
  if (it.value > 0) clearInterval(it.value)
})

async function init() {
  await Promise.all([
    store.setState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 21]),
  ]);

  setTotalBalance()
  // it.value = setInterval(() => {
  //   setTotalBalance()
  // }, 3000);
}

function showModal() {
  stakingModalShow.value = true;
}

function setTotalBalance() {
  let amount = new BigNumber(0);
  let end = new BigNumber(nowTimestamp());

  for (let order of store.pendingOrders) {
    let finance = store.finances[order.financeId];

    let investAmount = new BigNumber(order.investAmount);
    let investTime = new BigNumber(order.investTime);
    let interestRate = new BigNumber(finance.interestRate);
    let period = new BigNumber(finance.period);

    let perRate = interestRate.dividedBy(86400).dividedBy(365);

    if (end.gt(investTime.plus(period))) {
      end = investTime.plus(period);
    }
    let reward = end.minus(investTime).multipliedBy(perRate);
    amount = investAmount.plus(reward).plus(amount);
  }

  totalBalance.value = amount.toFixed(8, 1);
}

</script>
<template>
  <div class="content">
    <div class="top">
      <img src="@/assets/svg/top_logo.svg" alt="" class="logoImg">
<!--      <div></div>-->
      <div class="topRight">
        <div class="token">{{ replaceMiddleWithAsterisks(getSelectedAddress()) }}</div>
      </div>
    </div>
    <!--我的当前资产-->
    <div class="asset">
      <div class="asset-top">
        <img src="@/assets/svg/vector_left.svg" alt="" style="width: 104px; height: 17px;">
        <div class="asset-title">当前质押总资产</div>
        <img src="@/assets/svg/vector_right.svg" alt="" style="width: 104px; height: 17px;">
      </div>
      <div class="asset-token">
        <NumberFlow :value="totalBalance" :format="{maximumFractionDigits: 20}"/>
        <span>ETS</span>
      </div>
      <div class="asset-btn" @click="showModal()">
        <img src="@/assets/imgs/add.png" alt="" style="width: 16px; height: 16px;">
        质押ETS
      </div>
      <div class="asset-info">
        <div class="row">
          <div class="row-label">钱包余额</div>
          <div class="row-value">{{ store.ets.balance }} ETS</div>
        </div>
        <div class="row">
          <div class="row-label">7日剩余额度</div>
          <div class="row-value">{{ store.finances[0].quota }} ETS</div>
        </div>
        <div class="row">
          <div class="row-label">30日剩余额度</div>
          <div class="row-value">{{ store.finances[1].quota }} ETS</div>
        </div>
        <div class="row">
          <div class="row-label">90日剩余额度</div>
          <div class="row-value">{{ store.finances[2].quota }} ETS</div>
        </div>
        <div class="row">
          <div class="row-label">180日剩余额度</div>
          <div class="row-value">{{ store.finances[3].quota }} ETS</div>
        </div>
        <div class="row">
          <div class="row-label">360日剩余额度</div>
          <div class="row-value">{{ store.finances[4].quota }} ETS</div>
        </div>
      </div>
    </div>
    <div class="rule">
      <div class="rule-left">
        <div class="left-title">ETS投资规则</div>
        <div class="left-tip">质押ETS后按质押额，7日收益5%、30日收益10%、90日收益15%、180日收益20%、360日收益25%</div>
      </div>
      <img src="@/assets/svg/icon_01.svg" alt="" style="width: 122px; height: 87px;">
    </div>
    <div class="list">
      <van-tabs v-model:active="active"
                animated color="#0E9AB2"
                background="transparent"
                line-width="32px"
                line-height="4px"
                title-inactive-color="#fff"
                title-active-color="#03EDFF"
      >
        <van-tab title="质押列表">
          <List :list="store.pendingOrders"/>
        </van-tab>
        <van-tab title="赎回列表">
          <List :list="store.redeemedOrders"/>
        </van-tab>
      </van-tabs>
    </div>
    <StakeModal
      v-model:show="stakingModalShow"
      @confirm="(v) => {
        console.log('StakeModal', v);
      }"
      @cancel="() => {
        stakingModalShow = false;
      }"
      @staked="() => {
        console.log('staked')
        // stakingList.getList();
      }"
    />
    <Alert/>

  </div>
</template>
<style scoped lang="scss">
@use "@/views/index/index";
</style>
