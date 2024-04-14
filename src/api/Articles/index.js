import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

// 获取用户个性化文章
export function getTextNews(data) {
    console.log(data)
    return request({
        method: "get",
        url: "/article/list",
        headers: {
            token: getToken(),
        },
        params:{
            title: data.title,
            author: data.author,
            type: data.type
        }
    });
}
// 文章点赞
// 获取用户点赞过的文章
export function getUserLikeNews(){
    return request({
        method: "get",
        url: "/customer/like/article/list",
        headers: {
            token: getToken(),
        },
    });
}
// 新增点赞
export function UserAddLikeNews(data) {
    // console.log(data)
    return request({
        method: "post",
        url: `/customer/like/article/save/${data}`,
        headers: {
            token: getToken(),
        },
    });
}
// 减少点赞
export function UserReduceLikeNews(data) {
    // console.log(data)
    return request({
        method: "post",
        url: `/customer/like/article/delete/${data}`,
        headers: {
            token: getToken(),
        },
    });
}

// 收藏相关
// 获取用户收藏文章
export function getUserCollectNews(){
    return request({
        method: "get",
        url: "/customer/collected/article/list",
        headers: {
            token: getToken(),
        },
    });
}

// 用户新增收藏文章
export function UserAddCollectNews(data){
    return request({
        method: "post",
        url: `/customer/collected/article/save/${data}`,
        headers: {
            token: getToken(),
        },
    });
}

// 用户减少收藏文章
export function UserReduceCollectNews(data){
    return request({
        method: "delete",
        url: `/customer/collected/article/delete/${data}`,
        headers: {
            token: getToken(),
        },
    });
}