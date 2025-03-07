<template>
  <div class="navbar">
    <div class="headpart">
      <a class="left" href="http://shengbao.sanyau.edu.cn/" target="_blank">
        <img src="../../assets/img/pic2.png" />
        <p>三亚学院</p>
      </a>
      <div class="logo">基于Vue的金融数据可视化平台</div>
    </div>
    <div class="center">
      <div class="navlink">
        <a
          class="nav-page"
          :class="{ active: isActive('/projectindex') }"
          @click="handleClick('/projectindex')"
        >
          <img src="../../assets/img/xmjj.png" alt="项目介绍" />
          项目介绍
        </a>
        <a
          class="nav-page"
          :class="{ active: isActive('/knowledge') }"
          @click="handleClick('/knowledge')"
        >
          <img src="../../assets/img/syzd.png" alt="核心技术" />
          核心技术
        </a>
        <a
          class="nav-page"
          :class="{ active: isActive('/basicoperate') }"
          @click="handleClick('/basicoperate')"
        >
          <img src="../../assets/img/sycz.png" alt="技术实操" />
          技术实操
        </a>
        <a
          class="nav-page"
          :class="{ active: isActive('/index') }"
          @click="handleClick('/index')"
        >
          <img src="../../assets/img/sybg.png" alt="项目成果" />
          项目成果
        </a>
      </div>
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
.notification-counter {
  position: absolute;
  top: -2px;
  left: 32px;
  background-color: rgba(212, 19, 13, 1);
  color: #fff;
  border-radius: 1em;
  padding: 0.3em 0.6em;
  font-family: "Valverde", sans-serif;
  font-size: 0.7em;
}

.navbar {
  display: grid;
  align-items: center;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background-color: transparent;
  width: 100%;
  height: 12em;
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
.navbar .center .navlink {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: "Magisho", sans-serif;
  text-indent: 0.4em;
  /* margin-top: 1px; */
  text-decoration: none;
  letter-spacing: 0.2em;
}
.navbar .right {
  display: flex;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: flex-end;
  padding-right: 2em;
  min-width: 200px;
}
.navbar .right .searchBox {
  height: 1em;
  display: flex;
  cursor: pointer;
  /* padding: 1em 1em; */
  background: #fff;
  border-radius: 5em;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
}
.navbar .right .searchBox .search-icon {
  color: black;
  font-size: 18px;
  /* padding-right: 0.1em; */
}
.navbar .right .cart {
  height: 1em;
  display: flex;
  cursor: pointer;
  padding: 0.86em 0.86em;
  margin-left: 0.2em;
  background: #fff;
  border-radius: 5em;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  color: black;
  font-size: 18px;
}
.navbar .center .navlink .nav-page.active {
  color: #00eaff;
}
.navbar .center .navlink .nav-page:hover {
  cursor: pointer;
  color: #00eaff;
}

/* @media only screen and (max-width: 600px) {
  .navbar {
    transform: translateX(17%);
    display: flex;
    justify-content: center;
  }
  .navbar .center {
    transform: translateX(4%);
  }

  .navbar .left {
    display: none;
  }
  .navbar .right {
    display: flex;
    justify-content: right;
    padding: 0;
    margin-left: 1em;
  }
  .navbar .right .search {
    display: none;
  }
  .navbar .right .cart {
    justify-content: right;
  }
} */

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
