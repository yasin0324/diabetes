import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

// 获取用户反馈
export function getUserfeed_back(data) {
    return request({
        method: "get",
        url: `/feed_back/list/${data.userID}`,
        headers: {
            token: getToken(),
        },
        params:{
            page: data.page,
            pageSize: data.pageSize
        }
    });
}

// 提交反馈
export function postUserfeed_back(data1,data2) {
    return request({
        method: "post",
        url: `/customer/feed_back/save`,
        headers: {
            token: getToken(),
        },
        data:{
            word:data1.word,
            type:data1.type,
            mobile:data1.mobile,
            feedBackPictures:data2
        }
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

// 上传图片函数
export function postfile(file) {
    return request({
        method: "post",
        url: "/common/upload",
        headers: {
            token: getToken(),
        },
        data:file
    });
}