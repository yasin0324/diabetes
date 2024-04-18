<template>
    <div class="main">
        <div class="record">
            <div class="recordHeader">
                <div class="title"><h1>运动记录</h1></div>
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
            <div class="recordMain">
                <div class="sportsVisible">
                    <div
                        id="sportsChart"
                        style="width: 50vh; height: 50vh"
                    ></div>
                </div>
                <div class="sportsRecord">
                    <div class="sportRecord">
                        <div class="picture">
                            <img src="../../../common/image/face.png" />
                        </div>
                        <div class="name">散步</div>
                        <div class="time">30分钟</div>
                        <div class="heat">78千卡</div>
                        <div class="type">
                            <el-tag type="success">早晨</el-tag>
                        </div>
                        <div class="button">
                            <el-button class="update">编辑</el-button>
                            <el-button class="delete">删除</el-button>
                        </div>
                    </div>
                    <div class="sportRecord">
                        <div class="addFace" v-if="!added">
                            <el-button @click="added = true"
                                >添 加 记 录</el-button
                            >
                        </div>
                        <div class="addBack" v-else>
                            <div class="sports">
                                <el-cascader
                                    :options="sports"
                                    :show-all-levels="false"
                                    placeholder="选择运动"
                                ></el-cascader>
                            </div>
                            <div class="minute">
                                <el-input-number
                                    v-model="sportsNum"
                                    :min="1"
                                    controls-position="right"
                                    step="30"
                                />
                            </div>
                            <div class="periodLabel">
                                <el-select
                                    v-model="periodLabel"
                                    placeholder="时段标签"
                                >
                                    <el-option
                                        v-for="item in periodLabels"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                            </div>
                            <div class="addButton">
                                <el-button class="close">取消</el-button>
                                <el-button class="confirm">确定</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sportVisible">
            <div class="visibleHeader">
                <div class="title"><h1>运动可视化</h1></div>
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
                    id="sportVisibleChart"
                    style="width: 100%; height: 50vh"
                ></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { getToken } from "../../../util/auth.js";

const token = getToken();
const headers = {
    token: token,
};

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

const recordDate = ref(formatDate(new Date()));

// 运动数据
const sportsData = ref([
    {
        sport: "跑步",
        time: 30,
        calorie: 200,
        periodLabel: "早上",
    },
    {
        sport: "骑行",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
    {
        sport: "游泳",
        time: 45,
        calorie: 250,
        periodLabel: "晚上",
    },
    {
        sport: "篮球",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
    {
        sport: "羽毛球",
        time: 45,
        calorie: 250,
        periodLabel: "晚上",
    },
    {
        sport: "乒乓球",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
    {
        sport: "游泳",
        time: 45,
        calorie: 250,
        periodLabel: "晚上",
    },
    {
        sport: "篮球",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
    {
        sport: "羽毛球",
        time: 45,
        calorie: 250,
        periodLabel: "晚上",
    },
    {
        sport: "乒乓球",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
    {
        sport: "游泳",
        time: 45,
        calorie: 250,
        periodLabel: "晚上",
    },
    {
        sport: "篮球",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
    {
        sport: "羽毛球",
        time: 45,
        calorie: 250,
        periodLabel: "晚上",
    },
    {
        sport: "乒乓球",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
    {
        sport: "游泳",
        time: 45,
        calorie: 250,
        periodLabel: "晚上",
    },
    {
        sport: "篮球",
        time: 60,
        calorie: 300,
        periodLabel: "下午",
    },
]);

// 运动记录图表
function showSports() {
    const chartDom = document.getElementById("sportsChart");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);

    const gaugeData = [
        {
            value: 20,
            name: "消耗热量",
            title: {
                offsetCenter: ["0%", "-40%"],
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "-25%"],
                formatter: "{value} kcal",
            },
        },
        {
            value: 40,
            name: "运动时间",
            title: {
                offsetCenter: ["0%", "10%"],
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "25%"],
                formatter: "{value} min",
            },
        },
    ];
    const option = {
        series: [
            {
                type: "gauge",
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false,
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: "#464646",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 40,
                    },
                },
                splitLine: {
                    show: false,
                    distance: 0,
                    length: 10,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    distance: 50,
                },
                data: gaugeData,
                title: {
                    fontSize: 14,
                },
                detail: {
                    width: 50,
                    height: 14,
                    fontSize: 14,
                    color: "inherit",
                    borderColor: "inherit",
                    borderRadius: 20,
                    borderWidth: 1,
                },
            },
        ],
    };
    myChart.setOption(option);
}

// 区间运动图表
function showDatesSports() {
    const chartDom = document.getElementById("sportVisibleChart");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);

    const dateRange = generateDateRange("2024-04-07", "2024-04-14");

    const option = {
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: ["消耗热量/kcal", "运动时长/min"],
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: dateRange,
        },
        yAxis: [
            {
                type: "value",
                name: "消耗热量/kcal",
                position: "left",
            },
            {
                type: "value",
                name: "运动时长/min",
                position: "right",
            },
        ],
        series: [
            {
                name: "消耗热量/kcal",
                type: "line",
                yAxisIndex: 0,
                data: [1200, 1320, 1001, 1034, 900, 2300, 2010],
            },
            {
                name: "运动时长/min",
                type: "line",
                yAxisIndex: 1,
                data: [60, 30, 90, 60, 120, 30, 30],
            },
        ],
    };
    myChart.setOption(option);
}

// 可视化日期记录
const visibleDate = ref([
    formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
    formatDate(new Date()),
]);

// 生成日期区间的函数
function generateDateRange(startDate, endDate) {
    const dateArray = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = addOneDay(currentDate);
    }

    return dateArray;
}

// 添加一天的函数
function addOneDay(date) {
    const [year, month, day] = date.split("-");
    const newDate = new Date(year, month - 1, day);
    newDate.setDate(newDate.getDate() + 1);
    return formatDate(newDate);
}

onMounted(() => {
    showSports();
    showDatesSports();
});

// 运动类别
const sportsType = ref(["走路", "跑步"]);
const added = ref(false);
const sportsNum = ref(60);
const sports = ref([
    {
        value: "走路",
        label: "走路",
        children: [
            {
                value: "慢走",
                label: "慢走",
            },
            {
                value: "散步",
                label: "散步",
            },
        ],
    },
    {
        value: "跑步",
        label: "跑步",
        children: [
            {
                value: "跑步(慢)",
                label: "跑步(慢)",
            },
            {
                value: "跑步(快)",
                label: "跑步(快)",
            },
        ],
    },
]);
const periodLabel = ref("");
const periodLabels = ref([
    {
        value: "早晨",
        label: "早晨",
    },
    {
        value: "中午",
        label: "中午",
    },
    {
        value: "晚上",
        label: "晚上",
    },
]);
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
        .recordMain {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            .sportsRecord {
                display: flex;
                flex-direction: column;
                justify-content: start;
                height: 50vh;
                overflow: scroll;
                overflow-x: none;
                scrollbar-color: #fff #ecf0f3;
                scrollbar-width: thin;
                .sportRecord {
                    flex-shrink: 0;
                    width: 70vh;
                    height: 10vh;
                    background-color: #fff;
                    border-radius: 5vh;
                    margin-top: 1vh;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                    .picture {
                        margin-left: 2vh;
                        img {
                            width: 8vh;
                            height: 8vh;
                            border-radius: 4vh;
                        }
                    }
                    .name {
                        margin-left: 2vh;
                        font-size: 2.6vh;
                        font-weight: bold;
                    }
                    .time {
                        margin-left: 2vh;
                        color: #01111abe;
                    }
                    .heat {
                        margin-left: 2vh;
                        color: #01111abe;
                    }
                    .type {
                        margin-left: 2vh;
                        margin-top: 0.5vh;
                    }
                    .button {
                        position: absolute;
                        right: 1vh;
                        .el-button {
                            border-radius: 2vh;
                            font-weight: bold;
                        }
                        .delete {
                            background-color: #a4c681;
                            color: #fff;
                        }
                    }
                    .addFace {
                        width: 100%;
                        .el-button {
                            margin: 0 20vh;
                            height: 5vh;
                            width: 30vh;
                            border-radius: 2vh;
                            background-color: #a4c681;
                            color: #fff;
                            font-weight: bold;
                        }
                    }
                    .addBack {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        position: relative;
                        .sports {
                            margin-left: 2vh;
                            width: 15vh;
                            .el-cascader {
                                width: 15vh;
                            }
                        }
                        .minute {
                            width: 10vh;
                            margin-left: 2vh;
                            .el-input-number {
                                width: 10vh;
                            }
                        }
                        .periodLabel {
                            margin-left: 2vh;
                            width: 15vh;
                            .el-select {
                                width: 15vh;
                            }
                        }
                        .addButton {
                            position: absolute;
                            right: 2vh;
                        }
                    }
                }
            }
        }
    }
    .sportVisible {
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
}
</style>
