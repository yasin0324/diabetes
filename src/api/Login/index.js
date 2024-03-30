import request from "../../util/request";
import { getToken, removeToken } from "../../util/auth";

// 用户注册
export function registerUser(data) {
    return request({
        method: "post",
        url: "/register",
        headers: {
            smsCode: data.smsCode,
            mobile: data.mobile,
        },
        data: {
            nickName: data.nickName,
            password: data.password,
            name: data.name,
            gender: data.gender,
            roleName: "普通用户",
        },
    });
}

// 用户名密码登录
export function loginUsername(data) {
    return request({
        method: "post",
        url: "/login/username",
        data: {
            userName: data.userName,
            password: data.password,
        },
    });
}

// 获取短信验证码
export function smsCodeGet(data) {
    return request({
        method: "get",
        url: "/code/mobile",
        params: {
            mobile: data.mobile,
        },
    });
}

// 手机号验证码登录
export function loginMobile(data) {
    return request({
        method: "post",
        url: "/login/mobile",
        headers: {
            mobile: data.mobile,
            smsCode: data.smsCode,
        },
    });
}

// 账号登出
export function logout() {
    return request({
        method: "post",
        url: "/logout",
        headers: {
            token: getToken(),
        },
    });
}
