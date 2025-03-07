<template>
  <div class="navbar">
    <div class="headpart">
      <a class="left" href="http://shengbao.sanyau.edu.cn/" target="_blank">
        <img src="../../assets/img/pic2.png" />
        <p>三亚学院</p>
      </a>
      <div class="logo">基于Vue的金融数据可视化平台</div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const handleClick = (path: string) => {
  router.push(path);
};

const isActive = (path: string) => {
  // 特殊处理 /lab 路由，让它也激活 /basicoperate
  if (path === "/basicoperate" && route.path.startsWith("/lab")) {
    return true;
  }

  // 其他情况保持原来的逻辑
  return route.path.startsWith(path);
};
</script>

<script lang="ts">
export default {
  name: "NavBar",
};
</script>

<style scoped>
.navbar {
  display: grid;
  align-items: center;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background-color: transparent;
  width: 100%;
  /* height: 12em; */
  top: 0;
  left: 0;
  position: absolute;
  margin: 0;
  padding: 0;
  transition: 0.3s all linear;
  z-index: 99;
  min-width: 1200px;
}
.navbar.change_color {
  background-color: black;
}
.navbar:hover {
  /* background-color: black; */
  /* box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); */
}
.navbar .left {
  display: flex;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 1px 1px 2px black;
  text-decoration: none;
  min-width: 200px;
}
.navbar .headpart {
  display: flex;
}
.navbar .left img {
  display: flex;
  margin-left: 3em;
  width: 1.3em;
  margin-right: 0.4em;
  box-shadow: 0 3px 25px rgba(0, 0, 0, 0.3);
}
.navbar .left p {
  font-family: "Magisho", sans-serif;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
}
.navbar .center {
  display: grid;
  align-items: center;
  justify-content: center;
  text-shadow: 1px 1px 2px black;
}
.navbar .logo {
  display: flex;
  color: #00eaff;
  /* color: #fff; */
  /* opacity: 0.8; */
  font-family: "Hjet", sans-serif;
  text-decoration: none;
  align-items: flex-end;
  justify-content: center;
  padding: 0em 0.6em;
  font-size: 1.8em;
  letter-spacing: 0.1em;
  white-space: nowrap;
  user-select: none;
  margin-bottom: 25px;
  padding-top: 24px;
  margin-left: 430px;
}

.navlink {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  /* margin-top: 20px; */
}

.nav-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  /* padding: 1em 1em; */
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  border-radius: 8px;
  white-space: nowrap;
  min-width: 240px;
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  /* padding: 1em 1.5em; */
  position: relative;
  transition: 1s;
  text-align: center;
}

.nav-page img {
  width: 120px;
  height: 120px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.nav-page:hover {
  cursor: pointer;
  color: #00eaff;
  border-color: rgba(147, 112, 219, 0.6);
  box-shadow: 0 0 10px rgba(147, 112, 219, 0.3);
}

.nav-page.active {
  color: #00eaff;
  border-color: rgba(147, 112, 219, 0.8);
  box-shadow: 0 0 15px rgba(147, 112, 219, 0.4);
}

.nav-page:hover img,
.nav-page.active img {
  transform: scale(1.1);
}
</style>
