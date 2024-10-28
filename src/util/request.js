import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken, setToken } from "../util/auth";

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: "/api",
    // 超时
    timeout: 1000000,
});

// request拦截器
service.interceptors.request.use(
    (config) => {
        // 是否需要配置token
        const isToken = (config.headers || {}).isToken === false;
        //设置token
        if (getToken() && !isToken) {
            //为请求设置token
            config.headers["Authorization"] = getToken();
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// response拦截器
service.interceptors.response.use(
    (res) => {
        //若未设置状态码则默认为成功状态
        const code = res.data.code || 200;
        // ElMessage({
        //     message: res.data.msg,
        //     type: "success",
        //     duration: 3 * 1000,
        // });
        //登录过期
        if (code == 401) {
            return res.data;
        } else if (code == 500) {
            return Promise.reject(new Error(res.data.msg));
        } else {
            return res.data;
        }
    },
    (err) => {
        console.log("error" + err);
        let { message } = err;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        ElMessage({ message: message, type: "error", duration: 5 * 1000 });
        return Promise.reject(err);
    }
);

export default service;
