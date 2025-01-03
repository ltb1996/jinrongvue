<template>
  <el-dialog
    :model-value="dialogVisible"
    @update:model-value="handleVisibleChange"
    title="实验得分"
    width="48%"
    :before-close="handleClose"
    center
    class="score-dialog custom-dialog"
  >
    <div class="score-content">
      <div class="score-header">
        <div class="info-item">
          <span class="label">实验名称</span>
          <span class="value">基于Vue的前端技术虚拟教学与实验</span>
        </div>
        <div class="info-item">
          <span class="label">实验时间</span>
          <span class="value">{{ currentDate }}</span>
        </div>
      </div>

      <div class="score-main">
        <div class="total-score">
          <div class="score-circle">
            <div class="score-number">{{ totalScore }}</div>
            <div class="score-label">总分</div>
          </div>
        </div>

        <div class="score-breakdown">
          <div class="breakdown-item">
            <div class="item-header">
              <div class="icon process"></div>
              <span>实验流程得分</span>
            </div>
            <div class="item-score">50分</div>
          </div>
          <div class="breakdown-item">
            <div class="item-header">
              <div class="icon quiz"></div>
              <span>技术习题得分</span>
            </div>
            <div class="item-score">{{ quizScore }}分</div>
          </div>
        </div>
      </div>

      <div class="chart-container" ref="chartRef"></div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import * as echarts from "echarts";
import type { EChartsType } from "echarts";

const props = defineProps<{
  dialogVisible: boolean;
  correctAnswers: number;
}>();

const emit = defineEmits(["update:dialogVisible"]);

const chartRef = ref<HTMLElement>();
const chart = ref<EChartsType>();
const currentDate = new Date().toLocaleDateString("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const quizScore = computed(() => {
  const scorePerQuestion = 2;
  return props.correctAnswers * scorePerQuestion;
});

const totalScore = computed(() => 50 + quizScore.value);

const handleClose = () => {
  emit("update:dialogVisible", false);
};

const handleVisibleChange = (val: boolean) => {
  emit("update:dialogVisible", val);
};

const initChart = () => {
  if (!chartRef.value) return;

  chart.value = echarts.init(chartRef.value);
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}分 ({d}%)",
    },
    legend: {
      orient: "horizontal",
      right: 80,
      top: 0,
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "得分构成",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: "{b}: {c}分\n{d}%",
          color: "#fff",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        data: [
          {
            value: 50,
            name: "实验流程",
            itemStyle: { color: "#00eaff" },
          },
          {
            value: quizScore.value,
            name: "技术习题",
            itemStyle: { color: "#01a6ff" },
          },
        ],
      },
    ],
  };
  chart.value.setOption(option);
};

// 监听对话框显示状态，显示时初始化图表
watch(
  () => props.dialogVisible,
  (newVal) => {
    if (newVal) {
      // 等待 DOM 更新后初始化图表
      setTimeout(() => {
        initChart();
      }, 0);
    }
  }
);

// 监听窗口大小变化，调整图表大小
window.addEventListener("resize", () => {
  chart.value?.resize();
});

// 组件卸载时销毁图表实例
onMounted(() => {
  if (props.dialogVisible) {
    initChart();
  }
});
</script>

<style>
/* 全局样式 */
.el-dialog {
  background: rgba(0, 19, 47, 0.9) !important;
  border: 1px solid rgba(0, 234, 255, 0.3) !important;
  border-radius: 12px !important;
  backdrop-filter: blur(20px) !important;
  box-shadow: 0 0 30px rgba(0, 234, 255, 0.2) !important;
}

.el-dialog__header {
  border-bottom: 1px solid rgba(0, 234, 255, 0.2) !important;
  padding: 20px !important;
  margin-right: 0 !important;
}

.el-dialog__title {
  color: #00eaff !important;
  font-size: 24px !important;
  font-weight: bold !important;
  text-shadow: 0 0 10px rgba(0, 234, 255, 0.3) !important;
}

.el-dialog__headerbtn .el-dialog__close {
  color: #00eaff !important;
}

.el-dialog__body {
  padding: 30px !important;
  color: #fff !important;
  background: rgba(0, 19, 47, 0.9) !important;
}
</style>

<style scoped>
.score-content {
  color: #fff;
}

.score-header {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(0, 234, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 234, 255, 0.2);
}

.info-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.info-item .label {
  min-width: 100px;
  color: rgba(255, 255, 255, 0.8);
}

.info-item .value {
  color: #00eaff;
  margin-left: 20px;
}

.score-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}

.total-score {
  flex: 0 0 160px;
}

.score-circle {
  width: 144px;
  height: 144px;
  border-radius: 50%;
  background: rgba(0, 234, 255, 0.1);
  border: 2px solid #00eaff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 234, 255, 0.2);
}

.score-number {
  font-size: 38px;
  font-weight: bold;
  color: #00eaff;
  text-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
}

.score-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
}

.score-breakdown {
  flex: 1;
  margin-left: 32px;
  padding: 16px;
  background: rgba(0, 234, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 234, 255, 0.2);
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  background: rgba(0, 234, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.breakdown-item:hover {
  transform: translateX(5px);
  background: rgba(0, 234, 255, 0.1);
}

.item-header {
  display: flex;
  align-items: center;
}

.icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
}

.icon.process {
  background: #00eaff;
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
}

.icon.quiz {
  background: #01a6ff;
  box-shadow: 0 0 10px rgba(1, 166, 255, 0.5);
}

.item-score {
  font-size: 20px;
  font-weight: bold;
  color: #00eaff;
  text-shadow: 0 0 10px rgba(0, 234, 255, 0.3);
}

.chart-container {
  height: 240px;
  margin-top: 24px;
}
</style>
