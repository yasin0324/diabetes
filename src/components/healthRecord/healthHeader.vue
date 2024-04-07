<template>
    <div class="main">
        <div class="headerMenu">
            <el-menu
                class="el-header-menu"
                mode="horizontal"
                router
                :default-active="defaultPage"
                active-text-color="#a3c57d"
            >
                <el-menu-item
                    v-for="item in routerArr"
                    :key="item.name"
                    :index="item.path"
                    >{{ item.name }}</el-menu-item
                >
            </el-menu>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();

// 路由数组
const routerArr = [
    { name: "血糖记录", path: "/health/blood" },
    { name: "饮食记录", path: "/health/diet" },
    { name: "用药记录", path: "/health/medicine" },
    { name: "运动记录", path: "/health/sports" },
];

// 记录当前页面
const defaultPage = computed(() => {
    return router.currentRoute.value.path === "/health"
        ? "/health/blood"
        : router.currentRoute.value.path;
});
</script>
<style lang="less" scoped>
.main {
    width: 100%;
    height: 20vh;
    background-image: url("../../common/image/cloud-sky-blue.jpg");
    background-size: cover;
    .headerMenu {
        padding-top: 7vh;
        :deep(.el-menu) {
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            border-radius: 3vh;
            width: 50%;
            border: none;
            background-color: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(1vh);
            .el-menu-item {
                font-weight: bold;
                color: #696a6d;
            }
        }
    }
}
</style>
