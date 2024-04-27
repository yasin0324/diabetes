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
                        @change="getSportsRecords"
                    ></el-date-picker>
                </div>
            </div>
            <div class="recordMain">
                <div class="sportsVisible">
                    <div
                        id="sportsChart"
                        style="width: 40vh; height: 50vh"
                    ></div>
                </div>
                <div class="sportsRecord">
                    <div
                        class="sportRecord"
                        v-for="(item, index) in sportsRecords"
                        :key="item.id"
                    >
                        <div class="updateRecord" v-if="updateVisible[item.id]">
                            <div class="sports">
                                <el-cascader
                                    v-model="beforeUpdateSport[item.id]"
                                    :options="sports"
                                    :show-all-levels="false"
                                    :placeholder="item.sportDetailVOS[0].name"
                                    filterable
                                    clearable
                                ></el-cascader>
                            </div>
                            <div class="minute">
                                <el-input-number
                                    v-model="beforeUpdateNum[item.id]"
                                    :min="1"
                                    controls-position="right"
                                    step="30"
                                />
                            </div>
                            <div class="periodLabel">
                                <el-select
                                    v-model="beforeUpdateLabel[item.id]"
                                    :placeholder="item.periodLabel"
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
                                <el-button
                                    class="close"
                                    @click="updateVisible[item.id] = false"
                                    >取消</el-button
                                >
                                <el-button
                                    class="confirm"
                                    @click="updateRecords(item)"
                                    >确定</el-button
                                >
                            </div>
                        </div>
                        <div class="showRecord" v-else>
                            <div class="picture">
                                <img :src="item.sportDetailVOS[0].picture" />
                            </div>
                            <div class="name">
                                {{ item.sportDetailVOS[0].name }}
                            </div>
                            <div class="time">
                                {{ item.sportDetailVOS[0].time }}分钟
                            </div>
                            <div class="heat">
                                {{
                                    item.sportDetailVOS[0].consumption *
                                    (item.sportDetailVOS[0].time / 60)
                                }}千卡
                            </div>
                            <div class="type">
                                <el-tag type="success">{{
                                    item.periodLabel
                                }}</el-tag>
                            </div>
                            <div class="button">
                                <el-button
                                    class="update"
                                    @click="openUpdate(item)"
                                    >编辑</el-button
                                >
                                <el-button
                                    class="delete"
                                    @click="deleteRecord(item)"
                                    >删除</el-button
                                >
                            </div>
                        </div>
                    </div>
                    <div class="sportRecord">
                        <div class="addFace" v-if="!added">
                            <el-button @click="openAdd">添 加 记 录</el-button>
                        </div>
                        <div class="addBack" v-else>
                            <div class="sports">
                                <el-cascader
                                    v-model="selectSport"
                                    :options="sports"
                                    :show-all-levels="false"
                                    placeholder="选择运动"
                                    filterable
                                    clearable
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
                                <el-button class="diySport" @click="openDIY"
                                    >自定义运动</el-button
                                >
                                <el-button class="close" @click="added = false"
                                    >取消</el-button
                                >
                                <el-button
                                    class="confirm"
                                    @click="addSportsRecord"
                                    >确定</el-button
                                >
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
                        @change="getRecentlySports"
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
        <el-dialog
            align-center
            class="DIYsport"
            v-model="DIYvisible"
            title="添加自定义运动"
            width="400"
        >
            <el-form
                class="addSportForm"
                :model="sportInfo"
                label-position="right"
                label-width="auto"
                :rules="sportRules"
                ref="sportForm"
                ><el-form-item label="运动名称" prop="name"
                    ><el-input
                        v-model="sportInfo.name"
                        placeholder="请输入运动名称"
                    ></el-input
                ></el-form-item>
                <el-form-item label="运动类型" prop="type">
                    <el-input
                        v-model="sportInfo.type"
                        placeholder="请输入运动类别"
                    ></el-input>
                </el-form-item>
                <el-form-item label="运动消耗" prop="consumption">
                    <el-input
                        v-model="sportInfo.consumption"
                        placeholder="请输入运动消耗 （60分钟）/千卡"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="运动图片"
                    prop="picture"
                    class="picture-item"
                >
                    <el-upload
                        action="/api/common/upload"
                        list-type="picture-card"
                        :file-list="sportFileLists"
                        :on-success="(file) => handleSuccess(file)"
                        :headers="headers"
                    >
                        <el-icon class="food-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    ><el-button
                        style="
                            margin: 0 auto;
                            width: 80%;
                            background-color: #f0f2fd;
                            color: #70708c;
                            font-weight: bold;
                        "
                        @click="submitAddForm"
                        >添 加 运 动</el-button
                    ></el-form-item
                ></el-form
            >
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { getToken } from "../../../util/auth.js";
import {
    setSportsRecord,
    updateSportsRecord,
    getSportsRecord,
    delSportsRecord,
    getSportsInfo,
    getSportsList,
    getSportsByName,
    getAllSportsType,
    addSportInfo,
} from "../../../api/healthRecord";
import { ElMessage } from "element-plus";
import { get } from "jquery";
import { all } from "axios";

const token = getToken();
const headers = {
    token: token,
};

// 日期格式化
// YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}
const recordDate = ref(formatDate(new Date()));

// 运动数据
const sportsData = ref([]);
const sportsType = ref([]);
const sports = ref([]);
const selectSport = ref();
const allHeat = ref(0);
const allTime = ref(0);
// 获取运动类型列表
const getSportsType = () => {
    getAllSportsType()
        .then((res) => {
            sportsType.value = res.data;
            sportsType.value.map((item) => {
                getSportsList(item)
                    .then((res) => {
                        res.data.map((item) => {
                            sportsData.value.push(item);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        })
        .catch((err) => {
            console.log(err);
        });
    setTimeout(() => {
        let tempSports = sportsData.value.reduce((acc, cur) => {
            // 查找当前运动类型是否已经存在于结果数组中
            let type = acc.find((item) => item.value === cur.type);
            if (!type) {
                // 如果不存在，则新建一个类型对象，并添加到结果数组中
                type = {
                    value: cur.type,
                    label: cur.type,
                    children: [],
                };
                acc.push(type);
            }
            // 将当前运动添加到对应类型的 children 数组中
            type.children.push({
                value: cur.id,
                label: cur.name,
            });
            return acc;
        }, []);
        console.log(tempSports);
        sports.value = tempSports;
    }, 500);
};
// 获取运动记录并处理
const sportsRecords = ref([]);
const getSportsRecords = () => {
    allHeat.value = 0;
    allTime.value = 0;
    getSportsRecord(recordDate.value, recordDate.value)
        .then((res) => {
            sportsRecords.value = res.data.sportRecordVOList[0];
            // 给所有的updateVisible赋值
            sportsRecords.value.map((item) => {
                updateVisible.value[item.id] = false;
                beforeUpdateSport.value[item.id] = [
                    item.sportDetailVOS[0].name,
                    item.sportDetailVOS[0].id,
                ];
                beforeUpdateNum.value[item.id] = item.sportDetailVOS[0].time;
                beforeUpdateLabel.value[item.id] = item.periodLabel;
                allHeat.value +=
                    item.sportDetailVOS[0].consumption *
                    (item.sportDetailVOS[0].time / 60);
                allTime.value += item.sportDetailVOS[0].time;
            });
            showSports();
        })
        .catch((err) => {
            console.log(err);
        });
};
// 添加运动记录
const openAdd = () => {
    added.value = true;
    selectSport.value = [];
    sportsNum.value = 60;
    periodLabel.value = "";
};
const addSportsRecord = () => {
    let data = {
        periodLabel: periodLabel.value,
        recordTime: `${recordDate.value} 12:00:00`,
        remark: "",
        sportDetailAndRecords: [
            {
                sportId: selectSport.value[1],
                time: sportsNum.value,
            },
        ],
    };
    setSportsRecord(data)
        .then((res) => {
            getSportsRecords();
            added.value = false;
        })
        .catch((err) => {
            console.log(err);
        });
};
// 删除运动记录
const deleteRecord = (record) => {
    delSportsRecord(record.id)
        .then((res) => {
            console.log(res);
            getSportsRecords();
        })
        .catch((err) => {
            console.log(err);
        });
};
// 修改运动记录
const updateVisible = ref([]);
const beforeUpdateSport = ref([]);
const beforeUpdateNum = ref([]);
const beforeUpdateLabel = ref([]);
const openUpdate = (item) => {
    updateVisible.value[item.id] = true;
};
const updateRecords = (record, index) => {
    console.log(record.sportDetailVOS[0].id);
    let data = {
        id: record.id,
        periodLabel: beforeUpdateLabel.value[record.id],
        addSportDetailAndRecords: [
            {
                sportId: beforeUpdateSport.value[record.id][1],
                time: beforeUpdateNum.value[record.id],
            },
        ],
    };
    let data2 = {
        id: record.id,
        removeSportDetailAndRecords: [record.sportDetailVOS[0].id],
    };
    updateSportsRecord(data2)
        .then((res) => {
            updateSportsRecord(data)
                .then((res) => {
                    getSportsRecords();
                    updateVisible.value[record.id] = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};
// 运动记录图表
function showSports() {
    const chartDom = document.getElementById("sportsChart");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);

    const gaugeData = [
        {
            value: (allHeat.value / 500) * 100,
            name: "消耗热量",
            title: {
                offsetCenter: ["0%", "-45%"],
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "-25%"],
                formatter: `${allHeat.value} kcal`,
            },
        },
        {
            value: (allTime.value / 90) * 100,
            name: "运动时间",
            title: {
                offsetCenter: ["0%", "5%"],
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "25%"],
                formatter: `${allTime.value} min`,
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
                        borderWidth: 2,
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
                    width: 60,
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
function showDatesSports(totalConsumptionAndTime) {
    const chartDom = document.getElementById("sportVisibleChart");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);

    const dateRange = totalConsumptionAndTime.map((item) => item.date);
    const totalConsumptionData = totalConsumptionAndTime.map(
        (item) => item.totalConsumption
    );
    const totalTimeData = totalConsumptionAndTime.map((item) => item.totalTime);

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
                data: totalConsumptionData,
            },
            {
                name: "运动时长/min",
                type: "line",
                yAxisIndex: 1,
                data: totalTimeData,
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
// 获取并计算区间日期单日总热量及运动时间
const recentlyData = ref({});
const getRecentlySports = () => {
    getSportsRecord(visibleDate.value[0], visibleDate.value[1])
        .then((res) => {
            recentlyData.value = res.data;
            console.log(recentlyData.value.localDateList);
            let totalConsumptionAndTime = recentlyData.value.localDateList.map(
                (date, index) => {
                    let totalConsumption = 0;
                    let totalTime = 0;

                    recentlyData.value.sportRecordVOList[index].forEach(
                        (record) => {
                            record.sportDetailVOS.forEach((detail) => {
                                totalConsumption +=
                                    detail.consumption * (detail.time / 60);
                                totalTime += detail.time;
                            });
                        }
                    );

                    return {
                        date: date,
                        totalConsumption: totalConsumption,
                        totalTime: totalTime,
                    };
                }
            );
            showDatesSports(totalConsumptionAndTime);
        })
        .catch((err) => {
            console.log(err);
        });
};

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
    getRecentlySports();
    getSportsType();
    getSportsRecords();
});

// 运动类别
const added = ref(false);
const sportsNum = ref(60);
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

// 打开自定义运动窗口
const DIYvisible = ref(false);
const openDIY = () => {
    DIYvisible.value = true;
    sportInfo.value = {
        name: "",
        type: "",
        picture: "",
        consumption: "",
    };
    imgUrl.value = "";
    sportFileLists.value = [];
};
const sportInfo = ref({
    name: "",
    type: "",
    picture: "",
    consumption: "",
});
// 表单校验规则
const sportRules = {
    name: [{ required: true, message: "请输入运动名称", trigger: "blur" }],
    type: [{ required: true, message: "请输入运动类别", trigger: "blur" }],
    picture: [{ required: true, message: "请上传运动图片", trigger: "blur" }],
    consumption: [
        {
            required: true,
            message: "请填写运动消耗",
            trigger: "blur",
        },
    ],
};
// 运动图片上传
const sportFileLists = ref([]);
const imgUrl = ref("");
const handleSuccess = (file) => {
    imgUrl.value = file.data;
    sportInfo.value.picture = file.data;
};
// 提交运动表单
const sportForm = ref(null);
const submitAddForm = () => {
    sportForm.value.validate((valid) => {
        if (valid) {
            addNewSport();
            DIYvisible.value = false;
        } else {
            return false;
        }
    });
};
// 新增运动
const addNewSport = () => {
    let data = {
        name: sportInfo.value.name,
        type: sportInfo.value.type,
        picture: sportInfo.value.picture,
        consumption: sportInfo.value.consumption,
    };
    addSportInfo(data).then((res) => {
        if (res.code === 200) {
            ElMessage.warning("提交成功，请等待审核");
        }
    });
};
// 运动图片预览
const pictureDialogVisible = ref(false);
const dialogImageUrl = ref("");
const handlePictureCardPreview = async (file) => {
    dialogImageUrl.value = file.url;
    pictureDialogVisible.value = true;
};
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
                height: 48vh;
                overflow: scroll;
                scrollbar-color: #fff #ecf0f3;
                scrollbar-width: thin;
                overflow-x: hidden;
                .sportRecord {
                    flex-shrink: 0;
                    width: 85vh;
                    height: 10vh;
                    background-color: #fff;
                    border-radius: 5vh;
                    margin-top: 1vh;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                    .updateRecord {
                        width: 100%;
                        height: 10vh;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        position: relative;
                        .sports {
                            margin-left: 2vh;
                            width: 15vh;
                            .el-cascader {
                                width: 15vh;
                            }
                            :deep(.el-input) {
                                .el-input__wrapper {
                                    border-radius: 2vh;
                                }
                            }
                        }
                        .minute {
                            width: 12vh;
                            margin-left: 2vh;
                            :deep(.el-input-number) {
                                width: 12vh;
                                .el-input-number__increase {
                                    border-top-right-radius: 2vh;
                                }
                                .el-input-number__decrease {
                                    border-bottom-right-radius: 2vh;
                                }
                            }
                            :deep(.el-input) {
                                .el-input__wrapper {
                                    border-radius: 2vh;
                                }
                            }
                        }
                        .periodLabel {
                            margin-left: 2vh;
                            width: 15vh;
                            :deep(.el-select) {
                                width: 15vh;
                                .el-select__wrapper {
                                    border-radius: 2vh;
                                }
                            }
                        }
                        .addButton {
                            position: absolute;
                            right: 1vh;
                            .el-button {
                                border-radius: 2vh;
                                font-weight: bold;
                            }
                            .confirm {
                                background-color: #a4c681;
                                color: #fff;
                            }
                        }
                    }
                    .showRecord {
                        flex-shrink: 0;
                        width: 80vh;
                        height: 10vh;
                        background-color: #fff;
                        border-radius: 5vh;
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
                                background-color: #e26b6b;
                                color: #fff;
                            }
                        }
                    }
                    .addFace {
                        width: 100%;
                        .el-button {
                            margin: 0 25vh;
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
                        height: 10vh;
                        align-items: center;
                        display: flex;
                        flex-direction: row;
                        position: relative;
                        .sports {
                            margin-left: 2vh;
                            width: 15vh;
                            .el-cascader {
                                width: 15vh;
                            }
                            :deep(.el-input) {
                                .el-input__wrapper {
                                    border-radius: 2vh;
                                }
                            }
                        }
                        .minute {
                            width: 12vh;
                            margin-left: 2vh;
                            :deep(.el-input-number) {
                                width: 12vh;
                                .el-input-number__increase {
                                    border-top-right-radius: 2vh;
                                }
                                .el-input-number__decrease {
                                    border-bottom-right-radius: 2vh;
                                }
                            }
                            :deep(.el-input) {
                                .el-input__wrapper {
                                    border-radius: 2vh;
                                }
                            }
                        }
                        .periodLabel {
                            margin-left: 2vh;
                            width: 15vh;
                            :deep(.el-select) {
                                width: 15vh;
                                .el-select__wrapper {
                                    border-radius: 2vh;
                                }
                            }
                        }
                        .addButton {
                            position: absolute;
                            right: 1vh;
                            .el-button {
                                border-radius: 2vh;
                                font-weight: bold;
                            }
                            .confirm {
                                background-color: #a4c681;
                                color: #fff;
                            }
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
:deep(.el-input__wrapper) {
    border-radius: 2vh;
}
:deep(.el-button) {
    border-radius: 2vh;
}
.picture-item {
    height: 19vh;
    overflow: hidden;
}
:deep(.el-dialog) {
    --el-dialog-border-radius: 3vh;
}
</style>
