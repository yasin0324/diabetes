import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

// 获取用户个性化文章
export function getTextNews(data) {
    return request({
        method: "get",
        url: "/article/list",
        params:{
            title: data.title,
            author: data.author,
            type: data.type
        }
    });
}