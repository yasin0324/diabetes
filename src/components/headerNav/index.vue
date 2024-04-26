<template>
    <div>
        <div class="header-nav">
            <div class="logoImg">
                <img src="./logo/logo.png" alt="" />
            </div>
            <div class="time">
                <!-- <span>
                    当前日期为：{{ currentDate }}
                </span>
                <span>
                    当前时间为：{{ currentTime }}
                </span> -->
                <el-row>
                    <el-col :span="6">
                        <span class="title">
                            {{ weather.city }}
                        </span>
                        <span> 天气：{{ weather.weather }} </span>
                    </el-col>
                    <el-col :span="14">
                        <span>
                            风向：{{ weather.winddirection }}, 风力：{{
                                weather.windpower
                            }}
                        </span>
                        <span>
                            温度：{{ weather.temperature }}， 湿度：{{
                                weather.humidity
                            }}
                        </span>
                        <span>
                            最近一次更新时间：{{ weather.reporttime }}
                        </span>
                    </el-col>
                    <el-col :span="4">
                        <el-icon
                            size="50px"
                            color="#a3c576"
                            v-if="weather.weather === '晴'"
                            ><Sunny
                        /></el-icon>
                        <el-icon
                            size="50px"
                            color="#a3c576"
                            v-if="weather.weather === ''"
                            ><MostlyCloudy
                        /></el-icon>
                        <el-icon
                            size="50px"
                            color="#a3c576"
                            v-if="weather.weather === ''"
                            ><PartlyCloudy
                        /></el-icon>
                        <el-icon
                            size="50px"
                            color="#a3c576"
                            v-if="weather.weather === '小雨'"
                            ><Drizzling
                        /></el-icon>
                        <el-icon
                            size="50px"
                            color="#a3c576"
                            v-if="weather.weather === '大雨'"
                            ><Pouring
                        /></el-icon>
                        <el-icon
                            size="50px"
                            color="#a3c576"
                            v-if="weather.weather === '多云'"
                            ><Cloudy
                        /></el-icon>
                        <el-icon
                            size="50px"
                            color="#a3c576"
                            v-if="weather.weather === ''"
                            ><Lightning
                        /></el-icon>
                    </el-col>
                </el-row>
            </div>
            <el-menu
                mode="horizontal"
                router
                :default-active="defaultPage"
                active-text-color="#a3c57d"
                class="el-menu-demo"
            >
                <el-menu-item
                    v-for="item in routerArr"
                    :key="item.name"
                    :index="'/' + item.path"
                >
                    {{ item.name }}
                </el-menu-item>
            </el-menu>

            <div class="login">
                <el-dropdown v-if="token">
                    <el-avatar
                        class="userAvatar"
                        :size="50"
                        :src="userInfo.avatar"
                    ></el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                @click="toUser"
                                class="dropdownNickName"
                                >{{ userInfo.nickName }}</el-dropdown-item
                            >
                            <el-dropdown-item @click="toUser"
                                >个人中心</el-dropdown-item
                            >
                            <el-dropdown-item @click="toLogout"
                                >退出登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-icon v-else :size="30" @click="toLogin">
                    <UserFilled />
                </el-icon>
                <p class="login-text" v-if="!token" @click="toLogin">登录</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { getInfo, logout, getIP, getIPCity } from "../../api/Login";
import { onMounted, ref, computed } from "vue";
import { getToken, removeToken, setToken } from "../../util/auth";
import { ElMessage } from "element-plus";

const router = useRouter();
const token = localStorage.getItem("token");

const currentTime = ref("");
const currentDate = ref("");
// 在组件挂载后获取当前时间，并更新 currentTime 数据
onMounted(() => {
    updateDateTime();
    // 每秒更新一次时间
    setInterval(updateDateTime, 1000);
    getUserIP();
});

// 获取当前ip
const weather = ref("");
function getUserIP() {
    getIP()
        .then((res) => {
            // console.log(res)
            getIPCity(res.city)
                .then((res) => {
                    // console.log(res)
                    weather.value = res.lives[0];
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}

// 更新当前日期和时间
function updateDateTime() {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${padZero(
        now.getMonth() + 1
    )}-${padZero(now.getDate())}`;
    const formattedTime = `${padZero(now.getHours())}:${padZero(
        now.getMinutes()
    )}:${padZero(now.getSeconds())}`;
    currentDate.value = formattedDate;
    currentTime.value = formattedTime;
}

// 辅助函数，用于补零
function padZero(num) {
    return num.toString().padStart(2, "0");
}

// 路由数组
const routerArr = [
    { name: "首页", path: "home" },
    { name: "健康记录", path: "health" },
    { name: "工具栏", path: "tool" },
    { name: "文章推荐", path: "articles" },
    { name: "公告", path: "about" },
];

const defaultPage = computed(() => {
    return "/" + router.currentRoute.value.path.split("/")[1];
});

// 登录
const toLogin = () => {
    router.push("/login");
};

// 登出
const toLogout = () => {
    logout()
        .then((res) => {
            removeToken();
            router.push("/login");
        })
        .catch((err) => {
            console.log(err);
        });
};

// 用户信息
const userInfo = ref({});
const getUserInfo = () => {
    getInfo()
        .then((res) => {
            setTimeout(() => {
                userInfo.value = res.data;
            }, 500);
        })
        .catch((err) => {
            console.log(err);
        });
};

// 跳转个人中心
const toUser = () => {
    router.push(`/user/${userInfo.value.userId}`);
};

onMounted(() => {
    getUserInfo();
});
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
        height: 100%;
        width: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .el-col {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .title {
                font-weight: bold; /* 加粗 */
                color: #333; /* 字体颜色 */
                font-size: 1.3vw;
            }
            span {
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                width: 100%;
                display: inline-block;
                font-size: 0.8vw;
            }
        }
    }
    .el-menu-demo {
        height: 100%;
        width: 70vh;
        border-bottom: 0;
        .el-menu-item {
            background-color: transparent;
            color: black;
        }
        .el-menu-item:hover {
            color: #a3c57d;
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
        justify-content: center;
        width: 5vw;
        height: 100%;
        .login-text {
            font-size: 1.8vh;
            cursor: pointer;
        }
    }
    .login:hover {
        color: #a3c57d;
        background-color: #e5f4e6;
        transition: color 0.3s ease, background-color 0.3s ease;
    }
}
</style>
