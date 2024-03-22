<template>
  <div>
    <div>
      <ul class="top">
        <li onclick="openCaptcha('RANDOM')">随机</li>
        <li onclick="openCaptcha('SLIDER')">滑块验证码</li>
        <li onclick="openCaptcha('ROTATE')">旋转验证码</li>
        <li onclick="openCaptcha('CONCAT')">滑动还原验证码</li>
        <li onclick="openCaptcha('WORD_IMAGE_CLICK')">点选验证码</li>
      </ul>
      <div id="captcha-box"></div>
    </div>
  </div>
</template>

<script setup>
import "../assets/tac.min.js";
import "../assets/tac.css";
import '../assets/jquery-3.7.1.min.js'

const config = {
  // 生成接口
  requestCaptchaDataUrl: "/gen?type=RANDOM",
  // 验证接口
  validCaptchaUrl: "/check",
  // 验证码绑定的div块
  bindEl: "#captcha-box",
  // 验证成功回调函数
  validSuccess: (res, c, tac) => {
    // 销毁验证码服务
    tac.destroyWindow();
    // 调用登录方法
    login(res.id);
  },
};
const style = {
  // 配置样式， logoURL地址
  logoUrl: "/images/logo.png",
};
function login(token) {
  // 在执行登录时，将验证码token传过去进行二次校验
  $.get("/check2?id=" + token, (res) => {
    alert("登录成功");
  });
}
$(function () {
  // 创建 TAC 启动验证码服务
  new TAC(config, style).init();
});
function openCaptcha(type) {
  config.requestCaptchaDataUrl = "/gen?type=" + type;
  new TAC(config, style).init();
}
</script>

<style lang="less" scoped>
ul li {
  list-style: none;
}

* {
  margin: 0;
  padding: 0;
}

.top {
  overflow: auto;
}

.top li:hover {
  cursor: pointer;
}

.top li {
  float: left;
  height: 40px;
  width: 120px;
  margin-right: 5px;
  line-height: 40px;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  font-size: 15px;
  box-sizing: border-box;
  border: 1px solid #409eff;
}

.captcha-iframe {
  width: 300px;
  height: 320px;
  border: none;
}

.after {
  color: #88949d;
}
</style>
