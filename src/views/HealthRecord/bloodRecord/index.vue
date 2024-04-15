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
                <div class="title"><h1>血糖图表</h1></div>
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
                    <el-radio-group
                        v-model="analyseDate"
                        @change="changeRecently"
                    >
                        <el-radio value="7">近7天</el-radio>
                        <el-radio value="15">近15天</el-radio>
                        <el-radio value="30">近30天</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="analyseMain" style="height: 50vh">
                <div id="chart1"></div>
                <div id="chart2">
                    <div class="oneBlood">
                        <div class="BloodHeader">空腹血糖</div>
                        <div class="BloodMain">
                            <div class="left">
                                <div class="one">
                                    <div class="top">
                                        {{ stats["空腹"].total }}次
                                    </div>
                                    <div class="end">总测量次数</div>
                                </div>
                                <div class="one">
                                    <div class="top">
                                        {{
                                            Math.round(
                                                (stats["空腹"].normal /
                                                    stats["空腹"].total) *
                                                    100
                                            )
                                        }}%
                                    </div>
                                    <div class="end">达标率</div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="one">
                                    <div class="top">
                                        {{ stats["空腹"].high }}次
                                    </div>
                                    <div class="end">空腹血糖偏高</div>
                                </div>
                                <div class="one">
                                    <div class="top">
                                        {{
                                            Math.round(
                                                (stats["空腹"].high /
                                                    stats["空腹"].total) *
                                                    100
                                            )
                                        }}%
                                    </div>
                                    <div class="end">占比</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="twoBlood">
                        <div class="BloodHeader">餐前血糖</div>
                        <div class="BloodMain">
                            <div class="left">
                                <div class="one">
                                    <div class="top">
                                        {{ beforeMeal.total }}次
                                    </div>
                                    <div class="end">总测量次数</div>
                                </div>
                                <div class="one">
                                    <div class="top">
                                        {{
                                            Math.round(
                                                (beforeMeal.normal /
                                                    beforeMeal.total) *
                                                    100
                                            )
                                        }}%
                                    </div>
                                    <div class="end">达标率</div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="one">
                                    <div class="top">
                                        {{ beforeMeal.high }}次
                                    </div>
                                    <div class="end">餐前血糖偏高</div>
                                </div>
                                <div class="one">
                                    <div class="top">
                                        {{
                                            Math.round(
                                                (beforeMeal.high /
                                                    beforeMeal.total) *
                                                    100
                                            )
                                        }}%
                                    </div>
                                    <div class="end">占比</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="threeBlood">
                        <div class="BloodHeader">餐后血糖</div>
                        <div class="BloodMain">
                            <div class="left">
                                <div class="one">
                                    <div class="top">
                                        {{ afterMeal.total }}次
                                    </div>
                                    <div class="end">总测量次数</div>
                                </div>
                                <div class="one">
                                    <div class="top">
                                        {{
                                            Math.round(
                                                (afterMeal.normal /
                                                    afterMeal.total) *
                                                    100
                                            )
                                        }}%
                                    </div>
                                    <div class="end">达标率</div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="one">
                                    <div class="top">
                                        {{ afterMeal.high }}次
                                    </div>
                                    <div class="end">餐后血糖偏高</div>
                                </div>
                                <div class="one">
                                    <div class="top">
                                        {{
                                            Math.round(
                                                (afterMeal.high /
                                                    afterMeal.total) *
                                                    100
                                            )
                                        }}%
                                    </div>
                                    <div class="end">占比</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="chart3"></div>
            </div>
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
                inRange: {
                    color: ["#fecc59", "#56e1b8", "#f6756e"],
                },
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
            endValue: 10,
            bottom: 10,
            zoomLock: true,
            handleSize: 0,
            borderColor: "#4cb5ab",
            fillerColor: "#4cb5ab",
            height: 10,
            maxValueSpan: 10,
            minValueSpan: 10,
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
const analyseDate = ref("7");

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

// 初始化统计结果
const stats = ref({
    空腹: { total: 0, normal: 0, high: 0, low: 0 },
    午餐前: { total: 0, normal: 0, high: 0, low: 0 },
    晚餐前: { total: 0, normal: 0, high: 0, low: 0 },
    早餐后: { total: 0, normal: 0, high: 0, low: 0 },
    午餐后: { total: 0, normal: 0, high: 0, low: 0 },
    晚餐后: { total: 0, normal: 0, high: 0, low: 0 },
    睡前: { total: 0, normal: 0, high: 0, low: 0 },
    夜间: { total: 0, normal: 0, high: 0, low: 0 },
});
// 餐前血糖记录统计
const beforeMeal = ref({
    total: 0,
    normal: 0,
    high: 0,
    normalRate: 0,
});
// 餐后血糖记录统计
const afterMeal = ref({
    total: 0,
    normal: 0,
    high: 0,
    normalRate: 0,
});
// 所有血糖记录统计
const allTotal = ref({
    total: 0,
    normal: 0,
    high: 0,
    low: 0,
    normalRate: 0,
});
// 血糖波动统计
const fluctuation = ref({
    早餐: { low: 0, normal: 0, high: 0 },
    午餐: { low: 0, normal: 0, high: 0 },
    晚餐: { low: 0, normal: 0, high: 0 },
});
// 数据初始化
function resetData() {
    stats.value = {
        空腹: { total: 0, normal: 0, high: 0, low: 0 },
        午餐前: { total: 0, normal: 0, high: 0, low: 0 },
        晚餐前: { total: 0, normal: 0, high: 0, low: 0 },
        早餐后: { total: 0, normal: 0, high: 0, low: 0 },
        午餐后: { total: 0, normal: 0, high: 0, low: 0 },
        晚餐后: { total: 0, normal: 0, high: 0, low: 0 },
        睡前: { total: 0, normal: 0, high: 0, low: 0 },
        夜间: { total: 0, normal: 0, high: 0, low: 0 },
    };
    beforeMeal.value = { total: 0, normal: 0, high: 0, normalRate: 0 };
    afterMeal.value = { total: 0, normal: 0, high: 0, normalRate: 0 };
    allTotal.value = { total: 0, normal: 0, high: 0, low: 0, normalRate: 0 };
    fluctuation.value = {
        早餐: { low: 0, normal: 0, high: 0 },
        午餐: { low: 0, normal: 0, high: 0 },
        晚餐: { low: 0, normal: 0, high: 0 },
    };
}
// 获取近些天数据
const getRecordRecently = (days) => {
    const begin = formatDate(
        new Date(new Date().setDate(new Date().getDate() - days))
    );
    const end = formatDate(new Date());
    BloodRecordList(begin, end)
        .then((res) => {
            const data = res.data;
            const ranges = {
                空腹: [4.4, 6.1],
                午餐前: [5.0, 7.8],
                晚餐前: [5.0, 7.8],
                早餐后: [5.0, 9.4],
                午餐后: [5.0, 9.4],
                晚餐后: [5.0, 9.4],
                睡前: [4.4, 8.3],
                夜间: [3.9, 6.1],
            };
            resetData();
            // 记录血糖次数统计
            for (let day of data.bloodGlucoseRecordsList) {
                for (let record of day) {
                    let period = record.periodLabel;
                    let level = record.glucoseLevel;
                    stats.value[period].total++;
                    if (level < ranges[period][0]) {
                        stats.value[period].low++;
                    } else if (level > ranges[period][1]) {
                        stats.value[period].high++;
                    } else {
                        stats.value[period].normal++;
                    }
                }
            }
            // 统计餐前血糖记录总次数，正常次数，偏高次数
            // 统计餐后血糖记录总次数，正常次数，偏高次数
            for (let period in stats.value) {
                if (period === "午餐前" || period === "晚餐前") {
                    beforeMeal.value.total += stats.value[period].total;
                    beforeMeal.value.normal += stats.value[period].normal;
                    beforeMeal.value.high += stats.value[period].high;
                } else if (
                    period === "早餐后" ||
                    period === "午餐后" ||
                    period === "晚餐后"
                ) {
                    afterMeal.value.total += stats.value[period].total;
                    afterMeal.value.normal += stats.value[period].normal;
                    afterMeal.value.high += stats.value[period].high;
                }
            }
            // 统计血糖记录总次数，正常次数，偏高次数，偏低次数，达标占比（正常次数/总次数），不达标占比（1-达标占比）
            for (let period in stats.value) {
                allTotal.value.total += stats.value[period].total;
                allTotal.value.normal += stats.value[period].normal;
                allTotal.value.high += stats.value[period].high;
                allTotal.value.low += stats.value[period].low;
            }
            allTotal.value.normalRate = (
                (allTotal.value.normal / allTotal.value.total) *
                100
            ).toFixed(0);
            // 计算同一天的血糖餐前餐后血糖波动，及餐前餐后血糖差值（早餐后-空腹，午餐后-午餐前，晚餐后-晚餐前），统计所选日期区间中 早餐、午餐、晚餐前后血糖差值在0-2.2之前的次数，在2.3-4.4之间的次数，差值>=4.5的次数
            for (let day of data.bloodGlucoseRecordsList) {
                let beforeMeal = day.find(
                    (record) => record.periodLabel === "空腹"
                );
                let afterMeal = day.find(
                    (record) => record.periodLabel === "早餐后"
                );
                if (beforeMeal && afterMeal) {
                    let diff = afterMeal.glucoseLevel - beforeMeal.glucoseLevel;
                    if (0 <= diff < 2.3) {
                        fluctuation.value["早餐"].low++;
                    } else if (diff < 4.5) {
                        fluctuation.value["早餐"].normal++;
                    } else {
                        fluctuation.value["早餐"].high++;
                    }
                }
                beforeMeal = day.find(
                    (record) => record.periodLabel === "午餐前"
                );
                afterMeal = day.find(
                    (record) => record.periodLabel === "午餐后"
                );
                if (beforeMeal && afterMeal) {
                    let diff = afterMeal.glucoseLevel - beforeMeal.glucoseLevel;
                    if (diff < 2.3) {
                        fluctuation.value["午餐"].low++;
                    } else if (diff < 4.5) {
                        fluctuation.value["午餐"].normal++;
                    } else {
                        fluctuation.value["午餐"].high++;
                    }
                }
                beforeMeal = day.find(
                    (record) => record.periodLabel === "晚餐前"
                );
                afterMeal = day.find(
                    (record) => record.periodLabel === "晚餐后"
                );
                if (beforeMeal && afterMeal) {
                    let diff = afterMeal.glucoseLevel - beforeMeal.glucoseLevel;
                    if (diff < 2.3) {
                        fluctuation.value["晚餐"].low++;
                    } else if (diff < 4.5) {
                        fluctuation.value["晚餐"].normal++;
                    } else {
                        fluctuation.value["晚餐"].high++;
                    }
                }
            }
            showChart1();
            showChart3();
        })
        .catch((err) => {
            console.log(err);
        });
};
// 切换近些天数据
const changeRecently = () => {
    getRecordRecently(parseInt(analyseDate.value));
};
// 血糖统计图表
function showChart1() {
    const chartDom = document.getElementById("chart1");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}次 ({d}%)",
        },
        title: {
            text: `${allTotal.value.total}`,
            subtext: "总次数",
            left: "center",
            top: "middle",
            textStyle: {
                color: "#009688",
                fontSize: 40,
                fontWeight: "bold",
            },
        },
        series: [
            {
                type: "pie",
                radius: ["50%", "90%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    position: "inside",
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: allTotal.value.normal, name: "正常" },
                    { value: allTotal.value.high, name: "偏高" },
                    { value: allTotal.value.low, name: "偏低" },
                ],
            },
        ],
    };
    myChart.setOption(option);
}
function showChart3() {
    console.log(fluctuation.value);
    const chartDom = document.getElementById("chart3");
    chartDom?.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: "餐前餐后血糖波动",
            subtext: "每餐餐前餐后差值不宜超过：2.2mmol/L",
            left: "center",
        },
        grid: {
            bottom: 40,
        },
        tooltip: {
            trigger: "item",
            formatter: "{a}<br>{b}：{c}次",
        },
        legend: {
            data: ["早餐", "午餐", "晚餐"],
            orient: "vertical",
            top: "middle",
            right: 0,
        },
        xAxis: {
            type: "category",
            data: ["差值0-2.2", "差值2.3-4.4", "差值≥4.5"],
        },
        yAxis: {
            type: "value",
            name: "次数",
        },
        series: [
            {
                type: "bar",
                name: "早餐",
                data: [
                    fluctuation.value["早餐"].low,
                    fluctuation.value["早餐"].normal,
                    fluctuation.value["早餐"].high,
                ],
                itemStyle: {
                    borderRadius: [20, 20, 0, 0],
                },
                label: {
                    show: true,
                    position: "top",
                },
            },
            {
                type: "bar",
                name: "午餐",
                data: [
                    fluctuation.value["午餐"].low,
                    fluctuation.value["午餐"].normal,
                    fluctuation.value["午餐"].high,
                ],
                itemStyle: {
                    borderRadius: [20, 20, 0, 0],
                },
                label: {
                    show: true,
                    position: "top",
                },
            },
            {
                type: "bar",
                name: "晚餐",
                data: [
                    fluctuation.value["晚餐"].low,
                    fluctuation.value["晚餐"].normal,
                    fluctuation.value["晚餐"].high,
                ],
                itemStyle: {
                    borderRadius: [20, 20, 0, 0],
                },
                label: {
                    show: true,
                    position: "top",
                },
            },
        ],
    };
    myChart.setOption(option);
}

onMounted(() => {
    getRecordOne();
    getRecordMore();
    changeRecently();
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
                height: 35vh;
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
                        margin-top: 3vh;
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
        .analyseMain {
            display: flex;
            flex-direction: row;
            #chart1 {
                height: 50vh;
                width: 40vh;
            }
            #chart2 {
                height: 45vh;
                width: 40vh;
                margin: auto 0;
                background: #fff;
                border-radius: 5vh;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .oneBlood,
                .twoBlood,
                .threeBlood {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    height: 13vh;
                    .BloodHeader {
                        padding-left: 1vh;
                        font-size: 2.5vh;
                        font-weight: bold;
                        color: #01111abe;
                    }
                    .BloodMain {
                        height: 10vh;
                        width: 39vh;
                        margin: 0 auto;
                        border-radius: 3vh;
                        background-color: #ecf0f3;
                        display: flex;
                        flex-direction: row;
                        .left,
                        .right {
                            display: flex;
                            flex-direction: row;
                            align-items: flex-end;
                            justify-content: space-around;
                            width: 19vh;
                            padding-bottom: 2.5vh;
                            .one {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                .top {
                                    font-size: 2.5vh;
                                    color: #01111abe;
                                    font-weight: bold;
                                }
                                .end {
                                    font-size: 1.6vh;
                                    color: #6d7073;
                                    font-weight: bold;
                                }
                            }
                        }
                        .left {
                            border-right: 1px solid #e6e6e6;
                        }
                    }
                }
            }
            #chart3 {
                height: 50vh;
                width: 50vh;
            }
        }
    }
}
</style>
