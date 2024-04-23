import request from '../../util/request'
import { getToken, removeToken } from "../../util/auth";

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

// 修改用户信息
export function putUserName(dataValue) {
    return request({
        method: "put",
        url: "/customer/update",
        headers: {
            token: getToken(),
        },
        data:dataValue
    });
}

// 修改用户关联账号
export function putUserConnection(dataValue) {
    return request({
        method: "put",
        url: "/customer/associated_id/update",
        headers: {
            token: getToken(),
        },
        data:dataValue
    });
}

// 修改密码
export function putUserpass(dataValue) {
    return request({
        method: "put",
        url: "/user/password/update2",
        headers: {
            token: getToken(),
        },
        data:dataValue
    });
}

// 修改手机号
export function putUsermobile(dataValue) {
    return request({
        method: "put",
        url: "/user/mobile/update",
        headers: {
            token: getToken(),
            mobile: dataValue.mobile,
            smsCode :dataValue.smsCode
        },
    });
}

// 获取手机验证码
export function smsCodeGet(data) {
    return request({
        method: "get",
        url: "/common/code/mobile",
        params: {
            mobile: data,
        },
    });
}

// 获取所有用户信息
export function getallUser(data) {
    return request({
        method: "get",
        url: "/admin/page/customer",
        headers: {
            token: getToken(),
        },
        params: {
            page:data.page,
            pageSize:data.pageSize
        },
    });
}

// 关联账号
export function putassociatedUser(data) {
    return request({
        method: "put",
        url: "/customer/associated_id/update",
        headers: {
            token: getToken(),
        },
        data:data
    });
}

// 查询单个用户信息
export function getOneUser(userId){
    return request({
        method: "get",
        url: `/customer/list/${userId}`,
        headers: {
            token: getToken(),
        },
    })
}