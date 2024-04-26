import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "/node_modules/element-plus/dist/index.css";
import router from "./router";
import elementIcons from "./components/SvgIcon/svgicon.js";

// 滑块验证码组件
import captchaSlider from "./components/captchaSlider.vue";
// 导航栏组件
import headerNav from "./components/headerNav/index.vue";
// 健康记录导航栏组件
import healthHeader from "./components/healthRecord/healthHeader.vue";
// ai助手
import chatAi from "./components/aiElf/index.vue";

// vue实例
const app = createApp(App);

// 全局注册
app.use(ElementPlus);
app.use(router);
app.use(elementIcons);

// 全局组件挂载
app.component("captcha-slider", captchaSlider);
app.component("header-nav", headerNav);
app.component("health-header", healthHeader);
app.component("chat-ai", chatAi);

// 路由守卫
router.beforeEach((to, from, next) => {
    // 验证token，只有存在token的时候，才能跳转到内容页
    const token = localStorage.getItem("token");
    if (token || to.path === "/login") {
        next();
    } else {
        next("/login");
    }
});

app.mount("#app");
