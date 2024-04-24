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
            foodAndDiets: data.foodAndDiets,
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
        method: "put",
        url: "/customer/diet/record/update",
        headers: {
            token: token,
        },
        data: {
            id: data.id,
            periodLabel: data.periodLabel,
            recordTime: data.recordTime,
            remark: data.remark,
            addFoodAndDiets: data.addFoodAndDiets,
            removeFoodAndDietIds: data.removeFoodAndDietIds,
        },
    });
}
// 删除记录
export function delDietRecord(data) {
    return request({
        method: "delete",
        url: "/customer/diet/record/delete",
        headers: {
            token: token,
        },
        params: {
            id: data,
        },
    });
}
// 根据食物id获取信息
export function getFoodInfo(data) {
    return request({
        method: "get",
        url: `/food/list/${data}`,
        headers: {
            token: token,
        },
    });
}
// 模糊查询食物
export function searchFood(data) {
    return request({
        method: "get",
        url: "/food/list/name",
        headers: {
            token: token,
        },
        params: {
            name: data,
        },
    });
}
// 根据食物类别获取信息
export function getFoodByType(data) {
    return request({
        method: "get",
        url: "/food/list/type",
        headers: {
            token: token,
        },
        params: {
            type: data,
        },
    });
}
// 获取所有食物类型
export function getAllType() {
    return request({
        method: "get",
        url: "/food/list/all_type",
        headers: {
            token: token,
        },
    });
}
// -----------------------------------------

// 用药记录----------------------------------
// 添加记录
export function setMedicineRecord(data) {
    return request({
        method: "post",
        url: "/customer/medicine/record/save",
        headers: {
            token: token,
        },
        data: {
            periodLabel: data.periodLabel,
            recordTime: data.recordTime,
            tempMedicines: data.tempMedicines,
            // tempMedicines: {
            //     id,          //常用药品id（不选常用药品就不传）
            //     name,        //药品名称
            //     application, //药品用途
            //     picture,     //药品图片
            //     dosage,      //药品剂量
            //     remark       //备注
            // }
        },
    });
}
// 修改记录
export function updateMedicineRecord(data) {
    return request({
        method: "put",
        url: "/customer/medicine/record/update",
        headers: {
            token: token,
        },
        data: {
            id: data.id,
            periodLabel: data.periodLabel,
            recordTime: data.recordTime,
            addTempMedicines: data.addTempMedicines,
            // addTempMedicines: {
            //     id,  //可选
            //     name,
            //     use,
            //     picture,
            //     count,
            //     remark,
            // }
            removeIds: data.removeIds,
        },
    });
}
// 获取指定日期内用药记录
export function getMedicineRecord(begin, end) {
    return request({
        method: "get",
        url: "/medicine/record/list",
        headers: {
            token: token,
        },
        params: {
            begin: begin,
            end: end,
        },
    });
}
// 删除记录
export function delMedicineRecord(id) {
    return request({
        method: "delete",
        url: `/customer/medicine/record/delete/${id}`,
        headers: {
            token: token,
        },
    });
}
// 新增用户常用药品
export function setCommonMedicine(data) {
    return request({
        method: "post",
        url: "/customer/medicine/save",
        headers: {
            token: token,
        },
        data: {
            name: data.name,
            application: data.application,
            picture: data.picture,
            dosage: data.dosage,
            remark: data.remark,
        },
    });
}
// 修改用户常用药品
export function updateCommonMedicine(data) {
    return request({
        method: "put",
        url: "/customer/medicine/update",
        headers: {
            token: token,
        },
        data: {
            id: data.id, //必需
            name: data.name,
            application: data.application,
            picture: data.picture,
            dosage: data.dosage,
            remark: data.remark,
        },
    });
}
// 删除用户常用药品
export function delCommonMedicine(id) {
    return request({
        method: "delete",
        url: `/customer/medicine/delete/${id}`,
        headers: {
            token: token,
        },
    });
}
// 根据用户id获取用户常用药品
export function getCommonMedicine(userId) {
    return request({
        method: "get",
        url: `/customer/medicine/list/userId/${userId}`,
        headers: {
            token: token,
        },
    });
}
// 根据常用药品id获取用户常用药品
export function getCommonMedicineById(id) {
    return request({
        method: "get",
        url: `/customer/medicine/list/id/${id}`,
        headers: {
            token: token,
        },
    });
}
// 新增用药提醒闹钟
export function setMedicineClock(data) {
    return request({
        method: "post",
        url: "/customer/medicine/clock/save",
        headers: {
            token: token,
        },
        data: {
            name: data.name,
            application: data.application,
            picture: data.picture,
            dosage: data.dosage,
            remark: data.remark,
            clock: data.clock, //YYYY-MM-DD HH:mm:ss
        },
    });
}
// 修改用药提醒闹钟
export function updateMedicineClock(data) {
    return request({
        method: "put",
        url: "/customer/medicine/clock/update",
        headers: {
            token: token,
        },
        data: {
            id: data.id,
            name: data.name,
            application: data.application,
            picture: data.picture,
            dosage: data.dosage,
            remark: data.remark,
            clock: data.clock,
        },
    });
}
// 获取用户所有用药提醒闹钟
export function getMedicineClock() {
    return request({
        method: "get",
        url: "/customer/medicine/clock/list",
        headers: {
            token: token,
        },
    });
}
// 删除用药提醒闹钟
export function delMedicineClock(id) {
    return request({
        method: "delete",
        url: `/customer/medicine/clock/delete/${id}`,
        headers: {
            token: token,
        },
    });
}
// -----------------------------------------

// 运动记录----------------------------------
// 新增记录
export function setSportsRecord(data) {
    return request({
        method: "post",
        url: "/customer/sport/record/save",
        headers: {
            token: token,
        },
        data: {
            periodLabel: data.periodLabel,
            recordTime: data.recordTime,
            remark: data.remark,
            sportDetailAndRecords: data.sportDetailAndRecords,
            // sportDetailAndRecords: {
            //     sportId,
            //     time,
            // },
        },
    });
}
// 修改记录
export function updateSportsRecord(data) {
    return request({
        method: "put",
        url: "/customer/sport/record/update",
        headers: {
            token: token,
        },
        data: {
            id: data.id,
            periodLabel: data.periodLabel,
            recordTime: data.recordTime,
            remark: data.remark,
            addSportDetailAndRecords: data.addSportDetailAndRecords,
            removeSportDetailAndRecords: data.removeSportDetailAndRecords,
        },
    });
}
// 查询记录
export function getSportsRecord(begin, end) {
    return request({
        method: "get",
        url: "/sport/record/list",
        headers: {
            token: token,
        },
        params: {
            begin: begin,
            end: end,
        },
    });
}
// 删除记录
export function delSportsRecord(id) {
    return request({
        method: "delete",
        url: `/customer/sport/record/delete/${id}`,
        headers: {
            token: token,
        },
    });
}
// 根据运动信息id获取运动信息
export function getSportsInfo(id) {
    return request({
        method: "get",
        url: `/sport/detail/list/${id}`,
        headers: {
            token: token,
        },
    });
}
// 根据运动类别获取运动信息
export function getSportsList(type) {
    return request({
        method: "get",
        url: "/sport/detail/list/type",
        headers: {
            token: token,
        },
        params: {
            type: type,
        },
    });
}
// 根据运动名称获取运动信息
export function getSportsByName(name) {
    return request({
        method: "get",
        url: "/sport/detail/list/name",
        headers: {
            token: token,
        },
        params: {
            name: name,
        },
    });
}
// 获取所有运动类别
export function getAllSportsType() {
    return request({
        method: "get",
        url: "/list/sport/detail/type",
        headers: {
            token: token,
        },
    });
}
// -----------------------------------------

// 生成excel表格
export function createExcel(begin, end) {
    return request({
        method: "get",
        url: "/customer/report",
        responseType: "blob",
        headers: {
            token: token,
        },
        params: {
            begin: begin,
            end: end,
        },
    });
}
