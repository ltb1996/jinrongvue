<template>
  <div class="allStyle">
    <nav-bar></nav-bar>
    <div class="sub-nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">项目简介</el-menu-item>
        <el-menu-item index="2">项目目的</el-menu-item>
        <el-menu-item index="3">项目背景</el-menu-item>
        <el-menu-item index="4">项目原理</el-menu-item>
      </el-menu>
    </div>

    <div class="description-area" v-if="currentDescription">
      <div class="description-content">
        <p>
          {{
            typeof currentDescription === "object"
              ? currentDescription.text
              : currentDescription
          }}
        </p>
        <div
          v-if="
            typeof currentDescription === 'object' &&
            currentDescription.showImage
          "
          class="architecture-image"
        >
          <img :src="jiagou" alt="项目架构图" />
        </div>
      </div>
    </div>

    <div class="jump-button" v-if="activeIndex == '4'">
      <el-button type="primary" class="custom-button" @click="handleJumpClick">
        前往技术详情
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../components/nav-bar/index.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import jiagou from "../assets/img/jiagou.png";

const router = useRouter();
const activeIndex = ref("1");
interface Description {
  text: string;
  showImage?: boolean;
}

const currentDescription = ref<string | Description>("");

// 定义一个获取描述内容的函数
const getDescription = (index: string) => {
  switch (index) {
    case "1":
      return {
        text: "本项目是一个基于 Vue.js 的金融数据可视化平台，采用 Vue 3 + TypeScript 作为核心开发框架。项目整体采用模块化设计，包含项目介绍、核心技术、技术实操和项目成果四大模块。在技术栈选择上，使用 Vite 作为构建工具以提供极速的开发体验，采用 Element Plus 组件库构建现代化的用户界面，引入 ECharts 实现专业的数据可视化展示，通过 Mock.js 模拟后端接口数据，并使用 Axios 处理 HTTP 请求。项目支持 Excel 数据导入功能，实现了数据的动态更新和实时展示，并通过响应式设计确保了在不同设备上的良好显示效果。整体架构清晰，代码组织规范，具有良好的可维护性和扩展性。",
        showImage: true,
      };
    case "2":
      return "本项目旨在为金融数据分析提供一个直观、高效的可视化平台。主要目标包括：1. 数据可视化：通过多样化的图表形式，将复杂的金融数据转化为直观的可视化展示，帮助用户快速理解和分析数据趋势；2. 技术教学：通过实验模块，帮助开发者深入理解 Vue 3、ECharts、Mock.js 等现代前端技术的应用；3. 实时监控：支持数据的实时更新和动态展示，满足金融数据实时监控的需求；4. 交互体验：提供良好的用户交互体验，包括数据筛选、图表联动、数据导入等功能；5. 技术创新：展示现代前端技术在金融领域的创新应用，为类似项目提供参考实现。通过这些目标的实现，本项目致力于提升金融数据分析的效率和准确性。";
    case "3":
      return "在当前金融科技快速发展的背景下，数据可视化在金融领域扮演着越来越重要的角色。传统的数据展示方式往往存在数据量大、更新慢、展示不直观等问题，难以满足现代金融分析的需求。同时，随着前端技术的发展，特别是 Vue 3、TypeScript 等现代化工具的成熟，为构建高性能的数据可视化平台提供了技术基础。本项目正是在这样的背景下，结合金融领域的实际需求和现代前端技术的优势，打造了一个功能完善、性能优异的数据可视化平台。项目仅关注实际应用，还注重技术的教学价值，通过实验模块帮助开发者掌握相关技术，体现了技术创新和知识传播的双重价值。";
    case "4":
      return "本项目的技术实现基于以下核心原理：1. 组件化开发：采用 Vue 3 的组件化开发思想，将功能模块独立封装，提高代码复用性和维护性；2. 响应式原理：利用 Vue 3 的响应式系统和 Composition API，实现数据与视图的实时同步；3. 数据可视化：基于 ECharts 的图表渲染原理，实现多种类型的数据可视化展示；4. 数据流管理：使用 Pinia 进行状态管理，确保数据流的清晰和可控；5. 接口模拟：通过 Mock.js 实现接口数据的模拟，支持开发阶段的独立测试；6. 路由管理：使用 Vue Router 实现单页应用的路由控制，提供流畅的页面切换体验；7. 样式处理：采用 SCSS 预处理器和 CSS 模块化方案，实现样式的模块化管理；8. 类型系统：通过 TypeScript 提供完整的类型支持，提高代码的可维护性和可靠性。这些技术原理的综合运用，确保了项目的高性能和良好的用户体验。";
    // return {
    //   text: "本项目的技术实现基于以下核心原理：1. 组件化开发：采用 Vue 3 的组件化开发思想，将功能模块独立封装，提高代码复用性和维护性；2. 响应式原理：利用 Vue 3 的响应式系统和 Composition API，实现数据与视图的实时同步；3. 数据可视化：基于 ECharts 的图表渲染原理，实现多种类型的数据可视化展示；4. 数据流管理：使用 Pinia 进行状态管理，确保数据流的清晰和可控；5. 接口模拟：通过 Mock.js 实现接口数据的模拟，支持开发阶段的独立测试；6. 路由管理：使用 Vue Router 实现单页应用的路由控制，提供流畅的页面切换体验；7. 样式处理：采用 SCSS 预处理器和 CSS 模块化方案，实现样式的模块化管理；8. 类型系统：通过 TypeScript 提供完整的类型支持，提高代码的可维护性和可靠性。这些技术原理的综合运用，确保了项目的高性能和良好的用户体验。",
    //   showImage: true
    // };
    default:
      return "";
  }
};

// 初始化显示内容
currentDescription.value = getDescription("1");

const handleSelect = (index: string) => {
  activeIndex.value = index;
  currentDescription.value = getDescription(index);
};

const handleJumpClick = () => {
  // if (activeIndex.value === "4") {
  //   ElMessage.warning("请先了解其他内容");
  //   return;
  // }
  router.push("/knowledge");
};

// 可选：使用 onMounted 确保组件挂载后初始化
onMounted(() => {
  // 确保页面刷新或返回时也能显示默认内容
  if (!currentDescription.value) {
    currentDescription.value = getDescription(activeIndex.value);
  }
});
</script>

<style scoped>
.allStyle {
  display: flex;
  flex-direction: column;
  background: url("../assets/img/pageBg.png") center center no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  /* 隐藏滚动条但保持可滚动 */
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

/* Webkit浏览器（Chrome、Safari等）隐藏滚动条 */
.allStyle::-webkit-scrollbar {
  display: none;
}

.sub-nav {
  position: absolute;
  top: 110px;
  width: 100%;
  z-index: 1;
  background: transparent;
}

:deep(.el-menu) {
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
}

:deep(.el-menu-item) {
  color: #fff !important;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  margin: 0 20px;
}

:deep(.el-menu-item:hover) {
  background: transparent !important;
  color: #00eaff !important;
}

:deep(.el-menu-item.is-active) {
  background: transparent !important;
  color: #00eaff !important;
  border-bottom: 2px solid #00eaff !important;
}

.description-area {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  max-width: 1200px;
  padding-bottom: 50px;
  z-index: 1;
}

.description-content {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 8px;
  padding: 20px 30px;
  color: #fff;
  font-size: 20px;
  line-height: 1.8;
  text-align: justify;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 234, 255, 0.1);
  animation: fadeIn 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  .architecture-image {
    margin-top: 20px;
    text-align: center;

    img {
      /* max-width: 90%; */
      width: 517px;
      height: auto;
      border-radius: 8px;
      border: 1px solid rgba(0, 234, 255, 0.3);
      box-shadow: 0 0 20px rgba(0, 234, 255, 0.2);
      transition: transform 0.3s ease;
      background-color: white;
      &:hover {
        transform: scale(1.02);
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.jump-button {
  position: absolute;
  bottom: 150px;
  right: 100px;
  z-index: 2;
}

.custom-button {
  background: rgba(0, 234, 255, 0.1);
  border: 1px solid #00eaff;
  color: #fff;
  width: 150px;
  height: 60px;
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 4px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.custom-button:hover {
  background: rgba(0, 234, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 234, 255, 0.2);
}
</style>
