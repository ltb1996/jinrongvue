<template>
  <div class="navbar">
    <a class="left" href="http://shengbao.sanyau.edu.cn/">
      <img src="../../assets/img/pic2.png" />
      <p>SAXO BANK</p>
    </a>
    <div class="center">
      <div class="logo">SAXO BANK</div>
      <div class="navlink">
        <a class="nav-page" @click="handleClick('/projectindex')">项目介绍</a>
        <a class="nav-page" @click="handleClick('/knowledge')">核心技术</a>
        <a class="nav-page" @click="handleClick('/basicoperate')">技术实操</a>
        <a class="nav-page" @click="handleClick('/index')">项目成果</a>
      </div>
    </div>
    <div class="right">
      <!-- <div class="search">
        <a class="searchBox" to="/search"
          ><i class="uil uil-search search-icon"></i
        ></a>
      </div> -->
      <!-- <div class="cart" style="display: none"></div>
        <i class="uil uil-shopping-bag"></i>
        <span class="notification-counter">{{ cartItemCount }}</span>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const handleClick = (path: string) => {
  router.push(path);
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
  grid-template-columns: 1fr 1fr 1fr;
  background-color: transparent;
  width: 100%;
  height: 6em;
  top: 0;
  left: 0;
  position: fixed;
  margin: 0;
  padding: 0;
  transition: 0.3s all linear;
  z-index: 1;
  min-width: 1200px;
}
.navbar.change_color {
  background-color: black;
}
.navbar:hover {
  background-color: black;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
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
.navbar .left img {
  display: flex;
  margin-left: 3em;
  width: 1.1em;
  margin-right: 0.4em;
  box-shadow: 0 3px 25px rgba(0, 0, 0, 0.3);
}
.navbar .left p {
  font-family: "Magisho", sans-serif;
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
}
.navbar .center {
  display: grid;
  align-items: center;
  justify-content: center;
  text-shadow: 1px 1px 2px black;
}
.navbar .center .logo {
  display: flex;
  color: #f8f8f8;
  font-size: 30px;
  font-family: "Hjet", sans-serif;
  text-decoration: none;
  align-items: flex-end;
  justify-content: center;
  padding: 0em 0.6em;
  font-size: 2.2em;
  letter-spacing: 0.1em;
  white-space: nowrap;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
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
.navbar .center .navlink .nav-page {
  text-decoration: none;
  color: #fff;
  font-size: 0.8rem;
  padding: 0em 1.5em;
  position: relative;
  transition: 1s;
  text-align: center;
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
  padding: 1em 1em;
  background: #fff;
  border-radius: 5em;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
}
.navbar .right .searchBox .search-icon {
  color: black;
  font-size: 18px;
  padding-right: 0.1em;
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
</style>
