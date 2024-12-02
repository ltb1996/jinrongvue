<template>
  <div class="allStyle">
    <nav-bar></nav-bar>
    <div v-if="!$route.path.includes('shoppage')" class="button-container">
      <div class="cyber-button" @click="handleExamInfo">
        <span class="cyber-button__text">实验介绍</span>
        <span class="cyber-button__glitch"></span>
      </div>
      <div class="cyber-button" @click="handleEnterLab">
        <span class="cyber-button__text">进入实验</span>
        <span class="cyber-button__glitch"></span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../components/nav-bar/index.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleExamInfo = () => {
  console.log("考核说明");
};

const handleEnterLab = () => {
  router.push('/basicoperate/shoppage');
};
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

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  height: calc(100vh - 200px);
}

.cyber-button {
  --primary: #00eaff;
  --shadow-primary: rgba(0, 234, 255, 0.3);
  --color: rgba(255, 255, 255, 0.9);
  --font-size: 26px;
  --shadow-primary-hue: 180;
  --shadow-secondary-hue: 60;
  --shadow-secondary: rgba(0, 234, 255, 0.1);
  --clip: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  --border: 4px;
  --shimmy-distance: 5;
  --clip-one: polygon(0 2%, 100% 2%, 100% 95%, 0 95%);
  --clip-two: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
  --clip-three: polygon(0 44%, 100% 44%, 100% 54%, 0 54%);
  --clip-four: polygon(0 0, 100% 0, 100% 0, 0 0);
  --clip-five: polygon(0 0, 100% 0, 100% 0, 0 0);
  --clip-six: polygon(0 40%, 100% 40%, 100% 85%, 0 85%);
  --clip-seven: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
  
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 80px;
  background: transparent;
  border: 2px solid var(--primary);
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: var(--font-size);
  font-family: 'Cyber', sans-serif;
  color: var(--color);
  transition: background 0.2s;
}

.cyber-button:hover {
  background: var(--shadow-primary);
  box-shadow: 0 0 20px var(--shadow-primary);
  animation: cyber-hover 1s infinite;
}

.cyber-button__text {
  position: relative;
  z-index: 2;
}

.cyber-button__glitch {
  position: absolute;
  top: calc(var(--border) * -1);
  left: calc(var(--border) * -1);
  right: calc(var(--border) * -1);
  bottom: calc(var(--border) * -1);
  background: var(--shadow-primary);
  text-shadow: 2px 2px var(--shadow-primary);
  clip-path: var(--clip);
  animation: glitch 2s infinite;
  display: none;
}

.cyber-button:hover .cyber-button__glitch {
  display: block;
}

@keyframes glitch {
  0% {
    clip-path: var(--clip-one);
  }
  2%, 8% {
    clip-path: var(--clip-two);
    transform: translate(calc(var(--shimmy-distance) * -1%), 0);
  }
  6% {
    clip-path: var(--clip-two);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  9% {
    clip-path: var(--clip-two);
    transform: translate(0, 0);
  }
  10% {
    clip-path: var(--clip-three);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  13% {
    clip-path: var(--clip-three);
    transform: translate(0, 0);
  }
  14%, 21% {
    clip-path: var(--clip-four);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  25% {
    clip-path: var(--clip-five);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  30% {
    clip-path: var(--clip-five);
    transform: translate(calc(var(--shimmy-distance) * -1%), 0);
  }
  35%, 45% {
    clip-path: var(--clip-six);
    transform: translate(calc(var(--shimmy-distance) * -1%));
  }
  40% {
    clip-path: var(--clip-six);
    transform: translate(calc(var(--shimmy-distance) * 1%));
  }
  50% {
    clip-path: var(--clip-six);
    transform: translate(0, 0);
  }
  55% {
    clip-path: var(--clip-seven);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }
  60% {
    clip-path: var(--clip-seven);
    transform: translate(0, 0);
  }
  31%, 61%, 100% {
    clip-path: var(--clip);
    transform: translate(0, 0);
  }
}
</style>
