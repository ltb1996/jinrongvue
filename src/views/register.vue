<template>
  <div class="login-container">
    <video id="v1" autoplay muted loop class="background-video">
      <source
        src="https://lf1-cdn-tos.bytescm.com/obj/cdn-static-resource/toutiao/xigua_cdn/xigua_video.mp4"
      />
    </video>
    <div class="login-title"></div>
    <form class="login-form" @submit.prevent="registerToLogin">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="state.username" placeholder="请输入用户名" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          placeholder="设置6至20位密码"
          v-model="state.passwordone"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">确认密码</label>
        <input
          type="password"
          id="password"
          placeholder="请再次输入上面的密码"
          v-model="state.passwordtwo"
          required
        />
      </div>
      <button type="submit" class="login-button">注册</button>
    </form>
    <div class="tail">
      <!-- <p class="register">回到首页</p> -->
      <!-- <p class="forgot-password">回到首页</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

interface LoginState {
  username: string;
  passwordone: string;
  passwordtwo: string;
  errorMessage: string;
  correctMessage: string;
}

const router = useRouter();

const state = reactive<LoginState>({
  username: "",
  passwordone: "",
  passwordtwo: "",
  errorMessage: "",
  correctMessage: "",
});

const registerToLogin = () => {
  if (state.username === "admin" && state.passwordone === "admin" && state.passwordtwo === "admin") {
    // alert("注册成功");
    state.correctMessage = "注册成功";
    ElMessage.success(state.correctMessage);
    setTimeout(() => {
      router.push("/login");
    }, 800);
  } else {
    state.errorMessage = "用户名或密码输入错误";
    ElMessage.error(state.errorMessage);
  }
};
</script>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.login-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
  z-index: 99;
  background: url(../assets/img/logobaisyxy.png) center center no-repeat;
  background-size: 30%;
  width: 1030px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 340px;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px 0px 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input:focus {
  border-color: #007aff;
  outline: none;
}

.login-button {
  width: 90%;
  padding: 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #005bb5;
}

.tail {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
.forgot-password {
  color: #007aff;
  cursor: pointer;
  z-index: 99;
  margin-left: 20px;
}
.register {
  color: red;
  cursor: pointer;
  z-index: 99;
}
</style>
