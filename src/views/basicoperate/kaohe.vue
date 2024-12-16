<template>
  <div class="content-container">
    <div class="score-standard">
      <h2 class="title">评分标准</h2>
      <div class="description">
        本实验附带考核内容，考核总得分为100分，由以下三个内容构成：
        <p>
          1、试卷答题得分：占比0.5，总分50分，其中每道题分数为50/题目数量，最终答题得分为正确的题目*每道题的分数。
        </p>
        <p>
          2、实验流程得分：占比0.5，总得分为50分，每个步骤得分为50/总步骤数量，最终得分为进行过的实验步骤*每个步骤的分数。
        </p>
      </div>
      <div class="chart-container" ref="chartRef"></div>
    </div>
  </div>
  <div class="return-button" @click="handleReturn">返回</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
const chartRef = ref<HTMLElement>();
const router = useRouter();
onMounted(() => {
  const chart = echarts.init(chartRef.value as HTMLElement);

  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          scale: true,
          scaleSize: 10,
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 234, 255, 0.5)",
          },
        },
        label: {
          show: true,
          formatter: "{b}: {d}%",
          color: "#fff",
        },
        data: [
          {
            value: 50,
            name: "试卷答题得分",
            itemStyle: {
              color: "#00eaff",
            },
          },
          {
            value: 50,
            name: "实验流程得分",
            itemStyle: {
              color: "#01a6ff",
            },
          },
        ],
      },
    ],
  };

  chart.setOption(option);

  // 监听窗口大小变化,重绘图表
  window.addEventListener("resize", () => {
    chart.resize();
  });
});
const handleReturn = () => {
  router.push("/basicoperate");
};
</script>

<style scoped>
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  /* padding-bottom: 150px; */
}

.score-standard {
  background: rgba(0, 19, 47, 0.7);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 10px;
  padding: 30px;
  width: 80%;
  max-width: 1000px;
  box-shadow: 0 0 20px rgba(0, 234, 255, 0.2);
}

.title {
  color: #00eaff;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
}

.description {
  color: #fff;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.description p {
  margin: 10px 0;
  padding-left: 20px;
}

.chart-container {
  width: 100%;
  height: 300px;
  margin-top: 10px;
}

/* 确保滚动条相关样式放在最后 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

::-webkit-scrollbar-track {
  display: none;
}

::-webkit-scrollbar-thumb {
  display: none;
}

* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.return-button {
  position: absolute;
  bottom: 30px;
  right: 350px;
  background-color: #00eaff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
  transition: background-color 0.3s;
}

.return-button:hover {
  background-color: #007acc;
}
</style>
