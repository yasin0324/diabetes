import request from "../../util/request";

// 获取验证码
export function captchaGet() {
    return request({
        method: "get",
        url: "/captcha/get",
        params: { type: "SLIDER" },
    });
}

// 验证验证码
export function captchaCheck(data) {
    return request({
        method: "post",
        url: "/captcha/check",
        data: {
            id: data.id,
            data: data.data,
        },
    });
}
