<template>
    <div class="main">
        <div class="record">
            <div class="recordHeader">
                <div class="title"><h1>血糖记录</h1></div>
                <div class="datePicker">
                    <el-date-picker
                        v-model="recordDate"
                        type="date"
                        placeholder="选 择 日 期"
                        :default-active="new Date()"
                    ></el-date-picker>
                </div>
            </div>

            <div class="recordCard">
                <div class="card" v-for="item in 7">
                    <div class="cardContent">7.2</div>
                    <div class="cardFooter">早餐前</div>
                </div>
                <div class="card">
                    <div class="recordInfo" v-show="recordOpen">
                        <div class="recordForm">
                            <el-form>
                                <el-form-item class="bloodNumRecord">
                                    <div
                                        class="unit"
                                        style="
                                            font-size: 1.8vh;
                                            height: 1.8vh;
                                            line-height: 1.8vh;
                                            font-weight: bold;
                                        "
                                    >
                                        血糖值(mmol/L):
                                    </div>
                                    <el-input-number
                                        class="bloodNumInput"
                                        controls-position="right"
                                        size="small"
                                        v-model="bloodNum"
                                        :precision="1"
                                        :step="0.1"
                                    ></el-input-number>
                                </el-form-item>
                                <el-form-item class="timeTag">
                                    <div
                                        class="unit"
                                        style="
                                            font-size: 1.8vh;
                                            height: 1.8vh;
                                            line-height: 1.8vh;
                                            font-weight: bold;
                                        "
                                    >
                                        选择时段标签:
                                    </div>
                                    <el-select
                                        class="selectTag"
                                        v-model="timeTag"
                                        size="small"
                                        placeholder="选择"
                                    >
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="recordRemark">
                                    <div
                                        class="unit"
                                        style="
                                            font-size: 1.8vh;
                                            height: 1.8vh;
                                            line-height: 1.8vh;
                                            font-weight: bold;
                                        "
                                    >
                                        添加备注:
                                    </div>
                                    <el-input
                                        class="remark"
                                        v-model="remark"
                                        type="textarea"
                                        placeholder="添加备注"
                                        style="margin-top: 0.5vh"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="footer">
                            <el-button @click="recordOpen = false"
                                >取消</el-button
                            >
                            <el-button type="primary" @click="addRecord"
                                >确认</el-button
                            >
                        </div>
                    </div>
                    <div
                        v-show="!recordOpen"
                        class="buttonAll"
                        @click="recordOpen = true"
                    >
                        <el-button
                            class="cardButton"
                            type="primary"
                            icon="Plus"
                        />
                        <div class="buttonText">添 加 记 录</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { setBloodRecord } from "../../../api/healthRecord";
// 血糖记录日期
const recordDate = ref(new Date());
// 添加记录
const recordOpen = ref(false);
// 血糖值
const bloodNum = ref(0);
// 时段标签
const timeTag = ref("");
const options = ref([
    { value: "空腹", label: "空腹" },
    { value: "早餐后", label: "早餐后" },
    { value: "午餐前", label: "午餐前" },
    { value: "午餐后", label: "午餐后" },
    { value: "晚餐前", label: "晚餐前" },
    { value: "晚餐后", label: "晚餐后" },
    { value: "睡前", label: "睡前" },
    { value: "夜间", label: "夜间" },
]);
// 记录备注
const remark = ref("");
// 日期格式化
function formatDateTime(date) {
    let yyyy = date.getFullYear();
    let MM = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的
    let dd = String(date.getDate()).padStart(2, "0");
    let HH = String(date.getHours()).padStart(2, "0");
    let mm = String(date.getMinutes()).padStart(2, "0");
    let ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}
// 添加记录
const addRecord = () => {
    const data = ref({
        glucoseLevel: bloodNum.value,
        recordTime: formatDateTime(new Date()),
        periodLabel: timeTag.value,
        remark: remark.value,
    });
    console.log(data.value);
    setBloodRecord(data.value)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>
<style lang="less" scoped>
.main {
    margin-top: 2vh;
    .record {
        width: 130vh;
        height: 80vh;
        margin: 0 auto;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .recordHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1vh solid #a0a5a8;
            padding-left: 3vh;
            .title {
                color: #01111abe;
            }
            :deep(.datePicker) {
                margin-left: 3vh;
                margin-top: 1vh;
                .el-date-editor {
                    width: 18vh;
                }
            }
        }
        .recordCard {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: start;
            .card {
                margin: 3vh 1vh 1vh 5vh;
                background-color: #fff;
                width: 25vh;
                height: 30vh;
                border-radius: 5vh;
                .cardContent {
                    margin-top: 5vh;
                    height: 5vh;
                    line-height: 5vh;
                    font-size: 4.8vh;
                    font-weight: bold;
                    color: #009688;
                }
                .cardFooter {
                    margin-top: 2vh;
                    font-size: 2.5vh;
                }
                .buttonAll {
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .cardButton {
                        margin: 5vh 5vh 2vh 5vh;
                        width: 15vh;
                        height: 15vh;
                        :deep(.el-icon) {
                            height: 5vh;
                            width: 5vh;
                            svg {
                                height: 5vh;
                                width: 5vh;
                            }
                        }
                    }
                    :deep(.el-button) {
                        border: none;
                        background-color: rgba(163, 197, 125, 0.7);
                    }
                    .buttonText {
                        font-size: 2.5vh;
                        font-weight: bold;
                    }
                }
                .recordInfo {
                    margin-left: 1vh;
                    margin-right: 1vh;
                    .recordForm {
                        margin-top: 3vh;
                        .bloodNumRecord {
                            display: flex;
                            .bloodNumInput {
                                width: 9.4vh;
                            }
                        }
                        .timeTag {
                            :deep(.el-select) {
                                margin-left: 1vh;
                                width: 10vh;
                            }
                        }
                    }
                    .footer {
                        display: flex;
                        justify-content: space-around;
                        .el-button {
                            width: 8vh;
                            height: 4vh;
                            border-radius: 3vh;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
}
</style>
