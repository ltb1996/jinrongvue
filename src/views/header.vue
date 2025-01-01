<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import dayjs from "dayjs";
import type { DateDataType } from "./index.d";
import { useSettingStore } from "@/stores/index";

const showContent = ref(false);

const dateData = reactive<DateDataType>({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  currentWeek: 0,
  timing: null as NodeJS.Timeout | null,
});

setTimeout(() => {
  showContent.value = true;
}, 500);

const { setSettingShow } = useSettingStore();
const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

// 计算当前是第几周
const currentWeek = () => {
  // 设置学期开始日期，这里以2024年春季学期为例
  const termStartDate = dayjs('2024-09-09'); // 可以根据实际情况修改开学日期
  const today = dayjs();
  // 如果当前日期在学期开始日期之前，返回0
  if (today.isBefore(termStartDate)) {
    return 0;
  }
  // 计算相差的天数
  const diffDays = today.diff(termStartDate, 'day');
  // 计算当前是第几周（向上取整）
  const weekNum = Math.ceil((diffDays + 1) / 7);
  // 限制最大周数为20（一般一个学期20周）
  return Math.min(weekNum, 20);
};
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY-MM-DD HH : mm : ss");
    dateData.dateWeek = weekday[dayjs().day()];
    dateData.currentWeek = currentWeek();
  }, 500);
};
timeFn();
</script>

<template>
  <div class="d-flex jc-center title_wrap">
    <div class="zuojuxing"></div>
    <div class="youjuxing"></div>
    <div class="guang"></div>
    <div class="d-flex jc-center">
      <div class="title">
        <span class="title-text">基于Vue.js的金融数据可视化平台</span>
      </div>
    </div>
    <div class="timers" v-show="showContent">
      当前是第
      <p class="nowWeek">&nbsp;{{ dateData.currentWeek }}&nbsp;</p>
      周 {{ dateData.dateYear }} {{ dateData.dateWeek }} {{ dateData.dateDay }}

      <div class="setting_icon" @click="setSettingShow(true)">
        <img src="@/assets/img/headers/setting.png" alt="设置" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title_wrap {
  height: 60px;
  background-image: url("../assets/img/top.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .nowWeek {
    color: red;
  }

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url("../assets/img/guang.png");
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }

  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url("../assets/img/headers/juxing1.png");
  }

  .zuojuxing {
    left: 11%;
  }

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }

  .timers {
    position: absolute;
    right: 0;
    top: 30px;
    font-size: 18px;
    display: flex;
    align-items: center;

    .setting_icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    width: 100%;
    background: linear-gradient(
      92deg,
      #0072ff 0%,
      #00eaff 48.8525390625%,
      #01aaff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
