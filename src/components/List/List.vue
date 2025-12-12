<script setup>
import {inject, onMounted, ref, watch} from 'vue';
import {useI18n} from "vue-i18n";
import {claim} from "@/js/contracts/etsFinance";
import {countdownTime, nowTimestamp, timestampFormat} from "@/js/time";
import BigNumber from "bignumber.js";
import {useEtsFinanceStore} from "@/stores/etsFinance";

// 表头配置项
const {t, locale} = useI18n()
const store = useEtsFinanceStore();
const showError = inject("showError");
const showSuccess = inject("showSuccess");

const getHeaders = () => [
  {key: 'index', label: t('index'), flex: 1},
  {key: 'date', label: t('date'), flex: 2},
  {key: 'principal', label: t('principal'), flex: 1},
  {key: 'profit', label: t('profit'), flex: 2},
  {key: 'action', label: "赎回", flex: 1}
];
const headers = ref(getHeaders());
watch(locale, () => {
  headers.value = getHeaders();
});

const props = defineProps({
  list: {
    type: Array,
    default: []
  },
});

// const list = ref([]);
const finished = ref(true);

function getButtonName(item) {
  if (item.claimAmount > 0) return "已赎回"
  else {
    let investTime = new BigNumber(item.investTime);
    let end = new BigNumber(nowTimestamp());
    let finance = store.finances[item.financeId];
    let period = new BigNumber(finance.period);
    if (end.gt(investTime.plus(period))) {
      return "待赎回"
    } else {
      return "未到期"
    }
  }
}

function getReward(item) {
  if (item.claimAmount > 0) {
    return new BigNumber(item.claimAmount)
      .minus(item.investAmount).toNumber()
  } else {
    let finance = store.finances[item.financeId];
    let interestRate = new BigNumber(finance.interestRate).dividedBy(86400).dividedBy(365);
    return new BigNumber(item.investAmount)
      .multipliedBy(finance.period)
      .multipliedBy(interestRate)
      .toNumber()
  }
}

function getEnd(item) {
  let finance = store.finances[item.financeId];
  let period = new BigNumber(finance.period);
  return new BigNumber(item.investTime).plus(period).toNumber()
}

// onMounted(async () => {
//   if (props.status == 0) {
//     list.value = store.pendingOrders
//   } else {
//     list.value = store.redeemedOrders
//   }
//
//   list.value.forEach(item => {
//     if (item.claimAmount > 0) {
//       item.buttomName = "已赎回"
//       item.reward = new BigNumber(item.claimAmount).minus(item.investAmount).toFixed(5, 1)
//     } else {
//       let finance = store.finances[item.financeId];
//       let end = new BigNumber(nowTimestamp())
//       let investAmount = new BigNumber(item.investAmount);
//       let investTime = new BigNumber(item.investTime);
//       let interestRate = new BigNumber(finance.interestRate);
//       let period = new BigNumber(finance.period);
//       item.reward = interestRate.multipliedBy(investAmount).toFixed(5, 1)
//
//       if (end.gt(investTime.plus(period))) {
//         item.buttomName = "待赎回"
//       } else {
//         item.buttomName = "未到期"
//       }
//     }
//   })
//
// });

const doClaim = async (item) => {
  if (getButtonName(item) !== '待赎回') return;
  if (item.loading) return
  item.loading = true;

  try {
    await claim(item.id);
    item.loading = false;
    showSuccess("赎回成功");

    // 刷新
    await Promise.all([
      store.setState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 21]),
    ]);
  } catch (e) {
    console.log(e)
    showError(t('failed'));
    item.loading = false;
  }
};

defineExpose({});

</script>

<template>
  <div class="table-header">
      <span v-for="header in headers" :key="header.key" class="header-cell" :style="{ flex: header.flex || 1 }">
        {{ header.label }}
      </span>
  </div>
  <div class="table-content">
    <van-list
      :finished="finished"
      :finished-text="props.list.length === 0? $t('noMore'):''"
    >
      <van-cell
        v-for="(item, index) in props.list"
        :key="index"
        center
      >
        <template #title>
          <div class="table-row">
        <span v-for="header in headers" :key="header.key" class="cell-item" :style="{ flex: header.flex || 1 }">
          <!-- 动态渲染对应字段 -->
          <template v-if="header.key === 'index'">
            {{ item.id + 1}}
          </template>
          <template v-else-if="header.key === 'date'">
            <div class="datetime-container">
              <div>{{ timestampFormat(item.investTime) }}</div>
              <div>
                <van-count-down style="color:rgb(5, 218, 235);font-size: 13px;" :time="countdownTime(getEnd(item))" format="DD天 HH:mm:ss"/>
              </div>
            </div>
          </template>
          <template v-else-if="header.key === 'principal'">
            {{ item.investAmount }}
          </template>
          <template v-else-if="header.key === 'profit'">
            {{ getReward(item) }}
          </template>
          <template v-else-if="header.key === 'action'">
            <van-button
              size="small"
              type="primary"
              :color="getButtonName(item) != '待赎回' ? '#1087A1' : '#05DAEB'"
              :style="{ color: getButtonName(item) != '待赎回' ? '#015059' : '' }"
              @click="doClaim(item)"
            >
              <template v-if="item.loading">
                <van-loading size="20" color="#1989fa"/>
              </template>
              <template v-else>{{ getButtonName(item) }}</template>
            </van-button>
          </template>
        </span>
          </div>
        </template>

      </van-cell>
    </van-list>
  </div>
</template>
<style scoped lang="scss">
@use "@/components/List/List";
</style>
