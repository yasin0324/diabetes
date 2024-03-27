<template>
    <div>
        <div class="header-nav">
            <div class="logoImg">
                <img src="./logo/logo.png" alt="" />
                <!-- <h1>name</h1> -->
            </div>
            <div class="time"></div>
            <el-menu
                mode="horizontal"
                router
                :default-active="defaultPage"
                active-text-color="#a3c57d"
                class="el-menu-demo"
            >
                <el-menu-item
                    @click="saveCurrentPage"
                    v-for="item in routerArr"
                    :key="item.name"
                    :index="'/' + item.path"
                >
                    {{ item.name }}
                </el-menu-item>
            </el-menu>

            <div class="login" @click="toLogin">
                <el-icon :size="30">
                    <UserFilled />
                </el-icon>
                <p class="login-text">登录</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 路由数组
const routerArr = [
    { name: "首页", path: "home" },
    { name: "健康记录", path: "health" },
    { name: "工具栏", path: "tool" },
    { name: "文章推荐", path: "articles" },
    { name: "商城", path: "store" },
];

//记录当前页面
const defaultPage = sessionStorage.getItem("currentPage") || "/" + routerArr[0];
const saveCurrentPage = (e) => {
    sessionStorage.setItem("currentPage", e.index);
};

// 登录
const toLogin = () => {
    router.push("/login");
};
</script>

<style lang="less" scoped>
.header-nav {
    border-bottom: 1px solid #d8d8d8;
    height: 8vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logoImg {
        height: 100%;
        display: flex;
        align-items: center;
        img {
            height: 100%;
            width: 15vh;
            margin-left: 1vh;
        }
    }
    .time {
        border: 1px solid #409eff;
        height: 100%;
        width: 50vh;
        background-color: #409eff;
    }
    .el-menu-demo {
        height: 100%;
        width: 70vh;
        border-bottom: 0;
        .el-menu-item {
            background-color: transparent; /* 使用 transparent 来使背景颜色透明 */
        }
        .el-menu-item:hover{
            color:#a3c57d;
            background-color: #e5f4e6;
            transition: color 0.3s ease, background-color 0.3s ease;
        }
    }
    
    :deep(.el-menu-item) {
        font-size: 2vh;
        height: 100%;
    }
    .login {
        position: absolute;
        // padding-bottom: 0.5vh;
        right: 5vh;
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 5vw;
        height: 100%;
        .login-text {
            font-size: 1.8vh;
        }
    }
    .login:hover {
        color:#a3c57d;
        background-color: #e5f4e6;
        transition: color 0.3s ease, background-color 0.3s ease;
    }
}
</style>
