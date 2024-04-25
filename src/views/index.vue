<template>
    <div class="main">
        <header-nav> </header-nav>
        <router-view></router-view>
        <chat-ai class="ai"></chat-ai>
    </div>
</template>
<script setup></script>
<style lang="less" scoped>
.main {
    .ai {
        position: fixed;
        bottom: 5vh;
        right: 5vh;
    }
}
</style>
