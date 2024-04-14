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
                        @change="getRecordOne"
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
                            <div class="remarkContent">
                                {{ record.remark }}
                            </div>
                        </div>
                        <div class="cardButtonRecord">
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
                                @confirm="delRecord(record.id)"
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
                            <el-button
                                type="primary"
                                @click="updateRecord(index)"
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
                        @change="getRecordMore"
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
            // records.value.push(data.value);
            getRecordOne();
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
function showBloodVisible(chartData) {
    const chartDom = document.getElementById("bloodVisibleChart");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);

    const dateList = chartData.value.map(function (item) {
        const [date, periodLabel] = item.name.split(" ");
        return `${date}\n${periodLabel}`;
    });
    const valueList = chartData.value.map(function (item) {
        return item.value;
    });
    const option = {
        visualMap: [
            {
                show: false,
                type: "continuous",
                seriesIndex: 0,
                min: 0,
                max: 14,
            },
        ],
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                return params[0].name + "<br>" + params[0].value + " mmol/L";
            },
            borderColor: "#4cb5ab",
            textStyle: {
                color: "#3d4a51",
            },
        },
        xAxis: [
            {
                data: dateList,
                axisLabel: {
                    interval: 0,
                },
                axisTick: {
                    alignWithLabel: true,
                },
            },
        ],
        yAxis: [{}],
        dataZoom: {
            xAxisIndex: 0,
            show: true,
            type: "slider",
            brushSelect: false,
            moveHandleSize: 0,
            startValue: 0,
            endValue: 12,
            bottom: 10,
            zoomLock: true,
            handleSize: 0,
            borderColor: "#4cb5ab",
            fillerColor: "#4cb5ab",
            height: 10,
            maxValueSpan: 12,
            minValueSpan: 12,
            throttle: 0,
        },
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
    console.log(records.value[index]);
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
            getRecordOne();
            updateOpen.value[index] = false;
        })
        .catch((err) => {
            console.log(err);
        });
};
// 时段标签的顺序
const periodOrder = [
    "空腹",
    "早餐后",
    "午餐前",
    "午餐后",
    "晚餐前",
    "晚餐后",
    "睡前",
    "夜间",
];
// 查看记录
const getRecordOne = () => {
    BloodRecordList(recordDate.value, recordDate.value)
        .then((res) => {
            records.value = res.data.bloodGlucoseRecordsList[0].sort(
                (a, b) =>
                    periodOrder.indexOf(a.periodLabel) -
                    periodOrder.indexOf(b.periodLabel)
            );
        })
        .catch((err) => {
            console.log(err);
        });
};
// 删除记录
const delRecord = (id) => {
    delBloodRecord(id)
        .then((res) => {
            console.log(res);
            getRecordOne();
        })
        .catch((err) => {
            console.log(err);
        });
};

// 获取多日记录（用于可视化）
const getRecordMore = () => {
    console.log(visibleDate.value[0], visibleDate.value[1]);
    BloodRecordList(visibleDate.value[0], visibleDate.value[1])
        .then((res) => {
            console.log(res);
            const chartData = ref([]);
            // 遍历每一天的血糖记录
            for (let i = 0; i < res.data.localDateList.length; i++) {
                const date = res.data.localDateList[i];
                const records = res.data.bloodGlucoseRecordsList[i];

                // 按照时段标签的顺序排序记录
                records.sort(
                    (a, b) =>
                        periodOrder.indexOf(a.periodLabel) -
                        periodOrder.indexOf(b.periodLabel)
                );

                // 遍历每个记录，生成echarts图表的数据
                for (const record of records) {
                    chartData.value.push({
                        // 横坐标显示记录日期及其时段标签
                        name: `${date} ${record.periodLabel}`,
                        // 纵坐标为血糖水平
                        value: record.glucoseLevel,
                    });
                }
            }
            console.log(chartData.value);
            showBloodVisible(chartData);
        })
        .catch((err) => {
            console.log(err);
        });
};

onMounted(() => {
    getRecordOne();
    getRecordMore();
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
                    position: relative;
                    height: 100%;
                    .cardContent {
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
                    .cardRemark {
                        .remarkContent {
                            margin-top: 0.5vh;
                            width: 20vh;
                            height: 3vh;
                            text-align: center;
                            font-size: 1.4vh;
                            color: #606266;
                            word-wrap: break-word;
                        }
                    }
                    .cardFooter {
                        font-size: 2.5vh;
                    }
                    .cardButtonRecord {
                        position: absolute;
                        bottom: 2vh;
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
