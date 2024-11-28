<script setup lang="ts">
import { rightBottom } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive, inject, watch, Ref } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { ElMessage } from "element-plus";

const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 252,
    limitScrollNum: 3,
  },
  scroll: true,
});

// 注入上传的数据
const uploadedData = inject<Ref<any[]>>('uploadedData');

// 监听上传数据的变化
watch(
  () => uploadedData?.value,
  (newData) => {
    if (newData) {
      state.list = newData;
    }
  },
  { deep: true }
);

const getData = () => {
  // 如果有上传的数据，优先使用上传的数据
  if (uploadedData?.value) {
    state.list = uploadedData.value.map(item => ({
      ...item,
      alertvalue: item.alertvalue // 确保直接使用字符串值，不要进行数值转换
    }));
    console.log(state.list, '+++++++++++++++----------');
    return;
  }

  // 否则使用原有的 API 获取数据
  rightBottom({ limitNum: 20 })
    .then((res) => {
      console.log("右下", res);
      if (res.success) {
        state.list = res.data.list;
      } else {
        ElMessage({
          message: res.msg,
          type: "warning",
        });
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};

const comName = computed(() => {
  if (indexConfig.value.rightBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});
function montionFilter(val: any) {
  // 如果是数字字符串，则格式化为数字
  if (!isNaN(Number(val))) {
    return Number(val).toFixed(2);
  }
  // 如果是非数字的字符串（如"严重"），直接返回
  return val || "--";
}
const handleAddress = (item: any) => {
  // return `${item.provinceName}/${item.cityName}/${item.countyName}`;
  return `${item.provinceName}`;
};
onMounted(() => {
  getData();
});
</script>

<template>
  <div class="right_bottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !indexConfig.rightBottomSwiper }">
    <component
      :is="comName"
      :list="state.list"
      v-model="state.scroll"
      :singleHeight="state.defaultOption.singleHeight"
      :step="state.defaultOption.step"
      :limitScrollNum="state.defaultOption.limitScrollNum"
      :hover="state.defaultOption.hover"
      :singleWaitTime="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
    >
      <ul class="right_bottom">
        <li class="right_center_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">与经营有关的现金：</span>
                <span class="text-content zhuyao"> {{ item.gatewayno }}</span>
              </div>
              <div class="info">
                <span class="labels">购买商品等现金：</span>
                <span class="text-content warning"> {{ item.terminalno }}</span>
              </div>
              <!-- <div class="info">
                <span class="labels">告警值：</span>
                <span class="text-content warning"> {{ montionFilter(item.alertvalue) }}</span>
              </div> -->
            </div>

            <div class="flex">
              <div class="info">
                <span class="labels shrink-0">支付的各项税费：</span>
                <span class="ciyao truncate" style="font-size: 12px; width: 220px" :title="handleAddress(item)">
                  {{ handleAddress(item) }}</span
                >
              </div>
              <div class="info time shrink-0">
                <span class="labels">时间：</span>
                <span class="text-content" style="font-size: 12px"> {{ item.createtime }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="info">
                <span class="labels">经营活动现金流入小计：</span>
                <span class="text-content ciyao" :class="{ warning: item.alertdetail }">
                  {{ item.alertdetail || "无" }}</span
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;

    .orderNum {
      margin: 0 20px 0 -20px;
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }
  }
}

.right_bottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 252px;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
