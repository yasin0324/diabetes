import request from "../../util/request";
import { getToken } from "../../util/auth";

const token = getToken();

// 血糖记录---------------------------------
// 添加记录
export function setBloodRecord(data) {
    return request({
        method: "post",
        url: "/customer/glucose/record/save",
        headers: {
            token: token,
        },
        data: {
            glucoseLevel: data.glucoseLevel,
            recordTime: data.recordTime,
            periodLabel: data.periodLabel,
            remark: data.remark,
        },
    });
}
// 修改记录
export function updateBloodRecord(data) {
    return request({
        method: "put",
        url: "/customer/glucose/record/update",
        headers: {
            token: token,
        },
        data: {
            id: data.id,
            glucoseLevel: data.glucoseLevel,
            recordTime: data.recordTime,
            periodLabel: data.periodLabel,
            remark: data.remark,
        },
    });
}
// 删除记录
export function delBloodRecord(data) {
    return request({
        method: "delete",
        url: "/customer/glucose/record/delete",
        headers: {
            token: token,
        },
        data: [data],
    });
}
// 查看记录
export function BloodRecordList(begin, end) {
    return request({
        method: "get",
        url: "/glucose/record/list",
        headers: {
            token: token,
        },
        params: {
            begin: begin,
            end: end,
        },
    });
}
// -----------------------------------------

// 饮食记录----------------------------------
// 添加记录
export function setDietRecord(data) {
    return request({
        method: "post",
        url: "/customer/diet/record/save",
        headers: {
            token: token,
        },
        data: {
            periodLabel: data.periodLabel,
            recordTime: data.recordTime,
            remark: data.remark,
            foodAndDiets: [data.foodId, data.foodNum],
        },
    });
}
// 查询记录
export function dietRecordList(begin, end) {
    return request({
        method: "get",
        url: "/diet/record/list",
        headers: {
            token: token,
        },
        params: {
            begin: begin,
            end: end,
        },
    });
}
// 修改记录
export function updateDietRecord(data) {
    return request({
        method: 'put',
        url: '/customer/diet/record/update',
        headers: {
            token: token,
        },
        data: {
            id: data.id,
            periodLabel: data.periodLabel,
            recordTime: data.recordTime,
            remark: data.remark,
            addFoodAndDiets: [data.foodId, data.foodNum],
            delFoodAndDiets: [data.delFoodId],
        }
    })
}
// 删除记录

// -----------------------------------------
