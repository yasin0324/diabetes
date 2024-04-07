import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

// 获取用户个性化文章
export function getTextNews() {
    return request({
        method: "get",
        url: "/logout",
        headers: {
            token: getToken(),
        },
    });
}