<script setup lang="ts">
import { ref, onMounted, inject, watch, type Ref } from "vue";
import { alarmNum } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import BorderBox13 from "@/components/datav/border-box-13";

const option = ref({});
const uploadedData = inject<Ref<any[]>>('uploadedData');

const getData = () => {
  // 如果有上传的数据，使用上传的数据
  if (uploadedData?.value) {
    // 只取前6个数据点
    const limitedData = uploadedData.value.slice(0, 6);
    const dates = limitedData.map((item: any) => item.createtime);
    const numOneValues = limitedData.map((item: any) => Number(item.numone) || 0);
    const numTwoValues = limitedData.map((item: any) => Number(item.numtwo) || 0);
    setOption(dates, numOneValues, numTwoValues);
  } else {
    // 否则使用原有的 API 数据
    alarmNum()
      .then((res) => {
        if (res.success) {
          // 同样只取前6个数据点
          const dates = res.data.dateList.slice(0, 6);
          const numList = res.data.numList.slice(0, 6);
          const numList2 = res.data.numList2.slice(0, 6);
          setOption(dates, numList, numList2);
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
  }
};

// 监听上传数据的变化
watch(() => uploadedData?.value, (newVal) => {
  if (newVal) {
    getData();
  }
}, { deep: true });

const setOption = async (xData: any[], yData: any[], yData2: any[]) => {
  option.value = {
    xAxis: {
      type: "category",
      data: xData,
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisLabel: {
        color: "#7EB7FD",
        fontWeight: "500",
        fontSize: 12,
        margin: 8,
        interval: 0
      },
      axisTick: {
        alignWithLabel: true
      },
      splitNumber: 5
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(31,99,163,.1)",
          fontSize: 16
        },
      },
      axisLabel: {
        color: "#7EB7FD",
        fontWeight: "500",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    grid: {
      //布局
      show: true,
      left: "10px",
      right: "39px",
      bottom: "10px",
      top: "32px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    series: [
      {
        data: yData,
        type: "line",
        smooth: true,
        symbol: "none", //去除点
        name: "1数量",
        color: "rgba(252,144,16,.7)",
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(252,144,16,.7)",
              },
              {
                offset: 1,
                color: "rgba(252,144,16,.0)",
              },
            ],
            false
          ),
        },
        markPoint: {
          data: [
            {
              name: "最大值",
              type: "max",
              valueDim: "y",
              symbol: "rect",
              symbolSize: [60, 26],
              symbolOffset: [0, -20],
              itemStyle: {
                color: "rgba(0,0,0,0)",
              },
              label: {
                color: "#FC9010",
                backgroundColor: "rgba(252,144,16,0.1)",
                borderRadius: 6,
                padding: [7, 14],
                borderWidth: 0.5,
                borderColor: "rgba(252,144,16,.5)",
                formatter: "1：{c}",
              },
            },
            {
              name: "最大值",
              type: "max",
              valueDim: "y",
              symbol: "circle",
              symbolSize: 6,
              itemStyle: {
                color: "#FC9010",
                shadowColor: "#FC9010",
                shadowBlur: 8,
              },
              label: {
                formatter: "",
              },
            },
          ],
        },
      },
      {
        data: yData2,
        type: "line",
        smooth: true,
        symbol: "none", //去除点
        name: "2数量",
        color: "rgba(9,202,243,.7)",
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(9,202,243,.7)",
              },
              {
                offset: 1,
                color: "rgba(9,202,243,.0)",
              },
            ],
            false
          ),
        },
        markPoint: {
          data: [
            {
              name: "最大值",
              type: "max",
              valueDim: "y",
              symbol: "rect",
              symbolSize: [60, 26],
              symbolOffset: [0, -20],
              itemStyle: {
                color: "rgba(0,0,0,0)",
              },
              label: {
                color: "#09CAF3",
                backgroundColor: "rgba(9,202,243,0.1)",

                borderRadius: 6,
                borderColor: "rgba(9,202,243,.5)",
                padding: [7, 14],
                formatter: "2：{c}",
                borderWidth: 0.5,
              },
            },
            {
              name: "最大值",
              type: "max",
              valueDim: "y",
              symbol: "circle",
              symbolSize: 6,
              itemStyle: {
                color: "#09CAF3",
                shadowColor: "#09CAF3",
                shadowBlur: 8,
              },
              label: {
                formatter: "",
              },
            },
          ],
        },
      },
    ],
  };
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="centermap">
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">数据主列表图</span> 
      <div class="you"></div>
    </div>
    <div class="mapwrap">
      <BorderBox13>
        <!-- <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">中国</div>
        <v-chart
          class="chart"
          :option="option"
          ref="centerMapRef"
          @click="mapClick"
          v-if="JSON.stringify(option) != '{}'"
        /> -->

        <!-- right-top挪过来 -->
        <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
      </BorderBox13>
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("@/assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("@/assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 580px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5), 0 0 6px rgba(0, 237, 237, 0.4);
      z-index: 10;
    }
  }
}
</style>
