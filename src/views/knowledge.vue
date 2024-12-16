<template>
  <div class="allStyle">
    <nav-bar></nav-bar>
    <div class="shop-page">
      <!-- <img class="hero-image" src="../assets/img/pageBg.png" alt="" /> -->
      <!-- <div class="gradient-section"></div> -->
      <div class="shop-section">
        <div v-for="p in product" :key="p.id" class="outer-card" @click="handleCardClick(p.id)">
          <div class="card">
            <img class="card-image" :src="p.src" />
            <div class="card-bottom">
              <div class="card-text">
                <p class="item-title">{{ p.title }}</p>
                <p class="item-brand">{{ p.brand }}</p>
                <p class="item-description">{{ p.description }}</p>
              </div>
            </div>
          </div>
          <div class="card-under">
            <p class="item-price">{{ p.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/nav-bar/index.vue';
import { ref } from "vue";
import vuell from "../assets/img/vuell.png";
import javascriptpng from "../assets/img/jsjsjs.jpg";
// import scatterGL from "../assets/img/scatterGL.jpg";
import Echartswhite from "../assets/img/Echartswhite.png";
import Axiosjpg from "../assets/img/axiosjpg.jpg";
import Mockpng from "../assets/img/mockjs.jpg";
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCardClick = (id: number) => {
  router.push(`/teachvue/${id}`);
};

const product = ref([
  {
    id: 1,
    title: "核心技术一",
    brand: "vue框架",
    description: "选择Vue 3进行项目开发，主要因其显著的性能提升、更小的包体积和更好的TypeScript支持。此外，其响应式系统的重构使得应用运行更加高效。这些特点共同提升了开发体验和应用性能，是现代Web应用开发的理想选择。",
    price: "重要程度: ★★★★★",
    src: vuell,
    gender: "basic",
  },
  {
    id: 2,
    title: "核心技术二",
    brand: "JavaScript",
    description: "选择JavaScript进行项目开发，因其广泛的支持、丰富的生态和高度的灵活性。JS是Web开发的核心语言，能够实现前后端全栈开发，拥有庞大的社区和库支持，易于学习和上手，适合快速开发和迭代。",
    price: "重要程度: ★★★★★",
    src: javascriptpng,
    gender: "advanced",
  },
  {
    id: 3,
    title: "核心技术三",
    brand: "Echarts",
    description: "选择ECharts进行项目开发，因其强大的图表渲染能力、丰富的可视化类型和高度的可定制性。ECharts支持多种图表组合，易于集成和使用，适用于复杂的数据显示需求，且文档详尽，社区活跃，是数据可视化项目的理想选择。",
    price: "重要程度: ★★★★★",
    src: Echartswhite,
    gender: "professional",
  },
  {
    id: 4,
    title: "核心技术四",
    brand: "Mock.js",
    description: "选择Mock.js做项目，因其能够快速生成复杂的模拟数据，支持自定义模板，易于与现有项目集成。它提高了前端开发的灵活性和效率，特别是在后端API未就绪时，能有效推进开发进度。",
    price: "重要程度: ★★★",
    src: Mockpng,
    gender: "professional",
  },
  {
    id: 5,
    title: "核心技术五",
    brand: "Axios",
    description: "选择Axios做项目，因其支持跨平台请求，具备拦截器功能，易于处理请求和响应。它还支持取消请求、自动转换数据格式，与现代前端框架如Vue 3结合紧密，提升开发效率。",
    price: "重要程度: ★★★",
    src: Axiosjpg,
    gender: "professional",
  },
]);
</script>

<style scoped>
.allStyle {
  display: flex;
  flex-direction: column;
  background: url('../assets/img/pageBg.png') center center no-repeat;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
.shop-page {
  /* position: absolute; */
  /* top: 0; */
  /* z-index: -1; */
  display: flex;
  flex-direction: column;
  padding-top: 300px;
  width: 100%;
  overflow-x: hidden;
  
  /* background-size: 100% 100%; */
}
.gradient-section {
  display: flex;
  position: absolute;
  width: 100vw;
  height: 46em;
  /* background-image: linear-gradient(transparent, rgb(0, 0, 0)); */
  text-align: center;
  justify-content: center;
  align-content: center;
}
.shop-title {
  position: absolute;
  align-self: center;
  text-align: center;
  letter-spacing: 0.3em;
  font-family: light;
  font-weight: 100;
  text-indent: 0.3em;
  font-size: 3rem;
  color: #fff;
  text-transform: uppercase;
  font-family: "Magisho", sans-serif;
}
.hero-image {
  position: relative;
  width: 100vw;
  height: 46em;
  object-fit: cover;
  display: block;
  z-index: -2;
  object-position: center;
  animation: fade-in 0.5s forwards;
}
.shop-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20em);
  grid-gap: 0.4em;
  justify-content: center;
  height: fit-content;
  width: 100%;
  padding: 0.5em 0em 5em 0em;
  /* background-color: rgba(0, 0, 0); */
}
.outer-card {
  position: relative;
  transition: transform 0.6s;
  cursor: pointer;
  /* border: 0px solid rgba(56, 56, 56, 0); */
  border: 1px solid rgba(0, 234, 255, 0.3);
  overflow: hidden;
  width: 20em;
  border-radius: 30px;
}

.card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20em;
  height: 26em;
  background: rgb(7, 7, 7);
  cursor: pointer;
  border: none;
  border-bottom: inherit;
  overflow: hidden;
  transition: transform 0.6s;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0);
  text-decoration: none;
}

.outer-card:hover {
  transform: translateY(-0.5em);
  box-shadow: 0 0 20px rgba(0, 234, 255, 0.3);
}

.outer-card:hover > .card > .card-bottom {
  opacity: 1;
}

.card-image {
  position: absolute;
  width: inherit;
  height: inherit;
  object-fit: cover;
  display: block;
  object-position: top;
  transition: transform 0.6s;
  filter: brightness(80%);
}

.outer-card:hover > .card > .card-image {
  transform: scale(1.1);
}

.card-bottom:hover > .card-image {
  transform: scale(1.1);
}

.card-bottom {
  display: flex;
  flex-direction: column;
  justify-self: center;
  position: relative;
  background: rgb(0, 0, 0);
  bottom: 0;
  left: 0;
  margin: 0;
  width: 20em;
  height: 11em;
  z-index: 1;
  opacity: 0;
  transition: opacity 1s;
  justify-content: center;
}

.card-text {
  padding: 1em 2em 1em 2em;
  font-size: 1rem;
  word-wrap: break-word;
  text-align: left;
  align-self: center;
}

.card-text > .item-title {
  font-size: 1.1rem;
  font-weight: 800;
  padding-bottom: 0.1em;
  color: rgb(214, 214, 214);
}

.card-text > .item-brand {
  font-size: 0.9rem;
  padding-bottom: 0.5em;
  color: rgb(214, 214, 214);
}

.card-text > .item-description {
  font-size: 0.7rem;
  color: rgb(214, 214, 214);
}

.card-under {
  padding: 0.5em 6.55em;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  /* width: 6em; */
  
  background-color: rgb(0, 0, 0);
  padding: 12px;
  border: none;
  border-top: none;
  transition: background-color 0.5s, all 1s;
  color: white;
}

.outer-card:hover > .card-under {
  background-color: rgb(204, 204, 204);
  color: black;
  border-bottom-right-radius: 2em;
  border-bottom-left-radius: 2em;
}

.card-under > .item-price {
  display: flex;
  font-size: 0.8rem;
  padding-bottom: 0.1em;
  opacity: 0.8;
  margin-left: 0.5em;
}
</style>
