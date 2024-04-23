import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

// 获取公告
export function getNotice() {
    return request({
        method: "get",
        url: `/notice/list`,
        headers: {
            token: getToken(),
        },
    });
}

// 获取用户信息
export function getUserName() {
    return request({
        method: "get",
        url: "/customer/list",
        headers: {
            token: getToken(),
        },
    });
}