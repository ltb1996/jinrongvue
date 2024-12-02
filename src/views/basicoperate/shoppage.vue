<template>
  <div class="shop-page">
    <div class="cards-container">
      <div v-for="item in cardList" :key="item.id" class="card" @click="handleCardClick(item.id)">
        <div class="card-content">
          <img :src="item.src" :alt="item.title" class="card-image"/>
          <div class="card-info">
            <h3>{{ item.title }}</h3>
            <p class="brand">{{ item.brand }}</p>
            <p class="description">{{ item.description }}</p>
            <p class="price">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="return-button" @click="handleReturn">
      返回
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import vuell from "@/assets/img/vuell.png";
import javascriptpng from "@/assets/img/jsjsjs.jpg";
import Echartspng from "@/assets/img/Echartspng.jpg";
import Axiosjpg from "@/assets/img/axiosjpg.jpg";
import Mockpng from "@/assets/img/mockjs.jpg";

const router = useRouter();

const cardList = ref([
  {
    id: 1,
    title: "实验一",
    brand: "Vue基础实验",
    description: "本实验将带领你了解Vue 3的基础知识,包括组件创建、生命周期、数据绑定等核心概念。通过实践加深对Vue框架的理解。",
    price: "难度: ★★★",
    src: vuell,
  },
  {
    id: 2,
    title: "实验二", 
    brand: "JavaScript实验",
    description: "本实验将帮助你掌握JavaScript的核心概念,包括数据类型、函数、异步编程等重要知识点。通过编码练习提升JavaScript编程能力。",
    price: "难度: ★★★",
    src: javascriptpng,
  },
  {
    id: 3,
    title: "实验三",
    brand: "Echarts实验",
    description: "本实验将指导你使用ECharts创建各类图表,掌握数据可视化的基本技能。通过实例学习ECharts的配置和使用方法。",
    price: "难度: ★★★★",
    src: Echartspng,
  },
  {
    id: 4,
    title: "实验四",
    brand: "Mock.js实验",
    description: "本实验将教你使用Mock.js模拟后端接口数据,学习如何在开发阶段独立完成前端功能。通过实践掌握数据模拟的技巧。",
    price: "难度: ★★",
    src: Mockpng,
  },
  {
    id: 5,
    title: "实验五",
    brand: "Axios实验",
    description: "本实验将带你学习使用Axios发送HTTP请求,掌握前后端数据交互的方法。通过实例了解接口调用的完整流程。",
    price: "难度: ★★★",
    src: Axiosjpg,
  },
]);

const handleReturn = () => {
  router.push('/basicoperate');
};

const handleCardClick = (id: number) => {
  router.push(`/lab/${id}`);
};
</script>

<style scoped>
/* 将原来的 shop-page 相关样式移到这里 */
/* 新增卡片样式 */
.shop-page {
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  width: 100%;
  overflow-x: hidden;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding: 20px;
}

.card {
  width: 300px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 234, 255, 0.3);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-info {
  color: #fff;
}

.card-info h3 {
  margin: 0;
  font-size: 24px;
  color: #00eaff;
}

.brand {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  margin: 10px 0;
}

.description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
  height: 84px;
  overflow: hidden;
}

.price {
  color: #00eaff;
  font-size: 16px;
  margin: 10px 0 0;
}

.return-button {
  position: absolute;
  bottom: 150px;
  right: 135px;
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