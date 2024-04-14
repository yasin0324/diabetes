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
// -----------------------------------------
