<template>
  <div class="allStyle">
    <nav-bar></nav-bar>
    <!-- <div class="sub-nav">
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
        {{ currentDescription }}
      </div>
    </div>

    <div class="jump-button" v-if="activeIndex == '4'">
      <el-button type="primary" class="custom-button" @click="handleJumpClick">
        前往技术详情
      </el-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import NavBar from "../components/nav-bar/index.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
const activeIndex = ref("1");
const currentDescription = ref("");

// 定义一个获取描述内容的函数
const getDescription = (index: string) => {
  switch (index) {
    case "1":
      return "这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容这是项目简介的内容";
    case "2":
      return "这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容这是项目目的的内容";
    case "3":
      return "这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容";
    case "4":
      return "这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容这是项目背景的内容";
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
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}

/* .sub-nav {
  position: fixed;
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
  position: fixed;
  top: 280px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  max-width: 1200px;
  z-index: 1;
}

.description-content {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 8px;
  padding: 20px 30px;
  color: #fff;
  font-size: 24px;
  line-height: 1.8;
  text-align: justify;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 234, 255, 0.1);
  animation: fadeIn 0.5s ease-in-out;
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
} */
</style>
