<template>
  <div class="main">
    <router-view></router-view>
    <captcha-slider></captcha-slider>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.main {
  border: 5px solid pink;
  border-radius: 3vh;
  height: 50vh;
  width: 50vh;
  margin: 20vh auto;
}
</style>
