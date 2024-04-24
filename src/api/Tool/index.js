import request from "../../util/request";
import { getToken } from "../../util/auth";

const token = getToken();

// 智能推荐食谱
export function recommendRecipes(id) {
    return request({
        method: "post",
        url: `/tool/recommendRecipes/${id}`,
        headers: {
            token: token,
        },
    });
}
// ai控糖小精灵
export function aiElf(data) {
    return request({
        method: "get",
        url: "/tool/aiElf",
        headers: {
            token: token,
        },
        params: {
            question: data,
        },
    });
}
// 糖尿病患病概率预测
export function predictDiabetes(data) {
    return request({
        method: "post",
        url: "/tool/predictDiabetes",
        headers: {
            token: token,
        },
        data: {
            gender: data.gender,
            glucoseLevel: data.glucoseLevel,
            bloodPressure: data.bloodPressure,
            skinThickness: data.skinThickness,
            fastingInsulinLevel: data.fastingInsulinLevel,
            height: data.height,
            weight: data.weight,
            familyMedicalHistory: data.familyMedicalHistory,
            age: data.age,
            pregnancyNum: data.pregnancyNum,
        },
    });
}
