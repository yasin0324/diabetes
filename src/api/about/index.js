import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

// 获取用户反馈
export function getUserfeed_back(data) {
    return request({
        method: "get",
        url: `/feed_back/list/${data}`,
        headers: {
            token: getToken(),
        },
    });
}

// 提交反馈
export function postUserfeed_back(data) {
    return request({
        method: "post",
        url: `/customer/feed_back/save`,
        headers: {
            token: getToken(),
        },
        data:data
    });
}

// 删除反馈信息
export function delUserfeed_back(data) {
    return request({
        method: "delete",
        url: `/feed_back/delete/${data}`,
        headers: {
            token: getToken(),
        },
    });
}

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