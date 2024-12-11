<!-- <script setup lang="ts">
import { ref, onMounted } from "vue";
import { alarmNum } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  alarmNum()
    .then((res) => {
      console.log("右上--报警次数 ", res);
      if (res.success) {
        setOption(res.data.dateList, res.data.numList, res.data.numList2);
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
const setOption = async (xData: any[], yData: any[], yData2: any[]) => {
  option.value = {
    xAxis: {
      type: "category",
      data: xData,
      boundaryGap: false, // 不留白，从原点开始
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        // show:false,
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisLabel: {
        color: "#7EB7FD",
        fontWeight: "500",
      },
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
      right: "30px",
      bottom: "10px",
      top: "32px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    series: [
      {
        data: yData,
        type: "line",
        smooth: false,
        symbol: "none", //去除点
        name: "1数量",
        color: "rgba(252,112,564,0.8)",
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
                color: "rgba(252,112,564,0.8)",
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
                color: "#FC3246",
                backgroundColor: "rgba(252,144,16,0.1)",
                borderRadius: 6,
                padding: [7, 14],
                borderWidth: 0.5,
                borderColor: "rgba(252,144,16,.5)",
                formatter: "报警1：{c}",
              },
            },
            {
              name: "最大值",
              type: "max",
              valueDim: "y",
              symbol: "circle",
              symbolSize: 6,
              itemStyle: {
                color: "#FC3246",
                shadowColor: "#FC3246",
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
        smooth: false,
        symbol: "none", //去除点
        name: "2数量",
        color: "rgba(9,202,2,0.8)",
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
                color: "rgba(9,198,24,0.8)",
                backgroundColor: "rgba(9,202,243,0.1)",

                borderRadius: 6,
                borderColor: "rgba(9,198,24,0.8)",
                padding: [7, 14],
                formatter: "报警2：{c}",
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
                color: "#ffffff",
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
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss"></style> -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { rightTopDataNew } from "@/api";
import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  rightTopDataNew()
    .then((res) => {
      if (res.success) {
        setOption(res.data.dateList, res.data.numList, res.data.numList2);
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

const setOption = async (xData: any[], yData: any[], yData2: any[]) => {
  // 取最后6个数据点用于雷达图
  const lastSixX = xData.slice(-6);
  const lastSixY = yData.slice(-6);
  const lastSixY2 = yData2.slice(-6);

  option.value = {
    tooltip: {
      trigger: 'item',
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      }
    },
    legend: {
      data: ['盛宝学院', '三亚学院'],
      textStyle: {
        color: '#7EB7FD'
      },
      right: 0,
      top: 0
    },
    radar: {
      indicator: lastSixX.map(item => ({
        name: item,
        max: Math.max(...[...lastSixY, ...lastSixY2]) * 1.0
      })),
      splitArea: {
        areaStyle: {
          color: ['rgba(114, 172, 209, 0.2)',
            'rgba(114, 172, 209, 0.1)',
            'rgba(114, 172, 209, 0.05)',
            'rgba(114, 172, 209, 0.02)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(31,99,163,0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(31,99,163,0.3)'
        }
      },
      name: {
        textStyle: {
          color: '#7EB7FD',
          fontSize: 12
        }
      }
    },
    series: [
      {
        name: '数据对比',
        type: 'radar',
        data: [
          {
            value: lastSixY,
            name: '盛宝学院',
            symbolSize: 6,
            lineStyle: {
              width: 2,
              color: 'rgba(252,112,564,0.8)'
            },
            areaStyle: {
              color: 'rgba(252,112,564,0.4)'
            }
          },
          {
            value: lastSixY2,
            name: '三亚学院',
            symbolSize: 6,
            lineStyle: {
              width: 2,
              color: 'rgba(9,202,243,0.8)'
            },
            areaStyle: {
              color: 'rgba(9,202,243,0.4)'
            }
          }
        ]
      }
    ]
  };
};

onMounted(() => {
  getData();
});
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>