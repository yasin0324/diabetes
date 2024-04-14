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
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    ></el-date-picker>
                </div>
            </div>

            <div class="recordCard">
                <div
                    class="card"
                    v-for="(record, index) in records"
                    :key="index"
                >
                    <div class="cardMain" v-show="!updateOpen[index]">
                        <div class="cardContent">
                            <h1>{{ record.glucoseLevel }}</h1>
                            <p>mmol/L</p>
                        </div>
                        <div class="cardFooter">{{ record.periodLabel }}</div>
                        <div class="cardRemark" v-if="record.remark">
                            <div
                                class="remarkContent"
                                style="
                                    width: 20vh;
                                    height: 5vh;
                                    font-size: 1.4vh;
                                    color: #606266;
                                    word-wrap: break-word;
                                "
                            >
                                {{ record.remark }}
                            </div>
                        </div>
                        <el-button
                            @click="startUpdate(index)"
                            style="
                                margin-top: 1vh;
                                border-radius: 2vh;
                                background-color: #4cb5ab;
                                color: #fff;
                            "
                            >编辑</el-button
                        >
                        <el-popconfirm
                            width="200"
                            confirm-button-text="删除"
                            cancel-button-text="取消"
                            title="确定删除该记录？"
                        >
                            <template #reference>
                                <el-button
                                    type="danger"
                                    :icon="CloseBold"
                                    circle
                                    style="
                                        padding: 0;
                                        margin-left: 0;
                                        margin-top: 1vh;
                                    "
                                />
                            </template>
                        </el-popconfirm>
                    </div>
                    <div class="updateInfo" v-show="updateOpen[index]">
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
                                        v-model="record.glucoseLevel"
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
                                        v-model="record.periodLabel"
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
                                        v-model="record.remark"
                                        type="textarea"
                                        placeholder="添加备注"
                                        :rows="4"
                                        :autosize="{ minRows: 4, maxRows: 4 }"
                                        style="margin-top: 0.5vh"
                                        resize="none"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="footer">
                            <el-button @click="updateOpen[index] = false"
                                >取消</el-button
                            >
                            <el-button type="primary" @click="updateRecord"
                                >修改</el-button
                            >
                        </div>
                    </div>
                </div>
                <div class="card" v-if="records.length < 8">
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
                                        v-model="addRecordData.bloodNum"
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
                                        v-model="addRecordData.timeTag"
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
                                        v-model="addRecordData.remark"
                                        type="textarea"
                                        placeholder="添加备注"
                                        :rows="4"
                                        :autosize="{ minRows: 4, maxRows: 4 }"
                                        style="margin-top: 0.5vh"
                                        resize="none"
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
        <div class="bloodVisible">
            <div class="visibleHeader">
                <div class="title"><h1>血糖可视化</h1></div>
                <div class="datePicker">
                    <el-date-picker
                        v-model="visibleDate"
                        type="daterange"
                        range-separator="到"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-active="new Date()"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        :disabled-date="(time) => time.getTime() > Date.now()"
                    ></el-date-picker>
                </div>
            </div>
            <div class="visibleContent">
                <div
                    id="bloodVisibleChart"
                    style="width: 100%; height: 50vh"
                ></div>
            </div>
        </div>
        <div class="bloodAnalyse">
            <div class="analyseHeader">
                <div class="title"><h1>血糖分析</h1></div>
                <div class="datePicker">
                    <el-radio-group v-model="analyseDate">
                        <el-radio value="recent7days">近7天</el-radio>
                        <el-radio value="recent15days">近15天</el-radio>
                        <el-radio value="recent30days">近30天</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="analyseMain" style="height: 50vh"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
    setBloodRecord,
    updateBloodRecord,
    delBloodRecord,
    BloodRecordList,
} from "../../../api/healthRecord";
import { CloseBold } from "@element-plus/icons-vue";
import * as echarts from "echarts";
// 血糖记录日期
const recordDate = ref(formatDate(new Date()));
// 添加记录
const recordOpen = ref(false);
const addRecordData = ref({
    bloodNum: 0,
    timeTag: "",
    remark: "",
});
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
// 日期格式化
// YYYY-MM-DD HH:mm:ss
function formatDateTime(date) {
    let yyyy = date.getFullYear();
    let MM = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的
    let dd = String(date.getDate()).padStart(2, "0");
    let HH = String(date.getHours()).padStart(2, "0");
    let mm = String(date.getMinutes()).padStart(2, "0");
    let ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}
// YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}
// 添加记录
const addRecord = () => {
    const data = ref({
        glucoseLevel: addRecordData.value.bloodNum,
        recordTime: `${recordDate.value} 12:00:00`,
        periodLabel: addRecordData.value.timeTag,
        remark: addRecordData.value.remark,
    });
    console.log(data.value);
    setBloodRecord(data.value)
        .then((res) => {
            console.log(res);
            records.value.push(data.value);
            addRecordData.value = {
                bloodNum: 0,
                timeTag: "",
                remark: "",
            };
            recordOpen.value = false;
        })
        .catch((err) => {
            console.log(err);
        });
};
// 可视化日期记录
const visibleDate = ref([
    formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
    formatDate(new Date()),
]);
// 血糖记录可视化
function showBloodVisible() {
    const chartDom = document.getElementById("bloodVisibleChart");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);

    const data = [
        ["2000-06-05", 116],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 130],
        ["2000-06-15", 245],
        ["2000-06-16", 139],
        ["2000-06-17", 115],
        ["2000-06-18", 111],
        ["2000-06-19", 309],
        ["2000-06-20", 206],
        ["2000-06-21", 137],
        ["2000-06-22", 128],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 106],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 125],
        ["2000-07-03", 107],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 106],
        ["2000-07-08", 107],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        ["2000-07-12", 113],
        ["2000-07-13", 107],
        ["2000-07-14", 131],
        ["2000-07-15", 111],
        ["2000-07-16", 64],
        ["2000-07-17", 69],
        ["2000-07-18", 88],
        ["2000-07-19", 77],
        ["2000-07-20", 83],
        ["2000-07-21", 111],
        ["2000-07-22", 57],
        ["2000-07-23", 55],
        ["2000-07-24", 60],
    ];
    const dateList = data.map(function (item) {
        return item[0];
    });
    const valueList = data.map(function (item) {
        return item[1];
    });
    const option = {
        visualMap: [
            {
                show: false,
                type: "continuous",
                seriesIndex: 0,
                min: 0,
                max: 400,
            },
        ],
        title: [
            {
                left: "center",
                text: "Gradient along the y axis",
            },
        ],
        tooltip: {
            trigger: "axis",
        },
        xAxis: [
            {
                data: dateList,
            },
        ],
        yAxis: [{}],
        series: [
            {
                type: "line",
                showSymbol: false,
                data: valueList,
            },
        ],
    };
    myChart.setOption(option);
}
// 血糖分析日期
const analyseDate = ref("recent7days");

// 血糖记录
const records = ref([]);
// 每个记录的编辑状态
const updateOpen = ref(records.value.map(() => false));
// 开始编辑记录
const startUpdate = (index) => {
    // 对应的编辑状态设置为true
    updateOpen.value[index] = true;
};
// 修改记录
const updateRecord = (index) => {
    const data = {
        id: records.value[index].id,
        glucoseLevel: records.value[index].glucoseLevel,
        recordTime: records.value[index].recordTime,
        periodLabel: records.value[index].periodLabel,
        remark: records.value[index].remark,
    };
    updateBloodRecord(data)
        .then((res) => {
            console.log(res);
            updateOpen.value[index] = false;
        })
        .catch((err) => {
            console.log(err);
        });
};

onMounted(() => {
    showBloodVisible();
});
</script>
<style lang="less" scoped>
.main {
    margin-top: 2vh;
    .record {
        width: 130vh;
        margin: 0 auto 2vh;
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
                margin: 3vh 1vh 2vh 5vh;
                background-color: #fff;
                width: 25vh;
                height: 30vh;
                border-radius: 5vh;
                .cardMain {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .cardContent {
                        margin-top: 3vh;
                        display: flex;
                        flex-direction: row;
                        align-items: end;
                        h1 {
                            height: 5vh;
                            line-height: 5vh;
                            font-size: 4.8vh;
                            font-weight: bold;
                            color: #009688;
                        }
                        p {
                            margin-left: 1vh;
                            height: 5vh;
                            line-height: 5vh;
                            font-size: 2vh;
                            font-weight: bold;
                        }
                    }
                    .cardFooter {
                        font-size: 2.5vh;
                    }
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
                        border-radius: 3vh;
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
                        background-color: rgba(0, 150, 136, 0.7);
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
                .updateInfo {
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
    .bloodVisible {
        width: 130vh;
        margin: 0 auto 2vh;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .visibleHeader {
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
                    width: 25vh;
                }
            }
        }
    }
    .bloodAnalyse {
        width: 130vh;
        margin: 0 auto 2vh;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .analyseHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1vh solid #a0a5a8;
            padding-left: 3vh;
            .title {
                color: #01111abe;
            }
            :deep(.datePicker) {
                margin-left: 0vh;
                margin-top: 1vh;
                .el-radio-group {
                    margin-left: 3vh;
                }
            }
        }
    }
}
</style>
