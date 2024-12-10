<template>
  <div class="product">
    <div class="gradient-section"></div>
    <img class="back-image" :src="product?.src" />
    <div class="container">
      <div class="details">
        <p class="brand">{{ product?.brand }}</p>
        <h1 class="title">
          <span class="study-link"
            ><a style="color: #00ff6f" :href="product?.studySrc" target="_blank"
              >在线学习链接</a
            ></span
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {{ product?.title }}
        </h1>
        <video class="product-video" controls :key="product?.videourl">
          <source :src="product?.videourl" type="video/mp4" />
          您的浏览器不支持 video 标签。
        </video>
        <p class="description">{{ product?.description }}</p>
        <a href="javascript:;" class="cart-button" @click="handleClick"
          >下一页</a
        >
      </div>
    </div>
  </div>
  <div class="logo"></div>
  <div class="g-container">
    <div class="g-number">
      <!-- <CountUp
        class="count-up"
        :endVal="100"
        :duration="2"
        :options="{ suffix: '%' }"
      /> -->
      <div class="maopaotitle">
        {{ product?.title }}
      </div>
    </div>
    <div class="g-contrast">
      <div class="g-circle"></div>
      <ul class="g-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import vuell from "../assets/img/vuell.png";
import javascriptpng from "../assets/img/jsjsjs.jpg";
import Echartspng from "../assets/img/Echartspng.jpg";
import Mockpng from "../assets/img/mockjs.jpg";
import Axiosjpg from "../assets/img/axiosjpg.jpg";
import MockJsVideo from "../assets/img/mockjs.mp4";
import { useRoute, useRouter } from "vue-router";
import { ElLoading } from "element-plus";
// import { Calendar } from 'element-plus';
import dayjs from "dayjs";
// import CountUp from "@/components/count-up";
import jsVideo from "../assets/img/js.mp4";
import EchartsVideo from "../assets/img/echarts.mp4";
import AxiosVideo from "../assets/img/axiosVideo.mp4";

const currentDate = ref(dayjs().toDate());

interface Product {
  id: number;
  src: string;
  brand: string;
  title: string;
  description: string;
  videourl: string;
  studySrc: string;
}

const products: Product[] = [
  {
    id: 1,
    src: vuell,
    brand: "项目技术核心一",
    title: "Vue3",
    videourl: "https://learning.dcloud.net.cn/video/chapter_00.mp4",
    studySrc: "https://cn.vuejs.org/",
    description:
      "Vue3框架是本项目的核心中的核心，Vue 3 是 Vue.js 框架的最新主要版本，它在多个方面进行了改进和优化，使其成为现代前端开发中一个非常有吸引力的选择。以下是选择 Vue 3 进行项目开发的一些主要原因：1. 性能提升,更快的初始加载时间：通过优化编译器和运行时，Vue 3 减少了应用的初始加载时间和整体体积。更好的响应性：Vue 3 使用了新的响应式系统（基于 ES6 的 Proxy 对象），这使得状态管理更加高效，同时也减少了不必要的渲染.",
  },
  {
    id: 2,
    src: javascriptpng,
    brand: "项目技术核心二",
    title: "JavaSript",
    videourl: jsVideo,
    studySrc: "https://www.javascriptcn.com/",
    description:
      "本项目另一个技术核心是JavaScript，JavaScript是唯一一种所有现代网页浏览器都原生支持的编程语言，这意味着使用JavaScript可以确保跨平台的兼容性，无需安装额外的插件或软件，JavaScript特别擅长处理异步操作，如网络请求、文件读写等，这使得它非常适合用于构建响应迅速、高效的应用程序。JavaScript特别擅长处理异步操作，如网络请求、文件读写等，这使得它非常适合用于构建响应迅速、高效的应用程序。具有非常良好的可扩展性和灵活性。",
  },
  {
    id: 3,
    src: Echartspng,
    brand: "项目技术核心三",
    title: "Echarts",
    videourl: EchartsVideo,
    studySrc: "https://echarts.apache.org/zh/index.html",
    description:
      "Echarts是本项目的最核心组件库，Echarts具有强大的图表类型支持，支持多种图表类型，包括但不限于折线图、柱状图、饼图、散点图、热力图、地图等。这使得它非常适合处理各种复杂的数据可视化需求。ECharts 还提供了非常丰富的配置选项，允许开发者对图表的各个方面进行细致的调整，如颜色、标签、提示框、动画效果等。这种高度的灵活性使得开发者可以根据具体需求定制出美观且功能强大的图表。",
  },
  {
    id: 4,
    src: Mockpng,
    brand: "项目技术核心四",
    title: "Mock.js",
    videourl: MockJsVideo,
    studySrc: "http://mockjs.com/",
    description:
      "选择Mock.js为Vue 3项目提供模拟数据服务，主要基于其强大的易用性和灵活性。Mock.js能够快速生成符合特定规则的模拟数据，支持复杂的JSON结构，极大地方便了前端开发者在缺少后端接口时的界面和逻辑开发。它的轻量级特性确保了不会对项目造成额外的性能负担。此外，Mock.js与Vue 3兼容良好，可以通过简单的配置集成到项目中，如利用Vue CLI插件或直接在代码中引入。活跃的社区和详细的文档也意味着开发者可以轻松获得支持和资源，解决使用过程中遇到的问题",
  },
  {
    id: 5,
    src: Axiosjpg,
    brand: "项目技术核心五",
    title: "Axios",
    videourl: AxiosVideo,
    studySrc: "https://www.axios-http.cn/",
    description:
      "选择Axios作为Vue 3项目的HTTP客户端，主要是因为其跨平台的兼容性、易于使用以及强大的功能。Axios是一个基于Promise的HTTP库，可以在浏览器和node.js环境中运行，非常适合现代Web应用的开发需求。它支持请求和响应的拦截，便于处理如添加认证头、错误统一处理等常见任务。Axios还提供了取消请求的功能，对于改善用户体验和优化网络请求管理非常有用。此外，结合Vue 3的 Composition API，可以更加直观地管理异步操作和状态，提升开发效率。总之，Axios以其优秀的特性和良好的社区支持，成为了Vue 3项目中进行数据交互的首选工具。",
  },
];

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const currentIndex = ref(1);

// 监听路由参数变化
watch(
  () => route.params.id,
  (newId) => {
    const id = Number(newId) - 1;
    if (id >= 0 && id < products.length) {
      currentIndex.value = Number(newId);
      product.value = products[id];
    } else {
      router.replace("/teachvue/1");
    }
  },
  { immediate: true }
);

const handleClick = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在跳转...",
    background: "rgba(0, 0, 0, 0.8)",
  });

  const nextIndex = currentIndex.value + 1;
  if (nextIndex > products.length) {
    setTimeout(() => {
      loading.close();
      router.push("/basicoperate");
    }, 1000);
  } else {
    setTimeout(() => {
      loading.close();
      router.push(`/teachvue/${nextIndex}`);
    }, 1000);
  }
};

onMounted(() => {
  const id = Number(route.params.id);
  if (!id) {
    router.replace("/teachvue/1");
  }
});
</script>

<style scoped>
@import url("http://fonts.cdnfonts.com/css/valverde");
/* option:first-child {
  display: none;
} */
.product {
  display: flex;
  position: fixed;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: black;
  right: 0;
  bottom: 0;
}
.gradient-section {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 40%;
  height: 100%;
  background-image: linear-gradient(to right, transparent, black 80%);
  z-index: -1;
  text-align: center;
  align-items: center;
  justify-content: top;
  left: 0;
}
.back-image {
  position: fixed;
  width: 40%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: -2;
  left: 0;
  object-position: top;
  animation: fade-in 0.5s forwards;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.container {
  color: #fff;
  display: flex;
  flex-direction: row;
  padding: 0;
  justify-content: center;
  width: auto;
  align-self: center;
}
.container > img {
  font-size: 2em;
  height: 32px;
  margin-left: 2em;
  cursor: pointer;
}
.details {
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0;
  /* margin-left: 10em; */
  justify-content: center;
  width: auto;
}
.details .brand {
  margin: 0;
  font-size: 1.2srem;
  text-indent: 0.6em;
  color: rgb(196, 196, 196);
  font-family: "Valverde", sans-serif;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 2px black;
}
.details .title {
  align-self: left;
  letter-spacing: 0.2em;
  font-weight: 100;
  text-indent: 0.3em;
  width: auto;
  margin: 0;
  font-size: 2rem;
  color: #fff;
  text-transform: uppercase;
  font-family: "Magisho", sans-serif;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.034);
}
.details .price {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  text-indent: 0.5em;
  color: rgb(219, 219, 219);
  font-family: "Valverde", sans-serif;
  text-shadow: 1px 1px 2px black;
}
.details .description {
  font-size: 1rem;
  width: 30em;
  word-wrap: break-word;
  text-align: left;
  padding-bottom: 1em;
  padding-top: 5px;
  padding-left: 10px;
  border-bottom: 1px solid white;
  text-shadow: 1px 1px 2px black;
  font-family: "Magisho", sans-serif;
}
.details .select {
  display: block;
  transition: 0.5s;
  background-color: black;
  color: rgb(255, 255, 255);
  align-self: center;
  font-size: 1.2rem;
  padding: 0.4em 0;
  margin: 0.2em;
  margin-top: 0.2em;
  font-family: "Magisho", sans-serif;
  width: 12vw;
  height: 2.3em;
  position: relative;
  cursor: pointer;
  border-radius: 0.4em;
  text-transform: uppercase;
  border: 0.2em solid rgb(255, 255, 255);
}
.details .select.error {
  background-color: rgb(103, 0, 0);
}
.details .cart {
  display: flex;
  flex-direction: row;
  color: white;
}
.details .cart-button {
  display: flex; /* 修改为 flex */
  justify-content: center; /* 新增 */
  align-items: center; /* 新增 */
  text-decoration: none; /* 新增 */
  text-align: center; /* 新增 */
  transition: 0.5s;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  align-self: center;
  font-size: 1.2rem;
  padding: 0.4em 0;
  margin: 0.2em;
  margin-top: 1.2em;
  margin-right: 18em;
  font-family: "Magisho", sans-serif;
  width: 12vw;
  height: 2.3em;
  position: relative;
  cursor: pointer;
  border-radius: 0.4em;
  text-transform: uppercase;
  border: 0.2em solid rgb(255, 255, 255);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.details .cart-button:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border-radius: 0.5em;
  border: 0.2em solid rgb(0, 0, 0);
}
.logo {
  width: 425px;
  height: 60px;
  background: url("@/assets/img/logo3.png") center center no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 60px;
  right: 50px;
  /* background-position: center center; */
}

.g-number {
  position: absolute;
  width: 300px;
  top: 24%;
  text-align: center;
  z-index: 10;
  color: #fff;
}

.g-container {
  position: absolute;
  width: 255px;
  height: 400px;
  margin: auto;
  right: 120px;
  bottom: 15px;
}

.g-contrast {
  filter: contrast(10) hue-rotate(0);
  width: 300px;
  height: 400px;
  background-color: #000;
  overflow: hidden;
  animation: hueRotate 10s infinite linear;
}

.g-circle {
  position: relative;
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  filter: blur(8px);

  &::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0);
    width: 200px;
    height: 200px;
    background-color: #00ff6f;
    border-radius: 42% 38% 62% 49% / 45%;
    animation: rotate 10s infinite linear;
  }

  &::before {
    content: "";
    position: absolute;
    width: 176px;
    height: 176px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #000;
    z-index: 10;
  }
}

.g-bubbles {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100px;
  height: 40px;
  transform: translate(-50%, 0);
  border-radius: 100px 100px 0 0;
  background-color: #00ff6f;
  filter: blur(5px);
}

li {
  position: absolute;
  border-radius: 50%;
  background: #00ff6f;
}

/* ... existing code ... */

/* 替换 @for 循环的代码 */
li:nth-child(1) {
  width: 22px;
  height: 22px;
  left: 25px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 5s ease-in-out -0.5s infinite;
}

li:nth-child(2) {
  width: 28px;
  height: 28px;
  left: 45px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 6s ease-in-out -1.2s infinite;
}

li:nth-child(3) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(4) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(5) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(6) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(7) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(8) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(9) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(10) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(11) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(12) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(13) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(14) {
  width: 25px;
  height: 25px;
  left: 65px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 4.5s ease-in-out -2.1s infinite;
}
li:nth-child(15) {
  width: 20px;
  height: 20px;
  left: 85px;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: moveToTop 5.5s ease-in-out -4.2s infinite;
}

/* ... existing code ... */

@keyframes rotate {
  50% {
    border-radius: 45% / 42% 38% 58% 49%;
  }
  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}

@keyframes moveToTop {
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
    transform: translate(-50%, -180px);
  }
}

@keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}

.product-video {
  width: 485px;
  height: 225px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.2);
}

/* 添加新的样式 */
/* :deep(.count-up) {
  font-size: 32px !important;
} */

/* 或者尝试这个 */
/* .count-up :deep(*) {
  font-size: 30px !important;
} */
.maopaotitle {
  font-size: 30px !important
}
</style>
