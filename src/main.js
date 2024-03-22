import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import '/node_modules/element-plus/dist/index.css'
import router from './router'

// 滑块验证码组件
import captchaSlider from './components/captchaSlider.vue'

// vue实例
const app = createApp(App)

// 全局注册
app.use(ElementPlus)
app.use(router)

// 全局组件挂载
app.component('captcha-slider', captchaSlider)

app.mount('#app')