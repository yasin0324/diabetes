<template>
    <div class="main">
        <div class="record">
            <div class="recordHeader">
                <div class="title"><h1>饮食记录</h1></div>
                <div class="datePicker">
                    <el-date-picker
                        v-model="recordDate"
                        type="date"
                        placeholder="选择日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    ></el-date-picker>
                </div>
            </div>
            <div class="recordMain">
                <div class="recordMainTop">
                    <div class="heat">
                        <el-progress
                            type="circle"
                            :percentage="(heat / recommendHeat) * 100"
                            width="250"
                            stroke-width="20"
                            color="#a3c57d"
                        >
                            <div
                                style="
                                    font-size: 1.8vh;
                                    font-weight: bold;
                                    margin-bottom: 1vh;
                                "
                            >
                                还可以吃
                            </div>
                            <div style="font-size: 3vh; font-weight: bold">
                                {{ recommendHeat - heat }}
                            </div>
                            <div
                                style="
                                    font-size: 1.2vh;
                                    color: #8f8f8f;
                                    margin-top: 1vh;
                                "
                            >
                                推荐热量 {{ recommendHeat }}kcal
                            </div>
                        </el-progress>
                    </div>
                    <div class="other">
                        <div class="otherLeft">
                            <div class="title">碳水化合物</div>
                            <div class="title">蛋白质</div>
                            <div class="title">脂肪</div>
                        </div>
                        <div class="otherRight">
                            <div class="carbohydrate">
                                <el-progress
                                    class="progress"
                                    :text-inside="true"
                                    :stroke-width="24"
                                    style="max-width: 90%"
                                    color="#a0cfff"
                                    :percentage="
                                        Math.round(
                                            (carbohydrate /
                                                recommendCarbohydrate) *
                                                100
                                        )
                                    "
                                    ><span style="color: #3d4a51"
                                        >{{
                                            Math.round(
                                                (carbohydrate /
                                                    recommendCarbohydrate) *
                                                    100
                                            )
                                        }}
                                        / {{ recommendCarbohydrate }}克</span
                                    ></el-progress
                                >
                            </div>
                            <div class="protein">
                                <el-progress
                                    class="progress"
                                    :text-inside="true"
                                    :stroke-width="24"
                                    style="max-width: 90%"
                                    :percentage="
                                        Math.round(
                                            (protein / recommendProtein) * 100
                                        )
                                    "
                                    color="#f3d19e"
                                    ><span style="color: #3d4a51"
                                        >{{
                                            Math.round(
                                                (protein / recommendProtein) *
                                                    100
                                            )
                                        }}
                                        / {{ recommendProtein }}克</span
                                    ></el-progress
                                >
                            </div>
                            <div class="fat">
                                <el-progress
                                    class="progress"
                                    :text-inside="true"
                                    :stroke-width="24"
                                    style="max-width: 90%"
                                    :percentage="
                                        Math.round((fat / recommendFat) * 100)
                                    "
                                    color="#b3e19d"
                                    ><span style="color: #3d4a51"
                                        >{{
                                            Math.round(
                                                (fat / recommendFat) * 100
                                            )
                                        }}
                                        / {{ recommendFat }}克</span
                                    ></el-progress
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recordMainOther">
                    <div class="breakfast">
                        <div class="left">
                            <div class="chart">
                                <div
                                    id="breakfastChart"
                                    style="height: 28vh; width: 30vh"
                                ></div>
                            </div>
                            <div class="calorie">
                                <div class="num">155</div>
                                <div class="unit">千卡</div>
                            </div>
                        </div>
                        <div class="content">
                            <el-table
                                height="24vh"
                                class="foodlist"
                                :data="breakfastData"
                                stripe
                            >
                                <el-table-column
                                    fixed="left"
                                    label="食物"
                                    prop="food"
                                    width="110"
                                    ><template #default
                                        ><div>
                                            <img
                                                src="../../../common/image/face.png"
                                                style="
                                                    width: 5vh;
                                                    height: 5vh;
                                                    border-radius: 50%;
                                                "
                                            /></div></template
                                ></el-table-column>
                                <el-table-column> </el-table-column>
                                <el-table-column
                                    label="重量"
                                    prop="weight"
                                    width="100"
                                ></el-table-column>
                                <el-table-column
                                    label="蛋白质"
                                    prop="protein"
                                    width="100"
                                ></el-table-column>
                                <el-table-column
                                    label="脂肪"
                                    prop="fat"
                                    width="100"
                                ></el-table-column>
                                <el-table-column
                                    label="碳水化合物"
                                    prop="carbohydrate"
                                    width="100"
                                ></el-table-column>
                                <el-table-column
                                    label="热量"
                                    prop="heat"
                                    width="100"
                                ></el-table-column>
                                <el-table-column
                                    label="GI(升糖指数)"
                                    prop="gi"
                                    width="100"
                                ></el-table-column>
                                <el-table-column
                                    label="GL(升糖负荷)"
                                    prop="gl"
                                    width="100"
                                ></el-table-column>
                                <el-table-column
                                    fixed="right"
                                    width="96"
                                    label="编辑"
                                    ><template #default>
                                        <el-button
                                            link
                                            size="small"
                                            type="primary"
                                            >编辑</el-button
                                        >
                                        <el-button
                                            link
                                            size="small"
                                            type="danger"
                                        >
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button class="addButton" type="success" round>
                                记 录 饮 食
                            </el-button>
                        </div>
                    </div>
                    <div class="lunch"></div>
                    <div class="dinner"></div>
                    <div class="moreEat"></div>
                </div>
            </div>
        </div>
        <div class="guidance">
            <div class="guidanceHeader">
                <div class="title"><h1>饮食指导</h1></div>
            </div>
        </div>
        <div class="dietary">
            <div class="dietaryHeader">
                <div class="title"><h1>推荐食谱</h1></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

// 日期选择
const recordDate = ref(formatDate(new Date()));

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

// 热量
const heat = ref(788);
// 推荐摄入热量
const recommendHeat = ref(2000);
// 碳水化合物
const carbohydrate = ref(79);
// 推荐摄入碳水
const recommendCarbohydrate = ref(297);
// 蛋白质
const protein = ref(6);
// 推荐摄入蛋白质
const recommendProtein = ref(85);
// 脂肪
const fat = ref(1);
// 推荐摄入脂肪
const recommendFat = ref(66);

// 饼图
function drawPieChart(id, data, time) {
    const chartDom = document.getElementById(id);
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: time,
            left: "center",
        },
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}克({d}%)",
        },
        legend: {
            orient: "horizontal",
            left: "center",
            bottom: "bottom",
        },
        series: [
            {
                type: "pie",
                radius: "80%",
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: false,
                    },
                },
                labelLine: {
                    show: false,
                },
                data: data,
            },
        ],
    };
    myChart.setOption(option);
}

const breakfastData = ref([
    {
        food: "苹果",
        weight: "100g",
        protein: "0.3g",
        fat: "0.4g",
        carbohydrate: "14g",
        heat: "52kcal",
        gi: "38",
        gl: "5",
    },
    {
        food: "香蕉",
        weight: "100g",
        protein: "1.3g",
        fat: "0.3g",
        carbohydrate: "22g",
        heat: "89kcal",
        gi: "51",
        gl: "11",
    },
    {
        food: "鸡蛋",
        weight: "100g",
        protein: "13g",
        fat: "11g",
        carbohydrate: "1g",
        heat: "155kcal",
        gi: "0",
        gl: "0",
    },
    {
        food: "牛奶",
        weight: "100g",
        protein: "3.3g",
        fat: "3.6g",
        carbohydrate: "4.8g",
        heat: "66kcal",
        gi: "27",
        gl: "1",
    },
    {
        food: "面包",
        weight: "100g",
        protein: "8.3g",
        fat: "1.1g",
        carbohydrate: "50g",
        heat: "250kcal",
        gi: "70",
        gl: "35",
    },
    {
        food: "酸奶",
        weight: "100g",
        protein: "4.3g",
        fat: "3.6g",
        carbohydrate: "4.8g",
        heat: "66kcal",
        gi: "27",
        gl: "1",
    },
]);

onMounted(() => {
    drawPieChart(
        "breakfastChart",
        [
            { value: 4.6, name: "蛋白质" },
            { value: 1.0, name: "脂肪" },
            { value: 51.3, name: "碳水化合物" },
        ],
        "早餐"
    );
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
        .recordMain {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 5vh;
            padding-bottom: 5vh;
            .recordMainTop {
                width: 80%;
                height: 30vh;
                background-color: #fff;
                border-radius: 5vh;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                .heat {
                    margin-left: 5vh;
                    width: 30%;
                }
                .other {
                    width: 70%;
                    height: 20vh;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .otherLeft {
                        width: 25%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: flex-end;
                        .title {
                            height: 4vh;
                            line-height: 4vh;
                            font-size: 2vh;
                            font-weight: bold;
                            color: #606266;
                        }
                    }
                    .otherRight {
                        width: 70%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                    }
                }
            }
            .recordMainOther {
                width: 80%;
                .breakfast,
                .lunch,
                .dinner,
                .moreEat {
                    width: 100%;
                    height: 30vh;
                    background-color: #fff;
                    border-radius: 5vh;
                    margin-top: 2vh;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .left {
                        width: 30vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .calorie {
                            display: flex;
                            flex-direction: row;
                            align-items: end;
                            .num {
                                font-size: 2vh;
                                font-weight: bold;
                            }
                            .unit {
                                margin-left: 0.5vh;
                                font-size: 1.5vh;
                                color: #8f8f8f;
                            }
                        }
                    }
                    .content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .foodlist {
                            border-top-right-radius: 4vh;
                            margin-top: 1vh;
                            width: 70vh;
                        }
                        .addButton {
                            margin-top: 1vh;
                            width: 60vh;
                        }
                    }
                }
            }
        }
    }
    .guidance {
        width: 130vh;
        margin: 0 auto 2vh;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .guidanceHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1vh solid #a0a5a8;
            padding-left: 3vh;
            .title {
                color: #01111abe;
            }
        }
    }
    .dietary {
        width: 130vh;
        margin: 0 auto 2vh;
        border-radius: 5vh;
        background-color: #ecf0f3;
        box-shadow: 1vh 1vh 1vh #d1d9e6;
        .dietaryHeader {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1vh solid #a0a5a8;
            padding-left: 3vh;
            .title {
                color: #01111abe;
            }
        }
    }
}
</style>
