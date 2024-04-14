import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

// 获取用户信息
export function getUserName(data) {
    // console.log(data)
    return request({
        method: "get",
        url: "/customer/list",
        headers: {
            token: getToken(),
        },
    });
}